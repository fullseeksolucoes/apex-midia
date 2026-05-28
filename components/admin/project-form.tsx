"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/lib/trpc/client";
import type { ProjectInput } from "@/lib/portfolio-schemas";
import type { Project } from "@/types/project";

import { inferAspect, probeImageSize } from "./media-picker";
import { MediaPicker } from "./media-picker";
import {
  CATEGORIES,
  emptyFormState,
  fromProject,
  type FormState,
  type MediaState,
} from "./project-form-state";

export function ProjectForm({
  mode,
  id,
  initial,
}: {
  mode: "create" | "edit";
  id?: string;
  initial?: Project;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [state, setState] = useState<FormState>(() =>
    initial ? fromProject(initial) : emptyFormState(),
  );
  const [error, setError] = useState<string | null>(null);

  const createMut = trpc.portfolio.create.useMutation({
    onSuccess: async () => {
      await utils.portfolio.listAdmin.invalidate();
      router.push("/admin/projects");
    },
    onError: (e) => setError(e.message),
  });

  const updateMut = trpc.portfolio.update.useMutation({
    onSuccess: async () => {
      await utils.portfolio.listAdmin.invalidate();
      if (id) await utils.portfolio.byId.invalidate({ id });
      router.push("/admin/projects");
    },
    onError: (e) => setError(e.message),
  });

  const pending = createMut.isPending || updateMut.isPending;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!state.cover || !state.hero) {
      setError("Cover e hero são obrigatórios.");
      return;
    }

    const payload: ProjectInput = {
      slug: state.slug.trim(),
      title: state.title.trim(),
      client: state.client.trim(),
      year: state.year,
      category: state.category,
      excerpt: state.excerpt.trim(),
      brief: state.brief.trim(),
      featured: state.featured,
      featuredOnAbout: state.featuredOnAbout,
      order: state.order,
      cover: { type: "image", ...state.cover },
      hero: { type: "image", ...state.hero },
      gallery: state.gallery.map((m) => ({ type: "image" as const, ...m })),
      credits: state.credits.filter((c) => c.role && c.name),
    };

    if (mode === "create") createMut.mutate(payload);
    else if (id) updateMut.mutate({ id, data: payload });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
          Informações básicas
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Slug"
            value={state.slug}
            onChange={(v) => set("slug", v)}
            placeholder="ex: silencio-comercial"
            hint="Apenas minúsculas, números e hífens."
            required
          />
          <TextField
            label="Título"
            value={state.title}
            onChange={(v) => set("title", v)}
            required
          />
          <TextField
            label="Cliente"
            value={state.client}
            onChange={(v) => set("client", v)}
            required
          />
          <NumberField
            label="Ano"
            value={state.year}
            onChange={(v) => set("year", v)}
            min={1900}
            max={2100}
            required
          />
          <SelectField
            label="Categoria"
            value={state.category}
            options={CATEGORIES}
            onChange={(v) => set("category", v as FormState["category"])}
          />
          <NumberField
            label="Ordem"
            value={state.order}
            onChange={(v) => set("order", v)}
            min={0}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={state.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-silver-50/30 bg-ink-2 accent-silver-50"
          />
          <label htmlFor="featured" className="text-sm text-silver-50/80">
            Destacar na home
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featuredOnAbout"
            type="checkbox"
            checked={state.featuredOnAbout}
            onChange={(e) => set("featuredOnAbout", e.target.checked)}
            className="h-4 w-4 rounded border-silver-50/30 bg-ink-2 accent-silver-50"
          />
          <label htmlFor="featuredOnAbout" className="text-sm text-silver-50/80">
            Destacar no sobre
          </label>
        </div>

        <TextAreaField
          label="Chamada (excerpt)"
          value={state.excerpt}
          onChange={(v) => set("excerpt", v)}
          rows={2}
          required
        />
        <TextAreaField
          label="Briefing"
          value={state.brief}
          onChange={(v) => set("brief", v)}
          rows={6}
          required
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
          Mídias principais
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <MediaPicker
            label="Cover (proporção livre)"
            endpoint="projectImage"
            value={state.cover}
            onChange={(v) => set("cover", v)}
          />
          <MediaPicker
            label="Hero (horizontal)"
            endpoint="projectImage"
            value={state.hero}
            onChange={(v) => set("hero", v)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
            Galeria
          </h2>
          <span className="text-xs text-silver-50/50">
            {state.gallery.length} {state.gallery.length === 1 ? "item" : "itens"}
          </span>
        </div>

        <UploadDropzone
          endpoint="projectGallery"
          onClientUploadComplete={async (res) => {
            if (!res) return;
            const newItems: MediaState[] = await Promise.all(
              res.map(async (f) => {
                const dims = await probeImageSize(f.ufsUrl);
                return {
                  src: f.ufsUrl,
                  width: dims.width,
                  height: dims.height,
                  aspect: inferAspect(dims.width, dims.height),
                };
              }),
            );
            setState((s) => ({ ...s, gallery: [...s.gallery, ...newItems] }));
          }}
          onUploadError={(e) => alert(`Erro: ${e.message}`)}
          appearance={{
            container:
              "rounded-xl border border-dashed border-silver-50/15 bg-ink-2/30 p-6",
            label: "text-silver-50/70",
            allowedContent: "text-xs text-silver-50/50",
            button:
              "ut-ready:bg-silver-50 ut-ready:text-ink ut-uploading:opacity-60 rounded-md px-4 py-2 text-sm",
          }}
        />

        {state.gallery.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {state.gallery.map((m, i) => (
              <GalleryItem
                key={`${m.src}-${i}`}
                item={m}
                onCaptionChange={(caption) =>
                  setState((s) => ({
                    ...s,
                    gallery: s.gallery.map((g, idx) =>
                      idx === i ? { ...g, caption } : g,
                    ),
                  }))
                }
                onRemove={() =>
                  setState((s) => ({
                    ...s,
                    gallery: s.gallery.filter((_, idx) => idx !== i),
                  }))
                }
              />
            ))}
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
            Créditos
          </h2>
          <button
            type="button"
            onClick={() =>
              setState((s) => ({
                ...s,
                credits: [...s.credits, { role: "", name: "" }],
              }))
            }
            className="text-xs uppercase tracking-[0.18em] text-silver-50/70 hover:text-silver-50"
          >
            + Adicionar
          </button>
        </div>
        {state.credits.length === 0 ? (
          <p className="text-sm text-silver-50/50">Nenhum crédito.</p>
        ) : (
          <div className="space-y-3">
            {state.credits.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-xl border border-silver-50/10 bg-ink-2/30 p-4 sm:flex-row"
              >
                <input
                  placeholder="Função"
                  value={c.role}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      credits: s.credits.map((x, idx) =>
                        idx === i ? { ...x, role: e.target.value } : x,
                      ),
                    }))
                  }
                  className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2 text-sm text-silver-50 outline-none focus:border-silver-50/40 sm:w-1/3"
                />
                <input
                  placeholder="Nome"
                  value={c.name}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      credits: s.credits.map((x, idx) =>
                        idx === i ? { ...x, name: e.target.value } : x,
                      ),
                    }))
                  }
                  className="w-full flex-1 rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2 text-sm text-silver-50 outline-none focus:border-silver-50/40"
                />
                <button
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      credits: s.credits.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-sm text-silver-50/60 hover:text-red-400"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3 border-t border-silver-50/10 pt-6">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-4 py-2 text-sm text-silver-50/70 hover:text-silver-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-silver-50 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-silver-50/90 disabled:opacity-50"
        >
          {pending
            ? "Salvando..."
            : mode === "create"
              ? "Criar projeto"
              : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}

function GalleryItem({
  item,
  onCaptionChange,
  onRemove,
}: {
  item: MediaState;
  onCaptionChange: (caption: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-silver-50/10 bg-ink-2/40 p-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-ink-2">
        <Image
          src={item.src}
          alt={item.caption ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          unoptimized
        />
      </div>
      <input
        placeholder="Legenda (opcional)"
        value={item.caption ?? ""}
        onChange={(e) => onCaptionChange(e.target.value)}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-2.5 py-1.5 text-xs text-silver-50 outline-none focus:border-silver-50/40"
      />
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-silver-50/50">
        <span>
          {item.width} × {item.height}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-red-400"
        >
          Remover
        </button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </span>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />
      {hint ? <span className="text-xs text-silver-50/40">{hint}</span> : null}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  required,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </span>
      <input
        type="number"
        required={required}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-ink">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </span>
      <textarea
        rows={rows ?? 4}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />
    </label>
  );
}
