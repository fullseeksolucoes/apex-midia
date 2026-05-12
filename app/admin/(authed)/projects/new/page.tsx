import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Portfólio
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Novo projeto
        </h1>
      </header>
      <ProjectForm mode="create" />
    </div>
  );
}
