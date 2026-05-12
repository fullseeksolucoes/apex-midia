import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import type { Project } from "@/types/project";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      aria-label={copy.a11y.sectionRelated}
      className="relative border-t border-(--hairline) py-24 md:py-40"
    >
      <Container size="wide">
        <Eyebrow className="mb-12 md:mb-16">
          {copy.portfolio.detail.relatedTitle}
        </Eyebrow>

        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-3">
          {projects.map((project, idx) => (
            <Reveal as="li" key={project.slug} delay={idx * 100}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <Image
                    src={project.cover.src}
                    alt={`${project.title} — ${project.client}`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-(--ease-cinema) group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-silver-50 md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-silver-300">{project.client}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
