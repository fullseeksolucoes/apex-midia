import Image from "next/image";

import { Container } from "@/components/layout/container";
import { copy } from "@/lib/i18n";

const heroImage =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2400&q=80";

export function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[80svh] w-full items-end overflow-hidden bg-ink">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/95"
      />

      <Container size="wide" className="relative pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="flex flex-col gap-6 md:max-w-4xl">
          <span className="text-[11px] uppercase tracking-[0.32em] text-silver-200">
            {copy.sobre.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl leading-[1] text-silver-50 md:text-8xl lg:text-[8.5rem]">
            {copy.sobre.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-silver-100 md:text-lg">
            {copy.sobre.hero.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}
