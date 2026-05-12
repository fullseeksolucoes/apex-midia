import { projectsData } from "@/content/projects";
import type { Project, ProjectCategory } from "@/types/project";

const sortByOrder = (a: Project, b: Project) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

export async function getProjects(): Promise<Project[]> {
  return [...projectsData].sort(sortByOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projectsData.filter((p) => p.featured).sort(sortByOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projectsData.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProjects(
  slug: string,
  limit = 3,
): Promise<Project[]> {
  const current = projectsData.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = projectsData
    .filter((p) => p.slug !== slug && p.category === current.category)
    .sort(sortByOrder);
  const fallback = projectsData
    .filter((p) => p.slug !== slug && p.category !== current.category)
    .sort(sortByOrder);
  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function getCategories(): Promise<ProjectCategory[]> {
  const set = new Set<ProjectCategory>();
  for (const p of projectsData) set.add(p.category);
  return Array.from(set);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return projectsData.map((p) => p.slug);
}
