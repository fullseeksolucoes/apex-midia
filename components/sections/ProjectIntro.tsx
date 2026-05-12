import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import type { Project } from "@/types/project";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  brand: copy.portfolio.filters.brand,
  fashion: copy.portfolio.filters.fashion,
  shortFilm: copy.portfolio.filters.shortFilm,
  commercial: copy.portfolio.filters.commercial,
  music: copy.portfolio.filters.music,
};

interface ProjectIntroProps {
  project: Project;
}

export function ProjectIntro({ project }: ProjectIntroProps) {
  return (
    <section
      aria-label={copy.a11y.sectionProjectIntro}
      className="relative border-t border-(--hairline) py-24 md:py-40"
    >
      <Container size="wide">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Eyebrow className="mb-8">{copy.portfolio.detail.brief}</Eyebrow>
            <p className="font-display text-3xl leading-[1.2] text-silver-50 md:text-5xl">
              {project.brief}
            </p>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9">
            <Eyebrow className="mb-8">{copy.portfolio.detail.credits}</Eyebrow>
            <dl className="divide-y divide-(--hairline)">
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-silver-300">
                  {copy.portfolio.detail.client}
                </dt>
                <dd className="text-sm text-silver-50">{project.client}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-silver-300">
                  {copy.portfolio.detail.year}
                </dt>
                <dd className="text-sm text-silver-50">{project.year}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-[10px] uppercase tracking-[0.28em] text-silver-300">
                  {copy.portfolio.detail.category}
                </dt>
                <dd className="text-sm text-silver-50">
                  {CATEGORY_LABEL[project.category]}
                </dd>
              </div>
              {project.credits.map((c) => (
                <div
                  key={`${c.role}-${c.name}`}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-silver-300">
                    {c.role}
                  </dt>
                  <dd className="text-sm text-silver-50">{c.name}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
