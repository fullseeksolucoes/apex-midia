import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/lib/i18n";

export function PortfolioIntro() {
  return (
    <section className="relative pt-40 pb-12 md:pt-56 md:pb-20">
      <Container size="wide">
        <div className="flex flex-col gap-6">
          <Eyebrow>{copy.portfolio.intro.eyebrow}</Eyebrow>
          <h1 className="font-display text-5xl font-light leading-[0.95] text-silver-50 md:text-6xl lg:text-7xl">
            {copy.portfolio.intro.title}
          </h1>
          <p className="max-w-xl text-base text-silver-200 md:text-lg">
            {copy.portfolio.intro.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}
