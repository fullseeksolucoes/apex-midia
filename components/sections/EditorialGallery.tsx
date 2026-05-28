import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import { getAboutFeaturedProjects } from "@/services/portfolio";

export async function EditorialGallery() {
  const projects = await getAboutFeaturedProjects();

  const tiles = projects.flatMap((p) => [
    ...p.gallery.map((m) => ({ src: m.src, w: m.width, h: m.height })),
    ...(p.gallery.length === 0
      ? [{ src: p.cover.src, w: p.cover.width, h: p.cover.height }]
      : []),
  ]);

  if (tiles.length === 0) return null;

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

        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
          {tiles.map((tile, idx) => (
            <Reveal
              key={tile.src}
              delay={idx * 60}
              className="mb-6 break-inside-avoid"
            >
              <div className="overflow-hidden rounded-2xl bg-graphite shadow-(--shadow-lift)">
                <Image
                  src={tile.src}
                  alt=""
                  width={tile.w}
                  height={tile.h}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
