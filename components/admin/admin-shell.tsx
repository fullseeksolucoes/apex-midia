"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { cn } from "@/utils/cn";

const NAV = [
  { href: "/admin/dashboard", label: "Painel" },
  { href: "/admin/projects", label: "Portfólio" },
];

export function AdminShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel: string;
}) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-silver-50/10 bg-ink-2/40 p-6 lg:flex">
        <Link href="/admin/dashboard" className="block">
          <p className="font-display text-2xl tracking-tight text-silver-50">
            Apex Mídias
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-silver-50/40">
            Painel admin
          </p>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition",
                  active
                    ? "bg-silver-50/10 text-silver-50"
                    : "text-silver-50/60 hover:bg-silver-50/5 hover:text-silver-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-silver-50/10 pt-6">
          <p className="text-xs text-silver-50/50">{userLabel}</p>
          <button
            type="button"
            onClick={() => signOut({ redirectTo: "/admin/login" })}
            className="mt-3 w-full rounded-md border border-silver-50/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-silver-50/70 transition hover:border-silver-50/30 hover:text-silver-50"
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 px-6 py-10 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
