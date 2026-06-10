"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { probeImageSize } from "@/components/admin/media-picker";
import { trpc } from "@/lib/trpc/client";
import { UploadDropzone } from "@/lib/uploadthing";
import type { AboutGalleryImage } from "@/types/about-gallery";
import { cn } from "@/utils/cn";

type Tab = "upload" | "projects" | "library";

const TABS: Array<{ value: Tab; label: string }> = [
  { value: "upload", label: "Enviar" },
  { value: "projects", label: "Projetos" },
  { value: "library", label: "Biblioteca" },
];

export function AboutGalleryImageSource({
  existingSrcs,
  onAdd,
}: {
  existingSrcs: Set<string>;
  onAdd: (image: AboutGalleryImage) => void;
}) {
  const [tab, setTab] = useState<Tab>("upload");

  return (
    <div className="space-y-4 rounded-xl border border-silver-50/10 bg-ink-2/30 p-4">
      <div className="flex gap-2">
        {TABS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            aria-pressed={tab === option.value}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition",
              tab === option.value
                ? "bg-silver-50 text-ink"
                : "text-silver-50/60 hover:text-silver-50",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {tab === "upload" ? <UploadTab onAdd={onAdd} /> : null}
      {tab === "projects" ? (
        <ProjectsTab existingSrcs={existingSrcs} onAdd={onAdd} />
      ) : null}
      {tab === "library" ? (
        <LibraryTab existingSrcs={existingSrcs} onAdd={onAdd} />
      ) : null}
    </div>
  );
}

function UploadTab({ onAdd }: { onAdd: (image: AboutGalleryImage) => void }) {
  return (
    <UploadDropzone
      endpoint="projectGallery"
      onClientUploadComplete={async (res) => {
        if (!res) return;
        await Promise.all(
          res.map(async (file) => {
            const dims = await probeImageSize(file.ufsUrl);
            onAdd({
              src: file.ufsUrl,
              width: dims.width,
              height: dims.height,
              visible: true,
            });
          }),
        );
      }}
      onUploadError={(e) => alert(`Erro: ${e.message}`)}
      appearance={{
        container: "border border-dashed border-silver-50/15 rounded-xl p-6",
        label: "text-silver-50/70",
        allowedContent: "text-xs text-silver-50/50",
        button:
          "ut-ready:bg-silver-50 ut-ready:text-ink ut-uploading:opacity-60 rounded-md px-4 py-2 text-sm",
      }}
    />
  );
}

function ProjectsTab({
  existingSrcs,
  onAdd,
}: {
  existingSrcs: Set<string>;
  onAdd: (image: AboutGalleryImage) => void;
}) {
  const list = trpc.portfolio.listAdmin.useQuery();

  const tiles = useMemo<AboutGalleryImage[]>(() => {
    const seen = new Set<string>();
    const out: AboutGalleryImage[] = [];
    for (const project of list.data ?? []) {
      for (const media of [project.cover, project.hero, ...project.gallery]) {
        if (seen.has(media.src)) continue;
        seen.add(media.src);
        out.push({
          src: media.src,
          width: media.width,
          height: media.height,
          caption: media.caption,
          visible: true,
        });
      }
    }
    return out;
  }, [list.data]);

  if (list.isLoading) return <EmptyState text="Carregando projetos…" />;
  if (tiles.length === 0)
    return <EmptyState text="Nenhuma imagem nos projetos ainda." />;

  return (
    <ThumbGrid>
      {tiles.map((tile) => (
        <ThumbButton
          key={tile.src}
          src={tile.src}
          added={existingSrcs.has(tile.src)}
          onClick={() => onAdd(tile)}
        />
      ))}
    </ThumbGrid>
  );
}

function LibraryTab({
  existingSrcs,
  onAdd,
}: {
  existingSrcs: Set<string>;
  onAdd: (image: AboutGalleryImage) => void;
}) {
  const library = trpc.media.library.useQuery();
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);

  const addFromLibrary = async (src: string) => {
    setPendingSrc(src);
    try {
      const dims = await probeImageSize(src);
      onAdd({
        src,
        width: dims.width,
        height: dims.height,
        visible: true,
      });
    } finally {
      setPendingSrc(null);
    }
  };

  if (library.isLoading) return <EmptyState text="Carregando biblioteca…" />;
  if (library.error)
    return <EmptyState text="Não foi possível carregar a biblioteca." />;
  if ((library.data ?? []).length === 0)
    return <EmptyState text="Nenhuma imagem na biblioteca." />;

  return (
    <ThumbGrid>
      {library.data?.map((file) => (
        <ThumbButton
          key={file.key}
          src={file.src}
          added={existingSrcs.has(file.src)}
          pending={pendingSrc === file.src}
          onClick={() => addFromLibrary(file.src)}
        />
      ))}
    </ThumbGrid>
  );
}

function ThumbGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid max-h-80 grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4 md:grid-cols-5">
      {children}
    </div>
  );
}

function ThumbButton({
  src,
  added,
  pending,
  onClick,
}: {
  src: string;
  added: boolean;
  pending?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={added || pending}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg border bg-ink-2 transition",
        added
          ? "border-emerald-400/50"
          : "border-silver-50/10 hover:border-silver-50/40",
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="120px"
        unoptimized
        className={cn("object-cover", added && "opacity-40")}
      />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.18em]",
          added
            ? "bg-ink/40 text-emerald-300"
            : "bg-ink/0 text-silver-50 opacity-0 group-hover:bg-ink/40 group-hover:opacity-100",
        )}
      >
        {added ? "Adicionada" : pending ? "…" : "Adicionar"}
      </span>
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="py-6 text-center text-sm text-silver-50/50">{text}</p>;
}
