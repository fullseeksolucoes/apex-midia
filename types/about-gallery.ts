import type { AboutGalleryLayout } from "@/lib/about-gallery-schemas";

export interface AboutGalleryImage {
  src: string;
  width: number;
  height: number;
  caption?: string;
  visible: boolean;
}

export interface AboutGalleryConfig {
  layout: AboutGalleryLayout;
  visibleCount: number;
  images: AboutGalleryImage[];
}
