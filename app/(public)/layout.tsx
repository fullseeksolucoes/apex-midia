import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
