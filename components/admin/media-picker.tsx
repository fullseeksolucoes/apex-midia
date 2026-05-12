"use client";

import Image from "next/image";

import { UploadButton } from "@/lib/uploadthing";

import type { MediaState } from "./project-form-state";

type Endpoint = "projectImage" | "projectGallery" | "brandLogo";

export function MediaPicker({
  value,
  onChange,
  endpoint,
  label,
}: {
  value: MediaState | null;
  onChange: (v: MediaState | null) => void;
  endpoint: Endpoint;
  label: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </p>

      {value ? (
        <div className="space-y-3 rounded-xl border border-silver-50/10 bg-ink-2/40 p-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink-2">
            <Image
              src={value.src}
              alt={label}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex items-center justify-between text-xs text-silver-50/60">
            <span>
              {value.width} × {value.height}
            </span>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-silver-50/70 hover:text-red-400"
            >
              Trocar
            </button>
          </div>
        </div>
      ) : (
        <UploadButton
          endpoint={endpoint}
          onClientUploadComplete={async (res) => {
            const file = res?.[0];
            if (!file) return;
            const dims = await probeImageSize(file.ufsUrl);
            onChange({
              src: file.ufsUrl,
              width: dims.width,
              height: dims.height,
              aspect: inferAspect(dims.width, dims.height),
            });
          }}
          onUploadError={(err) => {
            alert(`Erro no upload: ${err.message}`);
          }}
          appearance={{
            button:
              "ut-ready:bg-silver-50 ut-ready:text-ink ut-uploading:opacity-60 rounded-md px-4 py-2 text-sm",
            container: "items-start",
            allowedContent: "text-xs text-silver-50/50",
          }}
        />
      )}
    </div>
  );
}

async function probeImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Falha ao carregar imagem"));
    img.src = url;
  });
}

function inferAspect(w: number, h: number): MediaState["aspect"] {
  const ratio = w / h;
  if (ratio > 1.2) return "wide";
  if (ratio < 0.85) return "tall";
  return "square";
}

export { probeImageSize, inferAspect };
