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

const layoutFor = (idx: number) => {
  const cycle = idx % 5;
  switch (cycle) {
    case 0:
      return {
        colSpan: "md:col-span-7",
        aspect: "aspect-[16/10]",
        offset: "",
      };
    case 1:
      return {
        colSpan: "md:col-span-5",
        aspect: "aspect-[4/5]",
        offset: "md:mt-20",
      };
    case 2:
      return {
        colSpan: "md:col-span-6",
        aspect: "aspect-[4/3]",
        offset: "",
      };
    case 3:
      return {
        colSpan: "md:col-span-6",
        aspect: "aspect-[4/3]",
        offset: "md:mt-24",
      };
    default:
      return {
        colSpan: "md:col-span-12",
        aspect: "aspect-[16/9]",
        offset: "",
      };
  }
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { filter, setFilter, filterOptions, visible } = useProjectGrid(projects);

  return (
    <section
      aria-label={copy.a11y.sectionPortfolio}
      className="relative pb-32 md:pb-48"
    >
      <Container size="wide">
        <div className="mb-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-(--hairline) pt-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={cn(
                "text-[11px] uppercase tracking-[0.28em] transition-colors duration-300",
                filter === opt.value
                  ? "text-silver-50"
                  : "text-silver-300 hover:text-silver-100",
              )}
              aria-pressed={filter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <ul className="grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-32">
          {visible.map((project, idx) => {
            const layout = layoutFor(idx);
            return (
              <Reveal
                as="li"
                key={project.slug}
                delay={(idx % 3) * 80}
                className={cn(layout.colSpan, layout.offset)}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-graphite",
                      layout.aspect,
                    )}
                  >
                    <Image
                      src={project.cover.src}
                      alt={`${project.title} — ${project.client}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-(--ease-cinema) group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-silver-50 md:text-3xl">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-silver-300">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-silver-200">
                    {project.client}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        {visible.length === 0 ? (
          <p className="py-24 text-center text-sm text-silver-300">
            —
          </p>
        ) : null}
      </Container>
    </section>
  );
}
