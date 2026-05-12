"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  target: number;
  durationMs?: number;
  start?: boolean;
}

export function useCountUp({ target, durationMs = 1800, start = true }: Options) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(() => (reduce ? target : 0));
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start || reduce) return;
    const startTs = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTs;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs, start, reduce]);

  return value;
}
