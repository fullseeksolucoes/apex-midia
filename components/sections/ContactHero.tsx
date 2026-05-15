import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { copy } from "@/lib/i18n";

export function ContactHero() {
  return (
    <section className="relative pt-40 pb-16 md:pt-56 md:pb-24">
      <Container size="wide">
        <div className="flex flex-col gap-8">
          <Eyebrow>{copy.contato.hero.eyebrow}</Eyebrow>
          <h1 className="font-display text-5xl leading-none text-silver-50 md:text-8xl lg:text-[9rem]">
            {copy.contato.hero.title}
          </h1>
          <p className="max-w-xl text-base text-silver-200 md:text-lg">
            {copy.contato.hero.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}
