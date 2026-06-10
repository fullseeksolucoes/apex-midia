"use client";

import Image from "next/image";
import { useState } from "react";

import {
  parseVideoUrl,
  VIDEO_PROVIDER_LABEL,
  videoThumbnail,
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
  const thumbnail = videoThumbnail({ src, poster });

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-graphite", className)}
      style={{ aspectRatio: ratio && ratio > 0 ? ratio : 16 / 9 }}
    >
      {playing ? (
        parsed.isEmbed ? (
          <iframe
            src={parsed.autoplayUrl}
            title={title ?? "Vídeo"}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video
            src={parsed.autoplayUrl}
            poster={thumbnail ?? undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
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
              thumbnail
                ? "bg-ink/30 group-hover:bg-ink/15"
                : "bg-transparent",
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
              {VIDEO_PROVIDER_LABEL[parseVideoUrl(src).provider]}
            </span>
          )}
        </button>
      )}
    </div>
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
