import type { AboutGalleryLayout as DbAboutGalleryLayout } from "@/prisma/generated/prisma/enums";

import type { AboutGalleryLayout } from "./about-gallery-schemas";

const dbToApiLayout: Record<DbAboutGalleryLayout, AboutGalleryLayout> = {
  STAGGERED: "staggered",
  MOSAIC: "mosaic",
  DUO: "duo",
  FILMSTRIP: "filmstrip",
};

const apiToDbLayout: Record<AboutGalleryLayout, DbAboutGalleryLayout> = {
  staggered: "STAGGERED",
  mosaic: "MOSAIC",
  duo: "DUO",
  filmstrip: "FILMSTRIP",
};

export const toApiAboutGalleryLayout = (
  db: DbAboutGalleryLayout,
): AboutGalleryLayout => dbToApiLayout[db];

export const toDbAboutGalleryLayout = (
  api: AboutGalleryLayout,
): DbAboutGalleryLayout => apiToDbLayout[api];
