import { UTApi } from "uploadthing/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const utapi = new UTApi();

const imageExtension = /\.(png|jpe?g|webp|gif|avif)$/i;

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
});
