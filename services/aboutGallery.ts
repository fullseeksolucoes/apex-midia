import { db } from "@/lib/db";
import { toApiAboutGalleryLayout } from "@/lib/about-gallery-mapper";
import type { AboutGalleryConfig } from "@/types/about-gallery";

export const defaultAboutGalleryConfig: AboutGalleryConfig = {
  layout: "staggered",
  visibleCount: 6,
  images: [],
};

export async function getAboutGallery(): Promise<AboutGalleryConfig> {
  try {
    const row = await db.aboutGallery.findFirst({
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!row) return defaultAboutGalleryConfig;

    return {
      layout: toApiAboutGalleryLayout(row.layout),
      visibleCount: row.visibleCount,
      images: row.images.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        caption: image.caption ?? undefined,
        visible: image.visible,
      })),
    };
  } catch {
    return defaultAboutGalleryConfig;
  }
}

export function selectVisibleAboutGalleryImages(config: AboutGalleryConfig) {
  return config.images
    .filter((image) => image.visible)
    .slice(0, config.visibleCount);
}
