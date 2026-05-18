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
      className="relative border-t border-(--hairline) py-24 md:py-32"
    >
      <Container size="wide">
        <Eyebrow className="mb-10 md:mb-16">
          {copy.portfolio.detail.relatedTitle}
        </Eyebrow>

        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
          {projects.map((project, idx) => (
            <Reveal
              key={project.slug}
              delay={idx * 60}
              className="mb-8 break-inside-avoid"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-[1.75rem] bg-graphite shadow-(--shadow-lift) transition-shadow duration-500 group-hover:shadow-(--shadow-editorial)">
                  <Image
                    src={project.cover.src}
                    alt={`${project.title} — ${project.client}`}
                    width={project.cover.width}
                    height={project.cover.height}
                    className="h-auto w-full object-cover transition-transform duration-(--duration-lift) ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-silver-50 md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-silver-300">
                      {project.client}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
