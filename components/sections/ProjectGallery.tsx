import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";
import type { Project, ProjectMedia } from "@/types/project";
import { cn } from "@/utils/cn";

interface ProjectGalleryProps {
  project: Project;
}

const widthFor = (media: ProjectMedia) => {
  if (media.aspect === "wide") return "w-full max-w-[1640px]";
  if (media.aspect === "tall") return "w-full max-w-[820px]";
  return "w-full max-w-[1200px]";
};

const ratioFor = (media: ProjectMedia) =>
  ({ aspectRatio: `${media.width} / ${media.height}` }) as const;

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section
      aria-label={copy.a11y.sectionProjectGallery}
      className="relative border-t border-(--hairline) py-24 md:py-40"
    >
      <div className="flex flex-col items-center gap-24 px-6 md:gap-40 md:px-10">
        {project.gallery.map((media, idx) => {
          const alignment =
            media.aspect === "tall"
              ? idx % 2 === 0
                ? "md:self-start md:ml-[8%]"
                : "md:self-end md:mr-[8%]"
              : "self-center";
          return (
            <Reveal
              key={`${project.slug}-media-${idx}`}
              className={cn("relative", widthFor(media), alignment)}
            >
              <div
                className="relative overflow-hidden bg-graphite"
                style={ratioFor(media)}
              >
                {media.type === "image" ? (
                  <Image
                    src={media.src}
                    alt={media.caption ?? `${project.title} — frame ${idx + 1}`}
                    fill
                    sizes="(min-width: 768px) 80vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={media.src}
                    poster={media.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              {media.caption ? (
                <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-silver-300">
                  {media.caption}
                </p>
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
