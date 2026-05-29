import { AboutGalleryForm } from "@/components/admin/about-gallery-form";
import { api } from "@/lib/trpc/server";

export default async function AdminSobrePage() {
  const config = await api.aboutGallery.getAdmin();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.22em] text-silver-50/50">
          Sobre
        </p>
        <h1 className="font-display text-4xl tracking-tight text-silver-50">
          Frames do processo
        </h1>
        <p className="max-w-2xl text-sm text-silver-50/60">
          Galeria editorial da página Sobre. Defina o layout, quantas fotos
          aparecem e quais delas entram.
        </p>
      </header>

      <AboutGalleryForm initial={config} />
    </div>
  );
}
