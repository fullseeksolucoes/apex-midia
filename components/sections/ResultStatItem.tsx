"use client";

import { useResultStat } from "@/components/sections/useResultStat";

interface ResultStatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

export function ResultStatItem({ value, suffix, label }: ResultStatItemProps) {
  const { ref, value: animated } = useResultStat(value);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="font-display text-6xl leading-none text-silver-50 md:text-7xl lg:text-8xl">
        {animated}
        {suffix ?? ""}
      </span>
      <span className="text-[11px] uppercase tracking-[0.28em] text-silver-300">
        {label}
      </span>
    </div>
  );
}
