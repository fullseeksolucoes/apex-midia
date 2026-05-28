"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useHeroReel } from "@/components/sections/useHeroReel";
import { copy } from "@/lib/i18n";

export function HeroReel() {
  const { videoRef, isPlaying, togglePlay } = useHeroReel();

  return (
    <section
      aria-label={copy.a11y.sectionHero}
      className="relative isolate flex min-h-svh w-full items-end overflow-hidden bg-black"
    >
      {/* <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/hero-reel.webm" type="video/webm" />
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video> */}

      <Image
        src="/banner-home.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div aria-hidden className="absolute inset-0 z-2 bg-black/30" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-2 h-1/2 bg-linear-to-b from-transparent to-black"
      />

      <Container
        size="wide"
        className="relative z-3 pb-20 pt-40 md:pb-28 md:pt-48"
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/60">
              {copy.home.hero.eyebrow}
            </span>
            <h1 className="font-display text-[2.8rem] font-light leading-[0.94] text-white md:text-[5rem] lg:text-[6.5rem]">
              {copy.home.hero.headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {copy.home.hero.sub}
            </p>

            <div className="mt-1 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Button
                href="/portfolio"
                variant="primary-light"
                size="lg"
                className="w-full md:w-auto"
              >
                {copy.home.hero.cta}
              </Button>
              <Button
                href="/contato"
                variant="outline-light"
                size="lg"
                className="w-full md:w-auto"
              >
                {copy.home.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="hidden items-end justify-end gap-6 md:flex md:flex-col md:items-end md:gap-10">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? copy.home.hero.playPauseLabel
                  : copy.home.hero.resumeLabel
              }
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span aria-hidden className="flex gap-0.75">
                {isPlaying ? (
                  <>
                    <span className="block h-3 w-0.5 bg-current" />
                    <span className="block h-3 w-0.5 bg-current" />
                  </>
                ) : (
                  <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-y-transparent border-l-10 border-l-current" />
                )}
              </span>
            </button>

            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
              <span className="block h-px w-12 bg-white/30" />
              {copy.home.hero.scrollCue}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
