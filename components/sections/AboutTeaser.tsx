import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

const studioImage =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80";

export function AboutTeaser() {
  return (
    <section
      aria-label={copy.a11y.sectionAbout}
      className="relative py-24 md:py-36 bg-gray-100 border-t border-gray-200"
    >
      <Container size="wide">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* IMAGE */}
          <div className="md:col-span-4">
            <Reveal>
              <div className="overflow-hidden rounded-4xl bg-neutral-100">
                <Image
                  src={studioImage}
                  alt=""
                  width={700}
                  height={900}
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-7 md:col-start-6">
            {/* eyebrow */}
            <Reveal>
              <Eyebrow>{copy.home.about.eyebrow}</Eyebrow>
            </Reveal>

            {/* title */}
            <Reveal delay={80} className="mt-6">
              <h2 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-neutral-900 md:text-7xl">
                {copy.home.about.title}
              </h2>
            </Reveal>

            {/* body */}
            <Reveal delay={140} className="mt-10">
              <div className="max-w-xl space-y-6">
                <p className="text-base leading-relaxed text-neutral-700 md:text-xl">
                  {copy.home.about.body}
                </p>

                <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
                  {copy.home.about.bodyExtra}
                </p>
              </div>
            </Reveal>

            {/* stats */}
            <Reveal
              delay={220}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-8 border-t border-black/10 pt-8"
            >
              {copy.home.about.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-4xl tracking-tight text-neutral-900">
                    {stat.value}
                  </span>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            {/* cta */}
            <Reveal delay={300} className="mt-14">
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-neutral-900 transition-colors duration-300 hover:text-neutral-500"
              >
                <span className="h-px w-12 bg-neutral-900 transition-all duration-500 group-hover:w-20" />

                {copy.home.about.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
