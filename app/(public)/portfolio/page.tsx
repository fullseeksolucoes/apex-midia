import type { Metadata } from "next";

import { CtaBlock } from "@/components/sections/CtaBlock";
import { PortfolioIntro } from "@/components/sections/PortfolioIntro";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { copy } from "@/lib/i18n";
import { getProjects } from "@/services/portfolio";

export const metadata: Metadata = {
  title: copy.portfolio.intro.title,
  description: copy.portfolio.intro.sub,
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PortfolioIntro />
      <ProjectGrid projects={projects} />
      <CtaBlock />
    </>
  );
}
