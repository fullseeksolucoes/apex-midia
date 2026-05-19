import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

export function Manifesto() {
  return (
    <section
      aria-label={copy.a11y.sectionManifesto}
      className="relative border-t border-(--hairline) py-20 md:py-32"
    >
      <Container size="reading">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>{copy.sobre.manifesto.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.08] text-silver-50 md:text-5xl">
            {copy.sobre.manifesto.title}
          </h2>

          <div className="flex flex-col gap-5 text-base leading-relaxed text-silver-200 md:text-lg">
            {copy.sobre.manifesto.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
