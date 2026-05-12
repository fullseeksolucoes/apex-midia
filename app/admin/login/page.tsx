import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const { userId } = await auth();
  if (userId) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-10">
        <div className="text-center">
          <p className="font-display text-3xl tracking-tight text-silver-50">
            Apex Mídias
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-silver-50/50">
            Painel admin
          </p>
        </div>

        <SignIn
          routing="hash"
          fallbackRedirectUrl="/admin/dashboard"
          signUpUrl="/admin/login"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-ink-soft shadow-none border border-(--hairline-strong)",
            },
          }}
        />
      </div>
    </main>
  );
}
