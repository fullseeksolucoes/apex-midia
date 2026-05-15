"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useHeroReel } from "@/components/sections/useHeroReel";
import { copy } from "@/lib/i18n";

export function HeroReel() {
  const { videoRef, isPlaying, togglePlay } = useHeroReel();

  return (
    <section
      aria-label={copy.a11y.sectionHero}
      className="relative isolate flex min-h-svh w-full items-end overflow-hidden bg-ink"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden
      >
        <source src="/hero-reel.webm" type="video/webm" />
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(247,247,245,0.2)_0%,rgba(247,247,245,0.85)_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-b from-transparent via-ink/40 to-ink"
      />

      <Container size="wide" className="relative pb-24 pt-40 md:pb-32 md:pt-48">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="flex flex-col gap-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-silver-200">
              {copy.home.hero.eyebrow}
            </span>
            <h1 className="font-display text-[3.25rem] leading-[0.96] text-silver-50 md:text-[5.5rem] lg:text-[7.5rem]">
              {copy.home.hero.headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-silver-100 md:text-lg">
              {copy.home.hero.sub}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button href="/portfolio" variant="primary" size="lg">
                {copy.home.hero.cta}
              </Button>
              <Button href="/contato" variant="outline" size="lg">
                {copy.home.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-end gap-6 md:flex-col md:items-end md:gap-10">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? copy.home.hero.playPauseLabel
                  : copy.home.hero.resumeLabel
              }
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-(--hairline-strong) text-silver-50 transition-all duration-300 hover:bg-silver-50 hover:text-ink"
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

            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-silver-200">
              <span className="block h-px w-12 bg-silver-200/60" />
              {copy.home.hero.scrollCue}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
