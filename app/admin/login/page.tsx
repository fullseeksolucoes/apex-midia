import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { LoginForm } from "./login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="font-display text-3xl tracking-tight text-silver-50">
            Apex Mídias
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-silver-50/50">
            Painel admin
          </p>
        </div>
        <LoginForm
          callbackUrl={params.callbackUrl ?? "/admin/dashboard"}
          initialError={params.error}
        />
      </div>
    </main>
  );
}
