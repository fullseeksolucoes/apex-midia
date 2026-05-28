import Link from "next/link";

import { api } from "@/lib/trpc/server";

export default async function AdminDashboardPage() {
  const [projects, brands, contactStats] = await Promise.all([
    api.portfolio.listAdmin(),
    api.brands.listAdmin(),
    api.contact.stats(),
  ]);

  const featuredCount = projects.filter((p) => p.featured).length;
  const newContacts = contactStats.byStatus.new ?? 0;

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Painel
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Visão geral
        </h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Projetos" value={projects.length} />
        <Stat label="Em destaque" value={featuredCount} />
        <Stat label="Brands" value={brands.length} />
        <Stat label="Novos contatos" value={newContacts} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-silver-50">Atalhos</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ShortcutLink
            href="/admin/projects"
            title="Gerenciar portfólio"
            description="Listar, editar e remover projetos."
          />
          <ShortcutLink
            href="/admin/projects/new"
            title="Novo projeto"
            description="Cadastrar um novo trabalho."
          />
          <ShortcutLink
            href="/admin/brands"
            title="Gerenciar marcas"
            description="Listar, editar e adicionar marcas parceiras."
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-silver-50/10 bg-ink-2/40 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl text-silver-50">{value}</p>
    </div>
  );
}

function ShortcutLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-silver-50/10 bg-ink-2/40 p-6 transition hover:border-silver-50/25"
    >
      <p className="text-silver-50">{title}</p>
      <p className="mt-1 text-sm text-silver-50/60">{description}</p>
    </Link>
  );
}
