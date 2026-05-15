import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

const tiles = [
  {
    src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1600&q=80",
    w: 800,
    h: 1000,
  },
  {
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
    w: 800,
    h: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1454944338482-a69bb95894af?auto=format&fit=crop&w=1600&q=80",
    w: 800,
    h: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    w: 800,
    h: 1000,
  },
];

export function EditorialGallery() {
  return (
    <section
      aria-label={copy.a11y.sectionGallery}
      className="relative border-t border-(--hairline) py-20 md:py-32"
    >
      <Container size="wide">
        <div className="mb-10 flex flex-col gap-3 md:mb-16">
          <Eyebrow>{copy.sobre.gallery.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl">
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
              <div className="overflow-hidden rounded-[1.75rem] bg-neutral-100">
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
