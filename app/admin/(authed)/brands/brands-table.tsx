"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { trpc } from "@/lib/trpc/client";

export function BrandsTable() {
  const utils = trpc.useUtils();
  const list = trpc.brands.listAdmin.useQuery();
  const remove = trpc.brands.delete.useMutation({
    onSuccess: () => utils.brands.listAdmin.invalidate(),
  });
  const [confirming, setConfirming] = useState<string | null>(null);

  if (list.isLoading) {
    return (
      <p className="text-sm text-silver-50/60">Carregando marcas…</p>
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
        <p className="text-silver-50/70">Nenhuma marca cadastrada ainda.</p>
        <Link
          href="/admin/brands/new"
          className="mt-4 inline-block text-sm text-silver-50 underline"
        >
          Cadastrar a primeira
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-silver-50/10 bg-ink-2/40">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.18em] text-silver-50/50">
          <tr>
            <th className="px-5 py-4">Logo</th>
            <th className="px-5 py-4">Nome</th>
            <th className="px-5 py-4">Ordem</th>
            <th className="px-5 py-4 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr
              key={b.id}
              className="border-t border-silver-50/5 text-silver-50/80"
            >
              <td className="px-5 py-4">
                {b.logo ? (
                  <div className="flex h-10 w-20 items-center justify-center overflow-hidden rounded-md bg-ink-2/60">
                    <Image
                      src={b.logo}
                      alt={b.name}
                      width={b.width}
                      height={b.height}
                      className="h-auto max-h-8 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span className="text-silver-50/40">—</span>
                )}
              </td>
              <td className="px-5 py-4 text-silver-50">{b.name}</td>
              <td className="px-5 py-4">{b.order}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/brands/${b.id}`}
                    className="text-silver-50 underline-offset-4 hover:underline"
                  >
                    Editar
                  </Link>
                  {confirming === b.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => remove.mutate({ id: b.id })}
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
                      onClick={() => setConfirming(b.id)}
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
