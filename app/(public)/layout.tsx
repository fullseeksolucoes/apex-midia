import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="pt-24">{children}</div>

      <div className="w-full h-screen"></div>

      <Footer />
    </>
  );
}
