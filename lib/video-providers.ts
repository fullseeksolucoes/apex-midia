export type VideoProvider = "youtube" | "vimeo" | "panda" | "file";

export interface ParsedVideo {
  provider: VideoProvider;
  isEmbed: boolean;
  thumbnailUrl: string | null;
  embedUrl: string;
  autoplayUrl: string;
}

const YOUTUBE_ID =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|v\/|live\/))([A-Za-z0-9_-]{11})/;
const VIMEO_ID = /vimeo\.com\/(?:.*\/)?(\d+)/;
const FILE_EXTENSION = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;

const withAutoplayParam = (url: string, param: string): string =>
  `${url}${url.includes("?") ? "&" : "?"}${param}`;

export function parseVideoUrl(rawUrl: string): ParsedVideo {
  const url = rawUrl.trim();

  const youtube = url.match(YOUTUBE_ID);
  if (youtube) {
    const id = youtube[1];
    const minimalParams =
      "controls=0&rel=0&playsinline=1&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0";
    const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?${minimalParams}`;
    return {
      provider: "youtube",
      isEmbed: true,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      embedUrl,
      autoplayUrl: `${embedUrl}&autoplay=1`,
    };
  }

  const vimeo = url.match(VIMEO_ID);
  if (vimeo) {
    const embedUrl = `https://player.vimeo.com/video/${vimeo[1]}?title=0&byline=0&portrait=0&dnt=1`;
    return {
      provider: "vimeo",
      isEmbed: true,
      thumbnailUrl: null,
      embedUrl,
      autoplayUrl: `${embedUrl}&autoplay=1`,
    };
  }

  if (/pandavideo\.com\.br/i.test(url)) {
    return {
      provider: "panda",
      isEmbed: true,
      thumbnailUrl: null,
      embedUrl: url,
      autoplayUrl: withAutoplayParam(url, "autoplay=true"),
    };
  }

  return {
    provider: "file",
    isEmbed: false,
    thumbnailUrl: null,
    embedUrl: url,
    autoplayUrl: url,
  };
}

export function isSupportedVideoUrl(rawUrl: string): boolean {
  const url = rawUrl.trim();
  if (!url) return false;
  const parsed = parseVideoUrl(url);
  if (parsed.provider === "file") return FILE_EXTENSION.test(url);
  return true;
}

export const VIDEO_PROVIDER_LABEL: Record<VideoProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  panda: "Panda Video",
  file: "Arquivo de vídeo",
};

export function videoThumbnail(media: {
  poster?: string;
  src: string;
}): string | null {
  return media.poster ?? parseVideoUrl(media.src).thumbnailUrl;
}
