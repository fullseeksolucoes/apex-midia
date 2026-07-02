"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { isHttpUrl, parseVideoUrl } from "@/lib/video-providers";

export function VideoLightbox({
  src,
  poster,
  title,
  ratio,
  onClose,
}: {
  src: string;
  poster?: string | null;
  title?: string;
  ratio?: number;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const parsed = parseVideoUrl(src);
  const safeRatio = ratio && Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;

  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Vídeo"}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-2xl md:p-10"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-soft/80 text-silver-50 transition-colors duration-300 hover:bg-silver-50 hover:text-ink md:right-8 md:top-8"
      >
        <CloseGlyph />
      </button>

      <div
        className="relative overflow-hidden bg-graphite"
        style={{
          width: `min(90vw, calc(90vh * ${safeRatio}))`,
          height: `min(90vh, calc(90vw / ${safeRatio}))`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {!isHttpUrl(parsed.lightboxUrl) ? (
          poster ? (
            <Image
              src={poster}
              alt=""
              fill
              quality={82}
              sizes="90vw"
              className="object-contain"
            />
          ) : null
        ) : parsed.isEmbed ? (
          <iframe
            src={parsed.lightboxUrl}
            title={title ?? "Vídeo"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video
            src={parsed.lightboxUrl}
            poster={poster ?? undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </div>
    </div>
  );
}

function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
