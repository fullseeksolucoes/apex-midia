import { BrandForm } from "@/components/admin/brand-form";

export default function NewBrandPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Marcas
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Nova marca
        </h1>
      </header>
      <BrandForm mode="create" />
    </div>
  );
}
