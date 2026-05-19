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
    <section aria-label={copy.a11y.sectionSelected} className="py-24 md:py-36">
      <Container size="wide">
        <Reveal className="mb-14 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{copy.home.selectedWork.eyebrow}</Eyebrow>

            <h2 className="mt-6 font-display text-5xl font-light leading-[0.92] tracking-tight text-silver-50 md:text-7xl">
              {copy.home.selectedWork.title}
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-silver-200 hover:text-silver-50"
          >
            <span className="h-px w-10 bg-silver-50 transition-all duration-500 group-hover:w-16" />

            {copy.home.selectedWork.cta}
          </Link>
        </Reveal>

        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
          {projects.map((project, idx) => (
            <Reveal
              key={project.slug}
              delay={idx * 60}
              className="mb-8 break-inside-avoid"
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
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
      </Container>
    </section>
  );
}
