import type { Metadata } from "next";

import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BrandsStrip } from "@/components/sections/BrandsStrip";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { HeroReel } from "@/components/sections/HeroReel";
import { SelectedWork } from "@/components/sections/SelectedWork";

export const metadata: Metadata = {
  title: "Estúdio cinematográfico de imagem em movimento",
  description:
    "Direção, produção e pós cinematográfica para marcas que falam baixo e ressoam alto.",
};

export default function HomePage() {
  return (
    <>
      <HeroReel />
      <BrandsStrip />
      <AboutTeaser />
      <SelectedWork />
      <CtaBlock />
    </>
  );
}
