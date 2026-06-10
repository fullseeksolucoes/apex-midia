"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  isHttpUrl,
  parseVideoUrl,
  VIDEO_PROVIDER_LABEL,
  type ParsedVideo,
} from "@/lib/video-providers";
import { cn } from "@/utils/cn";

export function VideoPlayer({
  src,
  poster,
  title,
  ratio,
  className,
}: {
  src: string;
  poster?: string;
  title?: string;
  ratio?: number;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const parsed = parseVideoUrl(src);
  const thumbnail = poster ?? parsed.thumbnailUrl;

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-graphite", className)}
      style={{
        aspectRatio: ratio && Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9,
      }}
    >
      {playing ? (
        <PlayingView
          parsed={parsed}
          title={title}
          thumbnail={thumbnail}
          onClose={() => setPlaying(false)}
        />
      ) : (
        <PlayButton
          parsed={parsed}
          title={title}
          thumbnail={thumbnail}
          onPlay={() => setPlaying(true)}
        />
      )}
    </div>
  );
}

function PlayingView({
  parsed,
  title,
  thumbnail,
  onClose,
}: {
  parsed: ParsedVideo;
  title?: string;
  thumbnail: string | null;
  onClose: () => void;
}) {
  if (!isHttpUrl(parsed.embedUrl)) {
    return thumbnail ? (
      <Image
        src={thumbnail}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
    ) : null;
  }

  if (!parsed.isEmbed) {
    return (
      <video
        src={parsed.autoplayUrl}
        poster={thumbnail ?? undefined}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  const hideProviderChrome = parsed.provider === "youtube";

  return (
    <>
      <iframe
        src={parsed.autoplayUrl}
        title={title ?? "Vídeo"}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen={!hideProviderChrome}
        className="absolute inset-0 h-full w-full border-0"
      />
      {hideProviderChrome ? (
        <>
          <StartupChromeMask poster={thumbnail} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar vídeo"
            className="absolute inset-0 h-full w-full cursor-pointer"
          />
        </>
      ) : null}
    </>
  );
}

function StartupChromeMask({ poster }: { poster: string | null }) {
  const [covering, setCovering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCovering(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (!poster) return null;

  return (
    <Image
      src={poster}
      alt=""
      fill
      unoptimized
      sizes="(max-width: 768px) 100vw, 33vw"
      className={cn(
        "pointer-events-none absolute inset-0 object-cover transition-opacity duration-700",
        covering ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

function PlayButton({
  parsed,
  title,
  thumbnail,
  onPlay,
}: {
  parsed: ParsedVideo;
  title?: string;
  thumbnail: string | null;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={title ? `Reproduzir ${title}` : "Reproduzir vídeo"}
      className="group absolute inset-0 flex items-center justify-center"
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-graphite-medium to-graphite"
        />
      )}

      <span
        aria-hidden
        className={cn(
          "absolute inset-0 transition-colors duration-300",
          thumbnail ? "bg-ink/30 group-hover:bg-ink/15" : "bg-transparent",
        )}
      />

      <span
        aria-hidden
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-silver-50/95 text-ink shadow-(--shadow-lift) backdrop-blur transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
      >
        <PlayGlyph />
      </span>

      {thumbnail ? null : (
        <span className="absolute bottom-4 text-[10px] uppercase tracking-[0.24em] text-silver-50/55">
          {VIDEO_PROVIDER_LABEL[parsed.provider]}
        </span>
      )}
    </button>
  );
}

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ml-1 h-6 w-6 md:h-7 md:w-7"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
