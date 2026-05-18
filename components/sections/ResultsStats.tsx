import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ResultStatItem } from "@/components/sections/ResultStatItem";
import { copy } from "@/lib/i18n";

export function ResultsStats() {
  return (
    <section
      aria-label={copy.a11y.sectionResults}
      className="relative border-t border-(--hairline) py-20 md:py-32"
    >
      <Container size="wide">
        <Eyebrow className="mb-10 md:mb-16">{copy.sobre.results.eyebrow}</Eyebrow>

        <ul className="grid gap-12 md:grid-cols-4">
          {copy.sobre.results.stats.map((stat) => (
            <li key={stat.label}>
              <ResultStatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
