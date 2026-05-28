import { db } from "@/lib/db";
import { toApiProject, toDbCategory } from "@/lib/portfolio-mapper";
import type { Project, ProjectCategory } from "@/types/project";

const include = { media: true, credits: true } as const;
const orderBy = [{ order: "asc" as const }, { createdAt: "desc" as const }];

export async function getProjects(): Promise<Project[]> {
  const rows = await db.project.findMany({ include, orderBy });
  return rows.map(toApiProject);
}

export async function getAboutFeaturedProjects(): Promise<Project[]> {
  const rows = await db.project.findMany({
    where: { featuredOnAbout: true },
    include,
    orderBy,
  });
  return rows.map(toApiProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const rows = await db.project.findMany({
    where: { featured: true },
    include,
    orderBy,
  });
  return rows.map(toApiProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const row = await db.project.findUnique({ where: { slug }, include });
  return row ? toApiProject(row) : null;
}

export async function getRelatedProjects(
  slug: string,
  limit = 3,
): Promise<Project[]> {
  const current = await db.project.findUnique({
    where: { slug },
    select: { id: true, category: true },
  });
  if (!current) return [];

  const same = await db.project.findMany({
    where: { id: { not: current.id }, category: current.category },
    include,
    orderBy,
  });

  if (same.length >= limit) return same.slice(0, limit).map(toApiProject);

  const fallback = await db.project.findMany({
    where: {
      id: { not: current.id },
      category: { not: current.category },
    },
    include,
    orderBy,
  });

  return [...same, ...fallback].slice(0, limit).map(toApiProject);
}

export async function getCategories(): Promise<ProjectCategory[]> {
  const rows = await db.project.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  const map = {
    BRAND: "brand",
    FASHION: "fashion",
    SHORT_FILM: "shortFilm",
    COMMERCIAL: "commercial",
    MUSIC: "music",
  } as const;
  return rows.map((r) => map[r.category]);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const rows = await db.project.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getProjectsByCategory(
  category: ProjectCategory,
): Promise<Project[]> {
  const rows = await db.project.findMany({
    where: { category: toDbCategory(category) },
    include,
    orderBy,
  });
  return rows.map(toApiProject);
}
