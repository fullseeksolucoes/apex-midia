import Image from "next/image";

import { Container } from "@/components/layout/container";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import type { Project } from "@/types/project";

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section
      aria-label={copy.a11y.sectionProjectGallery}
      className="relative border-t border-(--hairline) py-24 md:py-32"
    >
      <Container size="wide">
        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
          {project.gallery.map((media, idx) => (
            <Reveal
              key={`${project.slug}-media-${idx}`}
              delay={idx * 60}
              className="mb-6 break-inside-avoid"
            >
              {media.type === "image" ? (
                <div className="overflow-hidden rounded-[1.75rem] bg-neutral-100">
                  <Image
                    src={media.src}
                    alt={media.caption ?? `${project.title} — frame ${idx + 1}`}
                    width={media.width}
                    height={media.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <VideoPlayer
                  src={media.src}
                  poster={media.poster}
                  title={media.caption ?? project.title}
                  ratio={media.width / media.height}
                  className="rounded-[1.75rem]"
                />
              )}
              {media.caption ? (
                <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                  {media.caption}
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
