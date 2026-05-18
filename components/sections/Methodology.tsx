import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

export function Methodology() {
  return (
    <section
      aria-label={copy.a11y.sectionMethodology}
      className="relative border-t border-(--hairline) py-20 md:py-32"
    >
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>{copy.sobre.methodology.eyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl">
              {copy.sobre.methodology.title}
            </h2>
          </Reveal>

          <ol className="md:col-span-7 md:col-start-6">
            {copy.sobre.methodology.steps.map((step, idx) => (
              <Reveal
                as="li"
                key={step.number}
                delay={idx * 100}
                className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-b border-(--hairline) py-8 last:border-b-0"
              >
                <span className="font-display text-2xl text-silver-300 md:text-3xl">
                  {step.number}
                </span>
                <h3 className="font-display text-3xl text-silver-50 md:text-4xl">
                  {step.title}
                </h3>
                <p className="col-start-2 max-w-xl text-base text-silver-300 md:text-lg">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
