"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { useProjectGrid } from "@/components/sections/useProjectGrid";
import { copy } from "@/lib/i18n";
import type { Project } from "@/types/project";
import { cn } from "@/utils/cn";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { filter, setFilter, filterOptions, visible } = useProjectGrid(projects);

  return (
    <section
      aria-label={copy.a11y.sectionPortfolio}
      className="relative py-24 md:py-36"
    >
      <Container size="wide">
        <div className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-(--hairline) pt-8 md:mb-16">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={cn(
                "cursor-pointer text-[11px] uppercase tracking-[0.28em] transition-colors duration-300",
                filter === opt.value
                  ? "text-silver-50"
                  : "text-silver-400 hover:text-silver-200",
              )}
              aria-pressed={filter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-24 text-center text-sm text-silver-400">—</p>
        ) : (
          <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
            {visible.map((project, idx) => (
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

                    <span className="pt-1.5 text-[10px] uppercase tracking-[0.24em] text-silver-400">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
