"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

export function useResultStat(target: string | number) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.4 });
  const animated = typeof target === "number" ? useCountUp({ target, start: isVisible }) : target;
  return { ref, value: animated };
}
