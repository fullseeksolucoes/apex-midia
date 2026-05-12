import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Apex Mídias",
  description:
    "Produtora audiovisual premium especializada em storytelling cinematográfico, campanhas visuais e direção criativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} antialiased`}>
      <body
        className="
          min-h-screen
          bg-background
          text-graphite
          font-sans
        "
      >
        {children}
      </body>
    </html>
  );
}
