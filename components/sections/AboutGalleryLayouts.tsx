import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import type { AboutGalleryLayout } from "@/lib/about-gallery-schemas";
import type { AboutGalleryImage } from "@/types/about-gallery";
import { cn } from "@/utils/cn";

interface LayoutProps {
  images: AboutGalleryImage[];
}

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-silver-400">
      {text}
    </p>
  );
}

function CoverTile({
  image,
  className,
  sizes,
}: {
  image: AboutGalleryImage;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] bg-graphite shadow-(--shadow-lift)",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.caption ?? ""}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-(--duration-lift) ease-out hover:scale-[1.03]"
      />
    </div>
  );
}

function StaggeredLayout({ images }: LayoutProps) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
      {images.map((image, idx) => (
        <Reveal
          key={image.src}
          delay={idx * 60}
          className="mb-6 break-inside-avoid"
        >
          <div className="overflow-hidden rounded-[1.5rem] bg-graphite shadow-(--shadow-lift)">
            <Image
              src={image.src}
              alt={image.caption ?? ""}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <Caption text={image.caption} />
        </Reveal>
      ))}
    </div>
  );
}

function MosaicLayout({ images }: LayoutProps) {
  return (
    <div className="grid auto-rows-[12rem] grid-flow-dense grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-3">
      {images.map((image, idx) => {
        const feature = idx % 5 === 0;
        return (
          <Reveal
            key={image.src}
            delay={idx * 50}
            className={cn(
              "h-full",
              feature && "row-span-2 md:col-span-2 md:row-span-2",
            )}
          >
            <CoverTile
              image={image}
              className="h-full"
              sizes="(max-width: 768px) 50vw, 66vw"
            />
          </Reveal>
        );
      })}
    </div>
  );
}

function DuoLayout({ images }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {images.map((image, idx) => (
        <Reveal key={image.src} delay={idx * 70}>
          <CoverTile
            image={image}
            className="aspect-4/5"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <Caption text={image.caption} />
        </Reveal>
      ))}
    </div>
  );
}

function FilmstripLayout({ images }: LayoutProps) {
  return (
    <div
      role="region"
      aria-label="Galeria em faixa"
      tabIndex={0}
      className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, idx) => (
        <div
          key={image.src}
          className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
        >
          <Reveal delay={idx * 50}>
            <CoverTile
              image={image}
              className="aspect-3/4"
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 32vw"
            />
            <Caption text={image.caption} />
          </Reveal>
        </div>
      ))}
    </div>
  );
}

export function AboutGalleryGrid({
  layout,
  images,
}: {
  layout: AboutGalleryLayout;
  images: AboutGalleryImage[];
}) {
  if (layout === "mosaic") return <MosaicLayout images={images} />;
  if (layout === "duo") return <DuoLayout images={images} />;
  if (layout === "filmstrip") return <FilmstripLayout images={images} />;
  return <StaggeredLayout images={images} />;
}
