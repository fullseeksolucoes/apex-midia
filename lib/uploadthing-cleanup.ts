import "server-only";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
const UPLOADTHING_HOST = /(?:^|\.)(?:ufs\.sh|utfs\.io)$/i;

function toUploadThingKey(src: string): string | null {
  try {
    const url = new URL(src);
    if (!UPLOADTHING_HOST.test(url.hostname)) return null;
    const marker = "/f/";
    const start = url.pathname.indexOf(marker);
    if (start === -1) return null;
    const key = url.pathname.slice(start + marker.length).split("/")[0];
    return key || null;
  } catch {
    return null;
  }
}

export async function deleteUploadThingFiles(srcs: string[]): Promise<void> {
  if (!process.env.UPLOADTHING_TOKEN) return;
  const keys = srcs
    .map(toUploadThingKey)
    .filter((key): key is string => key !== null);
  if (keys.length === 0) return;
  try {
    await utapi.deleteFiles(keys);
  } catch {
    return;
  }
}
