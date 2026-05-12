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
      className="relative border-y border-(--hairline) py-20"
    >
      <Container size="wide">
        <Reveal className="mb-12 flex flex-col items-start gap-3 md:mb-16 md:flex-row md:items-center md:justify-between">
          <Eyebrow>{copy.home.brands.eyebrow}</Eyebrow>
          <p className="max-w-md text-sm text-silver-200">
            {copy.home.brands.title}
          </p>
        </Reveal>

        <Marquee speedSeconds={45}>
          {brands.map((brand) => (
            <span
              key={brand.name}
              className="font-display text-2xl uppercase tracking-[0.18em] text-silver-200/80 transition-colors duration-300 hover:text-silver-50 md:text-3xl"
            >
              {brand.name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
