import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import { getFeaturedProjects } from "@/services/portfolio";

export async function SelectedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section aria-label={copy.a11y.sectionSelected} className="py-24 md:py-32">
      <Container size="wide">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{copy.home.selectedWork.eyebrow}</Eyebrow>

            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-neutral-900 md:text-7xl">
              {copy.home.selectedWork.title}
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-neutral-900 transition-colors duration-300 hover:text-neutral-500"
          >
            <span className="h-px w-10 bg-current transition-all duration-500 group-hover:w-16" />

            {copy.home.selectedWork.cta}
          </Link>
        </Reveal>

        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
          {projects.map((project, idx) => (
            <Reveal
              key={project.slug}
              delay={idx * 60}
              className="mb-6 break-inside-avoid"
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-[1.75rem] bg-neutral-100">
                  <Image
                    src={project.cover.src}
                    alt={`${project.title} — ${project.client}`}
                    width={project.cover.width}
                    height={project.cover.height}
                    className="h-auto w-full object-cover transition-transform duration-1600 ease-out group-hover:scale-[1.025]"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl tracking-tight text-neutral-900 md:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {project.client}
                    </p>
                  </div>

                  <span className="pt-1 text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                    {project.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
