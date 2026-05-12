import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

interface CtaBlockProps {
  eyebrow?: string;
  title?: string;
  cta?: string;
  href?: string;
  ariaLabel?: string;
}

export function CtaBlock({
  eyebrow = copy.home.finalCta.eyebrow,
  title = copy.home.finalCta.title,
  cta = copy.home.finalCta.cta,
  href = "/contato",
  ariaLabel = copy.a11y.sectionFinalCta,
}: CtaBlockProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative py-32 md:py-48"
    >
      <Container size="narrow">
        <Reveal className="flex flex-col items-start gap-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-5xl leading-[1.05] text-silver-50 md:text-7xl lg:text-[6rem]">
            {title}
          </h2>
          <Button href={href} size="lg" variant="primary">
            {cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
