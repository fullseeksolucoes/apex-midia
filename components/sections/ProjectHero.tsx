import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { copy } from "@/lib/i18n";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section
      aria-label={copy.a11y.sectionProjectHero}
      className="relative isolate flex min-h-svh w-full items-end overflow-hidden bg-black"
    >
      <Image
        src={project.hero.src}
        alt={`${project.title} — ${project.client}`}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />

      <Container
        size="wide"
        className="relative pb-20 pt-(--navbar-height) md:pb-28"
      >
        <div className="flex flex-col gap-6">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/80 hover:text-white"
          >
            <span className="block h-px w-10 bg-white transition-all duration-500 group-hover:w-16" />
            {copy.portfolio.detail.back}
          </Link>

          <span className="text-[11px] uppercase tracking-[0.32em] text-white/80">
            {project.client} · {project.year}
          </span>

          <h1 className="font-display text-5xl font-light leading-none text-white md:text-8xl lg:text-[9rem]">
            {project.title}
          </h1>
        </div>
      </Container>
    </section>
  );
}
