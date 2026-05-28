import Image from "next/image";

import { Container } from "@/components/layout/container";
import { copy } from "@/lib/i18n";

const heroImage = "/banner-about.webp";

export function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[80svh] w-full items-end overflow-hidden bg-black">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />

      <Container size="wide" className="relative pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="flex flex-col gap-6 md:max-w-4xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
            {copy.sobre.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl font-light leading-[0.95] text-white md:text-6xl lg:text-7xl">
            {copy.sobre.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-white/80 md:text-lg">
            {copy.sobre.hero.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}
