import { AboutGalleryGrid } from "@/components/sections/AboutGalleryLayouts";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/lib/i18n";
import {
  getAboutGallery,
  selectVisibleAboutGalleryImages,
} from "@/services/aboutGallery";

export async function EditorialGallery() {
  const config = await getAboutGallery();
  const images = selectVisibleAboutGalleryImages(config);

  if (images.length === 0) return null;

  return (
    <section
      aria-label={copy.a11y.sectionGallery}
      className="relative border-t border-(--hairline) py-20 md:py-32"
    >
      <Container size="wide">
        <div className="mb-8 flex flex-col gap-3 md:mb-12">
          <Eyebrow>{copy.sobre.gallery.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl leading-[1.05] text-silver-50 md:text-5xl">
            {copy.sobre.gallery.title}
          </h2>
        </div>

        <AboutGalleryGrid layout={config.layout} images={images} />
      </Container>
    </section>
  );
}
