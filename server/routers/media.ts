import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { toUploadThingKey } from "@/lib/uploadthing-cleanup";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const utapi = new UTApi();

const imageExtension = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

type UploadThingFile = Awaited<
  ReturnType<typeof utapi.listFiles>
>["files"][number];

const listAllUploadedFiles = async () => {
  const pageSize = 500;
  const all: UploadThingFile[] = [];
  let offset = 0;
  for (;;) {
    const { files } = await utapi.listFiles({ limit: pageSize, offset });
    all.push(...files);
    if (files.length < pageSize) break;
    offset += pageSize;
  }
  return all;
};


const readAppId = (): string | null => {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    return typeof decoded.appId === "string" ? decoded.appId : null;
  } catch {
    return null;
  }
};

export const mediaRouter = createTRPCRouter({
  library: protectedProcedure.query(async () => {
    const appId = readAppId();
    if (!appId) return [];

    const { files } = await utapi.listFiles({ limit: 500 });

    return files
      .filter((file) => file.status === "Uploaded")
      .filter((file) => imageExtension.test(file.name))
      .map((file) => ({
        key: file.key,
        name: file.name,
        src: `https://${appId}.ufs.sh/f/${file.key}`,
      }));
  }),

  cleanupOrphans: protectedProcedure
    .input(z.object({ dryRun: z.boolean().default(true) }))
    .mutation(async ({ ctx, input }) => {
      const [media, brands, aboutImages] = await Promise.all([
        ctx.db.projectMedia.findMany({ select: { src: true, poster: true } }),
        ctx.db.brand.findMany({ select: { logo: true } }),
        ctx.db.aboutGalleryImage.findMany({ select: { src: true } }),
      ]);

      const referencedKeys = new Set<string>();
      const addReference = (src: string | null) => {
        const key = src ? toUploadThingKey(src) : null;
        if (key) referencedKeys.add(key);
      };
      for (const m of media) {
        addReference(m.src);
        addReference(m.poster);
      }
      for (const b of brands) addReference(b.logo);
      for (const image of aboutImages) addReference(image.src);

      const files = await listAllUploadedFiles();
      const orphans = files
        .filter((file) => file.status === "Uploaded")
        .filter((file) => imageExtension.test(file.name))
        .filter((file) => !referencedKeys.has(file.key));

      if (!input.dryRun && orphans.length > 0) {
        await utapi.deleteFiles(orphans.map((file) => file.key));
      }

      return {
        dryRun: input.dryRun,
        totalFiles: files.length,
        referencedKeys: referencedKeys.size,
        orphanCount: orphans.length,
        deleted: input.dryRun ? 0 : orphans.length,
        orphanNames: orphans.map((file) => file.name),
      };
    }),
});
