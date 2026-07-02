import { revalidatePath } from "next/cache";

import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { toDbAspect } from "@/lib/portfolio-mapper";
import { toUploadThingKey } from "@/lib/uploadthing-cleanup";
import { resolveVideoMedia } from "@/lib/video-thumbnail";

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

  backfillVideoAspect: protectedProcedure
    .input(z.object({ dryRun: z.boolean().default(true) }))
    .mutation(async ({ ctx, input }) => {
      const videos = await ctx.db.projectMedia.findMany({
        where: { type: "VIDEO" },
        select: {
          id: true,
          src: true,
          width: true,
          height: true,
          aspect: true,
          projectId: true,
        },
      });

      const corrections = [];
      for (const video of videos) {
        const resolved = await resolveVideoMedia({
          type: "video",
          src: video.src,
        });
        if (!resolved.width || !resolved.height || !resolved.aspect) continue;
        if (resolved.width === video.width && resolved.height === video.height) {
          continue;
        }
        corrections.push({
          id: video.id,
          projectId: video.projectId,
          width: resolved.width,
          height: resolved.height,
          aspect: toDbAspect(resolved.aspect),
          from: `${video.width}x${video.height} ${video.aspect}`,
          to: `${resolved.width}x${resolved.height} ${resolved.aspect}`,
        });
      }

      if (!input.dryRun && corrections.length > 0) {
        await ctx.db.$transaction(
          corrections.map((c) =>
            ctx.db.projectMedia.update({
              where: { id: c.id },
              data: { width: c.width, height: c.height, aspect: c.aspect },
            }),
          ),
        );
        const projectIds = [...new Set(corrections.map((c) => c.projectId))];
        const projects = await ctx.db.project.findMany({
          where: { id: { in: projectIds } },
          select: { slug: true },
        });
        revalidatePath("/portfolio");
        revalidatePath("/portfolio/[slug]", "page");
        for (const project of projects) {
          revalidatePath(`/portfolio/${project.slug}`);
        }
      }

      return {
        dryRun: input.dryRun,
        totalVideos: videos.length,
        correctionCount: corrections.length,
        updated: input.dryRun ? 0 : corrections.length,
        corrections: corrections.map((c) => ({ from: c.from, to: c.to })),
      };
    }),
});
