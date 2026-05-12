"use client";

import Link from "next/link";
import { useState } from "react";

import { trpc } from "@/lib/trpc/client";

const CATEGORY_LABEL: Record<string, string> = {
  brand: "Marca",
  fashion: "Moda",
  shortFilm: "Curta",
  commercial: "Comercial",
  music: "Música",
};

export function ProjectsTable() {
  const utils = trpc.useUtils();
  const list = trpc.portfolio.listAdmin.useQuery();
  const remove = trpc.portfolio.delete.useMutation({
    onSuccess: () => utils.portfolio.listAdmin.invalidate(),
  });
  const [confirming, setConfirming] = useState<string | null>(null);

  if (list.isLoading) {
    return (
      <p className="text-sm text-silver-50/60">Carregando projetos…</p>
    );
  }

  if (list.error) {
    return (
      <p className="text-sm text-red-400">
        Erro ao carregar: {list.error.message}
      </p>
    );
  }

  const rows = list.data ?? [];
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-silver-50/10 bg-ink-2/40 p-10 text-center">
        <p className="text-silver-50/70">Nenhum projeto cadastrado ainda.</p>
        <Link
          href="/admin/projects/new"
          className="mt-4 inline-block text-sm text-silver-50 underline"
        >
          Cadastrar o primeiro
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-silver-50/10 bg-ink-2/40">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.18em] text-silver-50/50">
          <tr>
            <th className="px-5 py-4">Título</th>
            <th className="px-5 py-4">Cliente</th>
            <th className="px-5 py-4">Categoria</th>
            <th className="px-5 py-4">Ano</th>
            <th className="px-5 py-4">Destaque</th>
            <th className="px-5 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr
              key={p.id}
              className="border-t border-silver-50/5 text-silver-50/80"
            >
              <td className="px-5 py-4 text-silver-50">{p.title}</td>
              <td className="px-5 py-4">{p.client}</td>
              <td className="px-5 py-4">
                {CATEGORY_LABEL[p.category] ?? p.category}
              </td>
              <td className="px-5 py-4">{p.year}</td>
              <td className="px-5 py-4">{p.featured ? "Sim" : "—"}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-silver-50 underline-offset-4 hover:underline"
                  >
                    Editar
                  </Link>
                  {confirming === p.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => remove.mutate({ id: p.id })}
                        disabled={remove.isPending}
                        className="text-red-400 hover:text-red-300"
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(null)}
                        className="text-silver-50/60 hover:text-silver-50"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(p.id)}
                      className="text-silver-50/60 hover:text-red-400"
                    >
                      Remover
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
