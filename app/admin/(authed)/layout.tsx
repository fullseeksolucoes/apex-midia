import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { auth } from "@/lib/auth";

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <AdminShell userLabel={session.user.email ?? "Admin"}>{children}</AdminShell>
  );
}
