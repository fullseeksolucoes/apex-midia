import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/admin/login");

  const user = await currentUser();
  const label =
    user?.primaryEmailAddress?.emailAddress ??
    user?.username ??
    user?.firstName ??
    "Admin";

  return <AdminShell userLabel={label}>{children}</AdminShell>;
}
