"use client";

import Link from "next/link";
import { useState } from "react";

import { trpc } from "@/lib/trpc/client";
import type { ContactStatus } from "@/lib/contact-schemas";

const STATUS_LABEL: Record<ContactStatus, string> = {
  new: "Novo",
  contacted: "Em contato",
  qualified: "Qualificado",
  archived: "Arquivado",
};

const PROJECT_TYPE_LABEL: Record<string, string> = {
  brand: "Marca",
  commercial: "Comercial",
  fashion: "Moda",
  music: "Música",
  documentary: "Documentário",
  other: "Outro",
};

const STATUS_FILTERS: Array<{ value: ContactStatus | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Novos" },
  { value: "contacted", label: "Em contato" },
  { value: "qualified", label: "Qualificados" },
  { value: "archived", label: "Arquivados" },
];

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

const sourceLabel = (a: {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
}) => {
  if (a.utmSource) {
    const parts = [a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean);
    return parts.join(" · ");
  }
  if (a.gclid) return "Google Ads (gclid)";
  if (a.fbclid) return "Meta Ads (fbclid)";
  if (a.referrer) {
    try {
      return new URL(a.referrer).hostname;
    } catch {
      return a.referrer.slice(0, 40);
    }
  }
  return "Direto";
};

export function ContactsTable() {
  const [filter, setFilter] = useState<ContactStatus | "all">("all");
  const list = trpc.contact.list.useQuery(
    filter === "all" ? undefined : { status: filter },
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
                active
                  ? "border-silver-50/30 bg-silver-50/10 text-silver-50"
                  : "border-silver-50/10 text-silver-50/60 hover:border-silver-50/20 hover:text-silver-50"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {list.isLoading ? (
        <p className="text-sm text-silver-50/60">Carregando contatos…</p>
      ) : list.error ? (
        <p className="text-sm text-red-400">
          Erro ao carregar: {list.error.message}
        </p>
      ) : (list.data ?? []).length === 0 ? (
        <div className="rounded-2xl border border-silver-50/10 bg-ink-2/40 p-10 text-center">
          <p className="text-silver-50/70">Nenhum contato nesta categoria.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-silver-50/10 bg-ink-2/40">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.18em] text-silver-50/50">
              <tr>
                <th className="px-5 py-4">Nome</th>
                <th className="px-5 py-4">E-mail</th>
                <th className="px-5 py-4">Tipo</th>
                <th className="px-5 py-4">Origem</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Recebido</th>
                <th className="px-5 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {(list.data ?? []).map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-silver-50/5 text-silver-50/80"
                >
                  <td className="px-5 py-4 text-silver-50">
                    {c.name}
                    {c.company ? (
                      <span className="block text-xs text-silver-50/50">
                        {c.company}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={`mailto:${c.email}`}
                      className="hover:text-silver-50"
                    >
                      {c.email}
                    </a>
                  </td>
                  <td className="px-5 py-4">
                    {PROJECT_TYPE_LABEL[c.projectType] ?? c.projectType}
                  </td>
                  <td className="px-5 py-4 text-xs text-silver-50/70">
                    {sourceLabel(c.attribution)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full border border-silver-50/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-silver-50/70">
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-silver-50/60">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/contacts/${c.id}`}
                      className="text-silver-50 underline-offset-4 hover:underline"
                    >
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
