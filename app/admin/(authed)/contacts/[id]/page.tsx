import Link from "next/link";

import { ContactDetail } from "./contact-detail";

export default async function AdminContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/contacts"
          className="text-xs uppercase tracking-[0.22em] text-silver-50/50 hover:text-silver-50"
        >
          ← Contatos
        </Link>
      </div>
      <ContactDetail id={id} />
    </div>
  );
}
