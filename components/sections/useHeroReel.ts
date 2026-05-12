"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useHeroReel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const reduce = useReducedMotion();
  const isPlaying = !manuallyPaused && !reduce;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce || manuallyPaused) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, [reduce, manuallyPaused]);

  const togglePlay = useCallback(() => {
    setManuallyPaused((prev) => !prev);
  }, []);

  return { videoRef, isPlaying, togglePlay };
}
