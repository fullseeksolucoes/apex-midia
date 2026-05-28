import type {
  MediaAspect,
  MediaSlot,
  MediaType,
  ProjectCategory as DbProjectCategory,
} from "@/prisma/generated/prisma/enums";
import type {
  Project,
  ProjectCategory,
  ProjectMedia,
} from "@/types/project";

type DbProjectWithRelations = {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  category: DbProjectCategory;
  excerpt: string;
  brief: string;
  featured: boolean;
  featuredOnAbout: boolean;
  order: number;
  media: Array<{
    slot: MediaSlot;
    type: MediaType;
    src: string;
    poster: string | null;
    caption: string | null;
    width: number;
    height: number;
    aspect: MediaAspect | null;
    order: number;
  }>;
  credits: Array<{ role: string; name: string; order: number }>;
};

const dbCategoryMap: Record<DbProjectCategory, ProjectCategory> = {
  BRAND: "brand",
  FASHION: "fashion",
  SHORT_FILM: "shortFilm",
  COMMERCIAL: "commercial",
  MUSIC: "music",
};

const apiCategoryMap: Record<ProjectCategory, DbProjectCategory> = {
  brand: "BRAND",
  fashion: "FASHION",
  shortFilm: "SHORT_FILM",
  commercial: "COMMERCIAL",
  music: "MUSIC",
};

export const toApiCategory = (db: DbProjectCategory): ProjectCategory =>
  dbCategoryMap[db];

export const toDbCategory = (api: ProjectCategory): DbProjectCategory =>
  apiCategoryMap[api];

const toApiMediaType = (t: MediaType): "image" | "video" =>
  t === "IMAGE" ? "image" : "video";

const toApiAspect = (a: MediaAspect | null): ProjectMedia["aspect"] => {
  if (a === "WIDE") return "wide";
  if (a === "TALL") return "tall";
  if (a === "SQUARE") return "square";
  return undefined;
};

export const toDbMediaType = (api: "image" | "video"): MediaType =>
  api === "image" ? "IMAGE" : "VIDEO";

export const toDbAspect = (
  api: ProjectMedia["aspect"],
): MediaAspect | null => {
  if (api === "wide") return "WIDE";
  if (api === "tall") return "TALL";
  if (api === "square") return "SQUARE";
  return null;
};

const buildMedia = (
  m: DbProjectWithRelations["media"][number],
): ProjectMedia => ({
  type: toApiMediaType(m.type),
  src: m.src,
  poster: m.poster ?? undefined,
  caption: m.caption ?? undefined,
  width: m.width,
  height: m.height,
  aspect: toApiAspect(m.aspect),
});

export const toApiProject = (db: DbProjectWithRelations): Project => {
  const cover = db.media.find((m) => m.slot === "COVER");
  const hero = db.media.find((m) => m.slot === "HERO");
  const gallery = db.media
    .filter((m) => m.slot === "GALLERY")
    .sort((a, b) => a.order - b.order)
    .map(buildMedia);

  if (!cover || !hero) {
    throw new Error(
      `Project ${db.slug} is missing required media (cover/hero)`,
    );
  }

  return {
    slug: db.slug,
    title: db.title,
    client: db.client,
    year: db.year,
    category: toApiCategory(db.category),
    excerpt: db.excerpt,
    brief: db.brief,
    cover: buildMedia(cover),
    hero: buildMedia(hero),
    gallery,
    credits: [...db.credits]
      .sort((a, b) => a.order - b.order)
      .map(({ role, name }) => ({ role, name })),
    featured: db.featured || undefined,
    featuredOnAbout: db.featuredOnAbout || undefined,
    order: db.order || undefined,
  };
};

export type ApiProjectWithId = Project & { id: string };

export const toApiProjectWithId = (
  db: DbProjectWithRelations,
): ApiProjectWithId => ({
  ...toApiProject(db),
  id: db.id,
});
