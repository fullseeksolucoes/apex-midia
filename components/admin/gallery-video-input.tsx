"use client";

import { useState } from "react";

import {
  isSupportedVideoUrl,
  parseVideoUrl,
  VIDEO_PROVIDER_LABEL,
} from "@/lib/video-providers";
import { cn } from "@/utils/cn";

import type { MediaState } from "./project-form-state";

const ORIENTATIONS = [
  { value: "wide", label: "Horizontal", width: 1920, height: 1080 },
  { value: "tall", label: "Vertical", width: 1080, height: 1920 },
  { value: "square", label: "Quadrado", width: 1080, height: 1080 },
] as const;

type Orientation = (typeof ORIENTATIONS)[number]["value"];

export function GalleryVideoInput({
  onAdd,
}: {
  onAdd: (media: MediaState) => void;
}) {
  const [url, setUrl] = useState("");
  const [poster, setPoster] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("wide");
  const [error, setError] = useState<string | null>(null);

  const detectedProvider = url.trim()
    ? parseVideoUrl(url.trim()).provider
    : null;

  const handleAdd = () => {
    const trimmedUrl = url.trim();
    if (!isSupportedVideoUrl(trimmedUrl)) {
      setError(
        "Link não reconhecido. Cole um link do YouTube, Vimeo, Panda Video ou um arquivo .mp4/.webm.",
      );
      return;
    }
    const dimensions = ORIENTATIONS.find((o) => o.value === orientation)!;
    onAdd({
      type: "video",
      src: trimmedUrl,
      poster: poster.trim() || undefined,
      width: dimensions.width,
      height: dimensions.height,
      aspect: orientation,
    });
    setUrl("");
    setPoster("");
    setError(null);
  };

  return (
    <div className="space-y-3 rounded-xl border border-silver-50/10 bg-ink-2/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-silver-50/60">
          Adicionar vídeo
        </p>
        {detectedProvider ? (
          <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
            {VIDEO_PROVIDER_LABEL[detectedProvider]}
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.18em] text-silver-50/40">
            YouTube · Vimeo · Panda
          </span>
        )}
      </div>

      <input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError(null);
        }}
        placeholder="Cole o link do vídeo"
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />

      <input
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        placeholder="Capa do vídeo (opcional, URL da imagem)"
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />

      <div className="flex flex-wrap items-center gap-2">
        {ORIENTATIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setOrientation(option.value)}
            aria-pressed={orientation === option.value}
            className={cn(
              "rounded-md border px-3 py-1.5 text-xs transition",
              orientation === option.value
                ? "border-silver-50/50 bg-silver-50/10 text-silver-50"
                : "border-silver-50/15 bg-ink/60 text-silver-50/60 hover:border-silver-50/30",
            )}
          >
            {option.label}
          </button>
        ))}

        <button
          type="button"
          onClick={handleAdd}
          disabled={!url.trim()}
          className="ml-auto rounded-md bg-silver-50 px-4 py-1.5 text-sm font-medium text-ink transition hover:bg-silver-50/90 disabled:opacity-40"
        >
          Adicionar
        </button>
      </div>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
