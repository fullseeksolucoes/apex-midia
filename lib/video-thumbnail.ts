import "server-only";

import { parseVideoUrl } from "@/lib/video-providers";

const VIMEO_OEMBED_ENDPOINT = "https://vimeo.com/api/oembed.json";
const OEMBED_THUMBNAIL_WIDTH = 1280;
const OEMBED_TIMEOUT_MS = 4000;

const WIDE_RATIO_FLOOR = 1.2;
const TALL_RATIO_CEILING = 0.85;

type VimeoOEmbed = {
  thumbnail_url?: string;
  width?: number;
  height?: number;
};

async function fetchVimeoOEmbed(videoUrl: string): Promise<VimeoOEmbed | null> {
  const endpoint = `${VIMEO_OEMBED_ENDPOINT}?url=${encodeURIComponent(
    videoUrl,
  )}&width=${OEMBED_THUMBNAIL_WIDTH}`;
  try {
    const response = await fetch(endpoint, {
      signal: AbortSignal.timeout(OEMBED_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as VimeoOEmbed;
  } catch {
    return null;
  }
}

export type MediaAspectValue = "wide" | "tall" | "square";

function aspectFromRatio(width: number, height: number): MediaAspectValue {
  const ratio = width / height;
  if (ratio > WIDE_RATIO_FLOOR) return "wide";
  if (ratio < TALL_RATIO_CEILING) return "tall";
  return "square";
}

export interface ResolvedVideoMedia {
  poster?: string;
  width?: number;
  height?: number;
  aspect?: MediaAspectValue;
}

export async function resolveVideoMedia(media: {
  type: "image" | "video";
  src: string;
  poster?: string;
}): Promise<ResolvedVideoMedia> {
  if (media.type !== "video") return {};

  const parsed = parseVideoUrl(media.src);

  if (parsed.provider === "vimeo") {
    const oembed = await fetchVimeoOEmbed(media.src);
    if (!oembed) return {};
    const resolved: ResolvedVideoMedia = {};
    if (!media.poster && oembed.thumbnail_url) {
      resolved.poster = oembed.thumbnail_url;
    }
    if (oembed.width && oembed.height) {
      resolved.width = oembed.width;
      resolved.height = oembed.height;
      resolved.aspect = aspectFromRatio(oembed.width, oembed.height);
    }
    return resolved;
  }

  if (!media.poster && parsed.thumbnailUrl) {
    return { poster: parsed.thumbnailUrl };
  }
  return {};
}
