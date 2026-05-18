import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";

import { AttributionTracker } from "@/components/attribution-tracker";
import { copy } from "@/lib/i18n";
import { TRPCProvider } from "@/lib/trpc/client";

import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apexmidias.com"),
  title: {
    default: `${copy.brand.name} — ${copy.brand.tagline}`,
    template: `%s · ${copy.brand.name}`,
  },
  description:
    "Estúdio audiovisual de filmes de marca, comerciais, moda, música e curtas. Direção, produção e pós cinematográfica.",
  applicationName: copy.brand.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: copy.brand.name,
    title: `${copy.brand.name} — ${copy.brand.tagline}`,
    description: copy.brand.tagline,
    url: "https://apexmidias.com",
  },
  twitter: {
    card: "summary_large_image",
    title: `${copy.brand.name} — ${copy.brand.tagline}`,
    description: copy.brand.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="pt-BR"
        className={`${sans.variable} ${display.variable} antialiased`}
      >
        <body className="min-h-screen bg-ink text-silver-50">
          <TRPCProvider>
            <Suspense fallback={null}>
              <AttributionTracker />
            </Suspense>
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
