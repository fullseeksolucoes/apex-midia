import { notFound } from "next/navigation";

import { BrandForm } from "@/components/admin/brand-form";
import { api } from "@/lib/trpc/server";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let brand;
  try {
    brand = await api.brands.byId({ id });
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Marcas
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Editar marca
        </h1>
      </header>
      <BrandForm
        mode="edit"
        id={brand.id}
        initial={{
          name: brand.name,
          logo: brand.logo,
          width: brand.width,
          height: brand.height,
          order: brand.order,
        }}
      />
    </div>
  );
}
