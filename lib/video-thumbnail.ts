import "server-only";

import { parseVideoUrl } from "@/lib/video-providers";

const VIMEO_OEMBED_ENDPOINT = "https://vimeo.com/api/oembed.json";
const OEMBED_THUMBNAIL_WIDTH = 1280;
const OEMBED_TIMEOUT_MS = 4000;

async function fetchVimeoThumbnail(videoUrl: string): Promise<string | null> {
  const endpoint = `${VIMEO_OEMBED_ENDPOINT}?url=${encodeURIComponent(
    videoUrl,
  )}&width=${OEMBED_THUMBNAIL_WIDTH}`;
  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(OEMBED_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

export async function resolveMediaPoster(media: {
  type: "image" | "video";
  src: string;
  poster?: string;
}): Promise<string | undefined> {
  if (media.poster) return media.poster;
  if (media.type !== "video") return undefined;

  const parsed = parseVideoUrl(media.src);
  if (parsed.thumbnailUrl) return parsed.thumbnailUrl;
  if (parsed.provider === "vimeo") {
    return (await fetchVimeoThumbnail(media.src)) ?? undefined;
  }
  return undefined;
}
