"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { trpc } from "@/lib/trpc/client";
import type { ContactStatus } from "@/lib/contact-schemas";

const STATUS_OPTIONS: Array<{ value: ContactStatus; label: string }> = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Em contato" },
  { value: "qualified", label: "Qualificado" },
  { value: "archived", label: "Arquivado" },
];

const PROJECT_TYPE_LABEL: Record<string, string> = {
  brand: "Filme de marca",
  commercial: "Comercial",
  fashion: "Moda",
  music: "Música",
  documentary: "Documentário",
  other: "Outro",
};

const formatDateTime = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

export function ContactDetail({ id }: { id: string }) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const query = trpc.contact.byId.useQuery({ id });
  const update = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      utils.contact.byId.invalidate({ id });
      utils.contact.list.invalidate();
    },
  });
  const remove = trpc.contact.delete.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      router.push("/admin/contacts");
    },
  });

  const [status, setStatus] = useState<ContactStatus>("new");
  const [notes, setNotes] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (query.data) {
      setStatus(query.data.status);
      setNotes(query.data.notes ?? "");
    }
  }, [query.data]);

  if (query.isLoading) {
    return <p className="text-sm text-silver-50/60">Carregando…</p>;
  }
  if (query.error || !query.data) {
    return (
      <p className="text-sm text-red-400">
        {query.error?.message ?? "Contato não encontrado."}
      </p>
    );
  }

  const c = query.data;
  const a = c.attribution;
  const hasAttribution =
    a.utmSource ||
    a.utmMedium ||
    a.utmCampaign ||
    a.utmTerm ||
    a.utmContent ||
    a.gclid ||
    a.fbclid ||
    a.msclkid ||
    a.ttclid ||
    a.referrer ||
    a.landingPage;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <article className="min-w-0 space-y-6 rounded-2xl border border-silver-50/10 bg-ink-2/40 p-6 lg:p-8">
        <header className="space-y-1">
          <h2 className="font-display text-3xl text-silver-50">{c.name}</h2>
          {c.company ? (
            <p className="text-sm text-silver-50/60">{c.company}</p>
          ) : null}
          <p className="text-xs text-silver-50/50">
            Recebido em {formatDateTime(c.createdAt)}
          </p>
        </header>

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <Field label="E-mail">
            <a
              href={`mailto:${c.email}`}
              className="text-silver-50 hover:underline"
            >
              {c.email}
            </a>
          </Field>
          <Field label="Tipo de projeto">
            {PROJECT_TYPE_LABEL[c.projectType] ?? c.projectType}
          </Field>
        </dl>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
            Mensagem
          </p>
          <p className="wrap-anywhere whitespace-pre-wrap text-silver-50/85">
            {c.message}
          </p>
        </div>

        {hasAttribution ? (
          <div className="space-y-3 border-t border-silver-50/10 pt-6">
            <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
              Origem (campanha)
            </p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {a.utmSource ? <Field label="utm_source">{a.utmSource}</Field> : null}
              {a.utmMedium ? <Field label="utm_medium">{a.utmMedium}</Field> : null}
              {a.utmCampaign ? (
                <Field label="utm_campaign">{a.utmCampaign}</Field>
              ) : null}
              {a.utmTerm ? <Field label="utm_term">{a.utmTerm}</Field> : null}
              {a.utmContent ? (
                <Field label="utm_content">{a.utmContent}</Field>
              ) : null}
              {a.gclid ? <Field label="gclid (Google Ads)">{a.gclid}</Field> : null}
              {a.fbclid ? <Field label="fbclid (Meta)">{a.fbclid}</Field> : null}
              {a.msclkid ? (
                <Field label="msclkid (Microsoft)">{a.msclkid}</Field>
              ) : null}
              {a.ttclid ? <Field label="ttclid (TikTok)">{a.ttclid}</Field> : null}
              {a.referrer ? <Field label="Referrer">{a.referrer}</Field> : null}
              {a.landingPage ? (
                <Field label="Landing page">{a.landingPage}</Field>
              ) : null}
            </dl>
          </div>
        ) : (
          <p className="border-t border-silver-50/10 pt-6 text-xs text-silver-50/50">
            Sem dados de campanha (acesso direto ou navegação interna).
          </p>
        )}
      </article>

      <aside className="min-w-0 space-y-6 rounded-2xl border border-silver-50/10 bg-ink-2/40 p-6 lg:p-8">
        <div className="space-y-3">
          <label
            htmlFor="contact-status"
            className="text-xs uppercase tracking-[0.22em] text-silver-50/50"
          >
            Status
          </label>
          <select
            id="contact-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ContactStatus)}
            className="w-full rounded-md border border-silver-50/15 bg-ink px-3 py-2 text-sm text-silver-50"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="contact-notes"
            className="text-xs uppercase tracking-[0.22em] text-silver-50/50"
          >
            Notas internas
          </label>
          <textarea
            id="contact-notes"
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-silver-50/15 bg-ink px-3 py-2 text-sm text-silver-50"
          />
        </div>

        <button
          type="button"
          disabled={update.isPending}
          onClick={() =>
            update.mutate({ id: c.id, status, notes: notes || undefined })
          }
          className="w-full rounded-md bg-silver-50 px-4 py-2 text-sm font-medium text-ink transition hover:bg-silver-50/90 disabled:opacity-60"
        >
          {update.isPending ? "Salvando…" : "Salvar alterações"}
        </button>

        {update.isSuccess ? (
          <p className="text-xs text-silver-50/60">Alterações salvas.</p>
        ) : null}

        <div className="border-t border-silver-50/10 pt-4">
          {confirmDelete ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => remove.mutate({ id: c.id })}
                disabled={remove.isPending}
                className="flex-1 rounded-md border border-red-400/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-400 hover:bg-red-400/10"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-md border border-silver-50/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-silver-50/70"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="w-full text-xs uppercase tracking-[0.18em] text-silver-50/50 hover:text-red-400"
            >
              Remover contato
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-silver-50/50">
        {label}
      </dt>
      <dd className="mt-1 wrap-anywhere text-silver-50/85">{children}</dd>
    </div>
  );
}
