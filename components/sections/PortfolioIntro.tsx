import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/lib/i18n";

export function PortfolioIntro() {
  return (
    <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
      <Container size="wide">
        <div className="flex flex-col gap-8">
          <Eyebrow>{copy.portfolio.intro.eyebrow}</Eyebrow>
          <h1 className="font-display text-5xl leading-[1] text-silver-50 md:text-8xl lg:text-[9rem]">
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
