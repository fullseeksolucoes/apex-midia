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
    <section
      aria-label={copy.a11y.sectionSelected}
      className="relative py-32 md:py-48"
    >
      <Container size="wide">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-4 md:mb-24 md:flex-row md:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{copy.home.selectedWork.eyebrow}</Eyebrow>
            <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl lg:text-7xl">
              {copy.home.selectedWork.title}
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-silver-200 hover:text-silver-50"
          >
            <span className="block h-px w-10 bg-current transition-all duration-500 group-hover:w-16" />
            {copy.home.selectedWork.cta}
          </Link>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-24 md:grid-cols-12">
          {projects.map((project, idx) => {
            const isWide = idx % 3 === 0;
            const colSpan = isWide ? "md:col-span-12" : "md:col-span-6";
            const offset = idx % 3 === 2 ? "md:col-start-7 md:mt-32" : "";
            return (
              <Reveal
                as="li"
                delay={(idx % 3) * 100}
                key={project.slug}
                className={`${colSpan} ${offset}`}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  <div
                    className={`relative overflow-hidden bg-graphite ${
                      isWide
                        ? "aspect-[16/9]"
                        : project.cover.aspect === "tall"
                          ? "aspect-[4/5]"
                          : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={project.cover.src}
                      alt={`${project.title} — ${project.client}`}
                      fill
                      sizes={
                        isWide
                          ? "(min-width: 768px) 90vw, 100vw"
                          : "(min-width: 768px) 45vw, 100vw"
                      }
                      className="object-cover transition-transform duration-[1200ms] ease-(--ease-cinema) group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-2xl text-silver-50 md:text-3xl">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-silver-300">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-silver-200">
                    {project.client} · {project.excerpt}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
