import Image from "next/image";

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
      <div className="columns-1 gap-6 px-6 md:px-10 sm:columns-2 xl:columns-3">
        {project.gallery.map((media, idx) => (
          <Reveal
            key={`${project.slug}-media-${idx}`}
            delay={idx * 60}
            className="mb-6 break-inside-avoid"
          >
            <div className="overflow-hidden rounded-[1.75rem] bg-neutral-100">
              {media.type === "image" ? (
                <Image
                  src={media.src}
                  alt={media.caption ?? `${project.title} — frame ${idx + 1}`}
                  width={media.width}
                  height={media.height}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <video
                  src={media.src}
                  poster={media.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-auto w-full object-cover"
                />
              )}
            </div>
            {media.caption ? (
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                {media.caption}
              </p>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
