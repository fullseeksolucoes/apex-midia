import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

const studioImage = "/about-hero.webp";

export function AboutTeaser() {
  return (
    <section
      aria-label={copy.a11y.sectionAbout}
      className="relative py-24 md:py-40"
    >
      <Container size="wide">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-20">
          <div className="relative md:col-span-5">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={studioImage}
                  alt=""
                  width={700}
                  height={900}
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow>{copy.home.about.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={80} className="mt-6">
              <h2 className="max-w-3xl font-display text-5xl font-light leading-[0.92] tracking-tight text-silver-50 md:text-7xl">
                {copy.home.about.title}
              </h2>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <div className="max-w-xl space-y-6">
                <p className="text-base leading-relaxed text-silver-100 md:text-xl">
                  {copy.home.about.body}
                </p>

                <p className="text-sm leading-relaxed text-silver-300 md:text-base">
                  {copy.home.about.bodyExtra}
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={220}
              className="mt-12 flex flex-wrap gap-x-12 gap-y-8 border-t border-(--hairline) pt-8"
            >
              {copy.home.about.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-4xl tracking-tight text-silver-50">
                    {stat.value}
                  </span>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-silver-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={300} className="mt-14">
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-silver-200 transition-colors duration-300 hover:text-silver-50"
              >
                <span className="h-px w-12 bg-current transition-all duration-500 group-hover:w-20" />

                {copy.home.about.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
