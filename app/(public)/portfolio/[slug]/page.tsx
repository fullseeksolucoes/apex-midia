import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectIntro } from "@/components/sections/ProjectIntro";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from "@/services/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projeto" };

  return {
    title: `${project.title} — ${project.client}`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — ${project.client}`,
      description: project.excerpt,
      images: [{ url: project.hero.src }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(slug, 3);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectIntro project={project} />
      <ProjectGallery project={project} />
      <RelatedProjects projects={related} />
    </>
  );
}
