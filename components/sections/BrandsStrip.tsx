import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import { getBrands } from "@/services/brands";

export async function BrandsStrip() {
  const brands = await getBrands();

  return (
    <section
      aria-label={copy.a11y.sectionBrands}
      className="relative overflow-hidden border-y border-(--hairline) py-14 md:py-16"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-ink via-ink/90 to-transparent md:w-40" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-ink via-ink/90 to-transparent md:w-40" />

      <Container size="wide">
        <Reveal className="mb-10 flex flex-col items-start gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <Eyebrow>{copy.home.brands.eyebrow}</Eyebrow>

          <p className="max-w-lg text-sm leading-relaxed text-silver-300">
            {copy.home.brands.title}
          </p>
        </Reveal>

        <Marquee speedSeconds={45}>
          {brands.flatMap((brand) => [
            <div key={brand.name} className="group flex items-center">
              <span className="font-display text-xl uppercase tracking-[0.12em] text-silver-400 transition-all duration-500 will-change-transform group-hover:text-silver-200 md:text-3xl">
                {brand.name}
              </span>
            </div>,
            <span
              key={`${brand.name}-sep`}
              aria-hidden
              className="select-none text-sm leading-none text-silver-500"
            >
              —
            </span>,
          ])}
        </Marquee>

        <div aria-hidden className="mt-14 h-px w-full md:mt-16" />
      </Container>
    </section>
  );
}
