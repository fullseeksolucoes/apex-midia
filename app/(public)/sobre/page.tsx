import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/AboutHero";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { Manifesto } from "@/components/sections/Manifesto";
import { Methodology } from "@/components/sections/Methodology";
import { ResultsStats } from "@/components/sections/ResultsStats";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: copy.sobre.hero.title,
  description: copy.sobre.hero.sub,
};

export default function SobrePage() {
  return (
    <>
      <AboutHero />
      <Manifesto />
      <Methodology />
      <ResultsStats />
      <EditorialGallery />
      <CtaBlock
        eyebrow={copy.home.finalCta.eyebrow}
        title={copy.sobre.cta.title}
        cta={copy.sobre.cta.action}
      />
    </>
  );
}
