import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import Link from "next/link";

export function AboutTeaser() {
  return (
    <section
      aria-label={copy.a11y.sectionAbout}
      className="relative py-32 md:py-48"
    >
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <Eyebrow>{copy.home.about.eyebrow}</Eyebrow>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl lg:text-7xl">
                {copy.home.about.title}
              </h2>
            </Reveal>

            <Reveal delay={120} className="mt-10 max-w-xl">
              <p className="text-lg leading-relaxed text-silver-100 md:text-xl">
                {copy.home.about.body}
              </p>
            </Reveal>

            <Reveal delay={220} className="mt-10">
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-silver-50"
              >
                <span className="block h-px w-10 bg-silver-50 transition-all duration-500 group-hover:w-16" />
                {copy.home.about.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
