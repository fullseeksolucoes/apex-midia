import "@uploadthing/react/styles.css";

import { SessionProvider } from "next-auth/react";

import { TRPCProvider } from "@/lib/trpc/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <div className="min-h-screen bg-ink text-silver-50">{children}</div>
      </TRPCProvider>
    </SessionProvider>
  );
}
