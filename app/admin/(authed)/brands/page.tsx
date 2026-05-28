import Link from "next/link";

import { BrandsTable } from "./brands-table";

export default function AdminBrandsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
            Marcas
          </p>
          <h1 className="font-display text-4xl tracking-tight text-silver-50">
            Marcas
          </h1>
        </div>
        <Link
          href="/admin/brands/new"
          className="inline-flex items-center rounded-md bg-silver-50 px-4 py-2 text-sm font-medium text-ink transition hover:bg-silver-50/90"
        >
          Nova marca
        </Link>
      </header>

      <BrandsTable />
    </div>
  );
}
