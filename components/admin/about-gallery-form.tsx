"use client";

import Image from "next/image";
import { useState } from "react";

import { AboutGalleryImageSource } from "@/components/admin/about-gallery-image-source";
import {
  ABOUT_GALLERY_LAYOUTS,
  ABOUT_GALLERY_VISIBLE_OPTIONS,
  type AboutGalleryLayout,
  type AboutGallerySaveInput,
} from "@/lib/about-gallery-schemas";
import { trpc } from "@/lib/trpc/client";
import type { AboutGalleryConfig, AboutGalleryImage } from "@/types/about-gallery";
import { cn } from "@/utils/cn";

type Status = "idle" | "saving" | "saved" | "error";

export function AboutGalleryForm({ initial }: { initial: AboutGalleryConfig }) {
  const utils = trpc.useUtils();

  const [layout, setLayout] = useState<AboutGalleryLayout>(initial.layout);
  const [visibleCount, setVisibleCount] = useState(initial.visibleCount);
  const [images, setImages] = useState<AboutGalleryImage[]>(initial.images);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const save = trpc.aboutGallery.save.useMutation({
    onSuccess: async () => {
      await utils.aboutGallery.getAdmin.invalidate();
      setStatus("saved");
    },
    onError: (e) => {
      setError(e.message);
      setStatus("error");
    },
  });

  const visibleImages = images.filter((image) => image.visible);
  const visibleImagesCount = visibleImages.length;
  const shownImages = new Set(visibleImages.slice(0, visibleCount));

  const updateImage = (index: number, patch: Partial<AboutGalleryImage>) =>
    setImages((current) =>
      current.map((image, i) => (i === index ? { ...image, ...patch } : image)),
    );

  const moveImage = (index: number, direction: -1 | 1) =>
    setImages((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const removeImage = (index: number) =>
    setImages((current) => current.filter((_, i) => i !== index));

  const addImage = (image: AboutGalleryImage) =>
    setImages((current) =>
      current.some((existing) => existing.src === image.src)
        ? current
        : [...current, image],
    );

  const handleSave = () => {
    setError(null);
    setStatus("saving");
    const payload: AboutGallerySaveInput = {
      layout,
      visibleCount,
      images: images.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        caption: image.caption?.trim() ? image.caption.trim() : undefined,
        visible: image.visible,
      })),
    };
    save.mutate(payload);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
            Layout
          </h2>
          <p className="text-sm text-silver-50/50">
            Escolha como as fotos se organizam na seção do site.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_GALLERY_LAYOUTS.map((option) => {
            const active = option.value === layout;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setLayout(option.value)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border p-4 text-left transition",
                  active
                    ? "border-silver-50/50 bg-silver-50/5"
                    : "border-silver-50/10 bg-ink-2/40 hover:border-silver-50/25",
                )}
              >
                <LayoutSchematic layout={option.value} />
                <div>
                  <p className="text-sm text-silver-50">{option.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-silver-50/50">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
            Quantidade exibida
          </h2>
          <p className="text-sm text-silver-50/50">
            Quantas fotos aparecem no site, de 2 em 2. Hoje há {visibleImagesCount}{" "}
            {visibleImagesCount === 1 ? "foto marcada" : "fotos marcadas"} para
            exibir.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ABOUT_GALLERY_VISIBLE_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setVisibleCount(count)}
              aria-pressed={visibleCount === count}
              className={cn(
                "h-10 w-12 rounded-md border text-sm transition",
                visibleCount === count
                  ? "border-silver-50/50 bg-silver-50 text-ink"
                  : "border-silver-50/15 bg-ink/60 text-silver-50/70 hover:border-silver-50/30",
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
              Fotos
            </h2>
            <p className="text-sm text-silver-50/50">
              Envie, reordene e escolha quais aparecem.
            </p>
          </div>
          <span className="text-xs text-silver-50/50">
            {images.length} {images.length === 1 ? "foto" : "fotos"}
          </span>
        </div>

        <AboutGalleryImageSource
          existingSrcs={new Set(images.map((image) => image.src))}
          onAdd={addImage}
        />

        {images.length === 0 ? (
          <p className="text-sm text-silver-50/50">Nenhuma foto ainda.</p>
        ) : (
          <ul className="space-y-3">
            {images.map((image, index) => {
              const withinVisibleWindow = shownImages.has(image);
              return (
                <li
                  key={image.src}
                  className="flex flex-col gap-3 rounded-xl border border-silver-50/10 bg-ink-2/30 p-3 sm:flex-row sm:items-center"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-ink-2">
                    <Image
                      src={image.src}
                      alt={image.caption ?? ""}
                      fill
                      sizes="112px"
                      className={cn(
                        "object-cover",
                        !withinVisibleWindow && "opacity-40",
                      )}
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <input
                      placeholder="Legenda (opcional)"
                      value={image.caption ?? ""}
                      onChange={(e) =>
                        updateImage(index, { caption: e.target.value })
                      }
                      className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-2.5 py-1.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
                    />
                    <div className="flex items-center gap-4 text-xs text-silver-50/50">
                      <label className="flex cursor-pointer items-center gap-2 text-silver-50/70">
                        <input
                          type="checkbox"
                          checked={image.visible}
                          onChange={(e) =>
                            updateImage(index, { visible: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-silver-50/30 bg-ink-2 accent-silver-50"
                        />
                        Exibir no site
                      </label>
                      <span>
                        {image.width} × {image.height}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconButton
                      label="Mover para cima"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                    >
                      ↑
                    </IconButton>
                    <IconButton
                      label="Mover para baixo"
                      disabled={index === images.length - 1}
                      onClick={() => moveImage(index, 1)}
                    >
                      ↓
                    </IconButton>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="px-2 text-sm text-silver-50/60 hover:text-red-400"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-4 border-t border-silver-50/10 pt-6">
        {status === "saved" ? (
          <span className="text-sm text-emerald-300">Galeria salva.</span>
        ) : null}
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="rounded-md bg-silver-50 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-silver-50/90 disabled:opacity-50"
        >
          {status === "saving" ? "Salvando..." : "Salvar galeria"}
        </button>
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-silver-50/15 text-silver-50/70 transition hover:border-silver-50/30 hover:text-silver-50 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function LayoutSchematic({ layout }: { layout: AboutGalleryLayout }) {
  const cell = "rounded-[3px] bg-silver-50/30";
  if (layout === "mosaic") {
    return (
      <div className="grid h-16 grid-cols-3 grid-rows-2 gap-1">
        <span className={cn(cell, "col-span-2 row-span-2")} />
        <span className={cell} />
        <span className={cell} />
      </div>
    );
  }
  if (layout === "duo") {
    return (
      <div className="grid h-16 grid-cols-2 gap-1.5">
        <span className={cell} />
        <span className={cell} />
      </div>
    );
  }
  if (layout === "filmstrip") {
    return (
      <div className="flex h-16 items-stretch gap-1.5">
        <span className={cn(cell, "w-1/4")} />
        <span className={cn(cell, "w-1/4")} />
        <span className={cn(cell, "w-1/4")} />
        <span className={cn(cell, "w-1/4 opacity-60")} />
      </div>
    );
  }
  return (
    <div className="grid h-16 grid-cols-3 gap-1.5">
      <span className={cn(cell, "h-10")} />
      <span className={cn(cell, "mt-3 h-12")} />
      <span className={cn(cell, "h-9")} />
    </div>
  );
}
