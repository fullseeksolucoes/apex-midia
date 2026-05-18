import { ContactsTable } from "./contacts-table";

export default function AdminContactsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Leads
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Contatos
        </h1>
        <p className="text-sm text-silver-50/60">
          Mensagens recebidas pelo formulário de contato do site.
        </p>
      </header>

      <ContactsTable />
    </div>
  );
}
