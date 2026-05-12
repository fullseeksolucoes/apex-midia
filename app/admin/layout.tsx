import "@uploadthing/react/styles.css";

import { TRPCProvider } from "@/lib/trpc/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCProvider>
      <div className="min-h-screen bg-ink text-silver-50">{children}</div>
    </TRPCProvider>
  );
}
