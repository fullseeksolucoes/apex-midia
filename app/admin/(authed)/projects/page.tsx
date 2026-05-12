import Link from "next/link";

import { ProjectsTable } from "./projects-table";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
            Portfólio
          </p>
          <h1 className="font-display text-4xl tracking-tight text-silver-50">
            Projetos
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center rounded-md bg-silver-50 px-4 py-2 text-sm font-medium text-ink transition hover:bg-silver-50/90"
        >
          Novo projeto
        </Link>
      </header>

      <ProjectsTable />
    </div>
  );
}
