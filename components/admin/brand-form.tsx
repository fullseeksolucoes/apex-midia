"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UploadButton } from "@/lib/uploadthing";
import { trpc } from "@/lib/trpc/client";
import type { BrandInput } from "@/lib/portfolio-schemas";
import type { Brand } from "@/types/project";

export function BrandForm({
  mode,
  id,
  initial,
}: {
  mode: "create" | "edit";
  id?: string;
  initial?: Brand;
}) {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [name, setName] = useState(initial?.name ?? "");
  const [logo, setLogo] = useState(initial?.logo ?? "");
  const [width, setWidth] = useState(initial?.width ?? 140);
  const [height, setHeight] = useState(initial?.height ?? 32);
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [error, setError] = useState<string | null>(null);

  const createMut = trpc.brands.create.useMutation({
    onSuccess: async () => {
      await utils.brands.listAdmin.invalidate();
      router.push("/admin/brands");
    },
    onError: (e) => setError(e.message),
  });

  const updateMut = trpc.brands.update.useMutation({
    onSuccess: async () => {
      await utils.brands.listAdmin.invalidate();
      router.push("/admin/brands");
    },
    onError: (e) => setError(e.message),
  });

  const pending = createMut.isPending || updateMut.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !logo.trim()) {
      setError("Nome e logo são obrigatórios.");
      return;
    }

    const payload: BrandInput = {
      name: name.trim(),
      logo: logo.trim(),
      width,
      height,
      order,
    };

    if (mode === "create") createMut.mutate(payload);
    else if (id) updateMut.mutate({ id, data: payload });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
          Informações da marca
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Nome"
            value={name}
            onChange={setName}
            placeholder="Ex: MC ANJIM"
            required
          />
          <NumberField
            label="Ordem"
            value={order}
            onChange={setOrder}
            min={0}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-[0.22em] text-silver-50/60">
          Logo
        </h2>

        <UploadButton
          endpoint="brandLogo"
          onClientUploadComplete={(res) => {
            if (res?.[0]) setLogo(res[0].ufsUrl);
          }}
          onUploadError={(e) => alert(`Erro: ${e.message}`)}
          appearance={{
            container:
              "rounded-xl border border-dashed border-silver-50/15 bg-ink-2/30 p-6",
            allowedContent: "text-xs text-silver-50/50",
            button:
              "ut-ready:bg-silver-50 ut-ready:text-ink ut-uploading:opacity-60 rounded-md px-4 py-2 text-sm",
          }}
        />

        {logo ? (
          <div className="space-y-3">
            <div className="relative flex aspect-[3/1] w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-silver-50/10 bg-ink-2/40 p-6">
              <Image
                src={logo}
                alt={name || "Logo"}
                width={width}
                height={height}
                className="h-auto max-h-16 w-auto object-contain"
                unoptimized
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <NumberField
                label="Largura (px)"
                value={width}
                onChange={setWidth}
                min={1}
              />
              <NumberField
                label="Altura (px)"
                value={height}
                onChange={setHeight}
                min={1}
              />
            </div>
          </div>
        ) : null}
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3 border-t border-silver-50/10 pt-6">
        <button
          type="button"
          onClick={() => router.push("/admin/brands")}
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
              ? "Criar marca"
              : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs uppercase tracking-[0.2em] text-silver-50/60">
        {label}
      </span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-sm text-silver-50 outline-none focus:border-silver-50/40"
      />
    </label>
  );
}
