import type { CSSProperties } from "react";

import Image from "next/image";

import { Container } from "@/components/layout/container";
import { ImageFrame } from "@/components/media/ImageFrame";
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
        <div className="gallery-justified">
          {project.gallery.map((media, idx) => {
            const ratio = media.width / media.height;
            return (
              <Reveal
                key={`${project.slug}-media-${idx}`}
                delay={idx * 60}
                style={{ "--gallery-ratio": ratio } as CSSProperties}
              >
                {media.type === "image" ? (
                  <ImageFrame ratio={ratio} className="rounded-[1.75rem]">
                    <Image
                      src={media.src}
                      alt={
                        media.caption ?? `${project.title} — frame ${idx + 1}`
                      }
                      width={media.width}
                      height={media.height}
                      quality={82}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  </ImageFrame>
                ) : (
                  <VideoPlayer
                    src={media.src}
                    poster={media.poster}
                    title={media.caption ?? project.title}
                    ratio={ratio}
                    className="rounded-[1.75rem]"
                  />
                )}
                {media.caption ? (
                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                    {media.caption}
                  </p>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
