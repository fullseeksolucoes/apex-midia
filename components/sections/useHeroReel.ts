"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHeroReel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startedRef = useRef(false);

  useEffect(() => {
    const startVideo = async () => {
      if (startedRef.current) return;

      const video = videoRef.current;

      if (!video) return;

      try {
        video.muted = true;

        await video.play();

        startedRef.current = true;

        setHasStarted(true);
        setIsPlaying(true);
      } catch (err) {
        console.log(err);
      }
    };

    const handleScroll = () => {
      startVideo();
    };

    window.addEventListener("wheel", handleScroll, {
      passive: true,
    });

    window.addEventListener("touchmove", handleScroll, {
      passive: true,
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleScroll);

      window.removeEventListener("touchmove", handleScroll);

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      await video.play();

      setIsPlaying(true);

      startedRef.current = true;

      setHasStarted(true);
    } else {
      video.pause();

      setIsPlaying(false);
    }
  }, []);

  return {
    videoRef,
    hasStarted,
    isPlaying,
    togglePlay,
  };
}
