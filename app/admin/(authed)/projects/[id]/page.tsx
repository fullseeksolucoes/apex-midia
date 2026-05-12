import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { api } from "@/lib/trpc/server";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await api.portfolio.byId({ id }).catch(() => null);
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Portfólio
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          {project.title}
        </h1>
        <p className="text-sm text-silver-50/50">/{project.slug}</p>
      </header>
      <ProjectForm mode="edit" id={id} initial={project} />
    </div>
  );
}
