import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

const tiles = [
  {
    src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1600&q=80",
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
    offset: "",
  },
  {
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
    aspect: "aspect-[16/10]",
    span: "md:col-span-7",
    offset: "md:mt-24",
  },
  {
    src: "https://images.unsplash.com/photo-1454944338482-a69bb95894af?auto=format&fit=crop&w=1600&q=80",
    aspect: "aspect-[4/3]",
    span: "md:col-span-6",
    offset: "md:mt-16",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
    offset: "md:col-start-8",
  },
];

export function EditorialGallery() {
  return (
    <section
      aria-label={copy.a11y.sectionGallery}
      className="relative border-t border-(--hairline) py-32 md:py-48"
    >
      <Container size="wide">
        <div className="mb-16 flex flex-col gap-3 md:mb-24">
          <Eyebrow>{copy.sobre.gallery.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl">
            {copy.sobre.gallery.title}
          </h2>
        </div>

        <ul className="grid gap-8 md:grid-cols-12 md:gap-12">
          {tiles.map((tile, idx) => (
            <Reveal
              as="li"
              key={tile.src}
              delay={(idx % 3) * 80}
              className={`${tile.span} ${tile.offset}`}
            >
              <div className={`relative overflow-hidden bg-graphite ${tile.aspect}`}>
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
