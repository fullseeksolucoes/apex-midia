"use client";

import { useResultStat } from "@/components/sections/useResultStat";

interface ResultStatItemProps {
  value: string | number;
  suffix?: string;
  label: string;
}

export function ResultStatItem({ value, suffix, label }: ResultStatItemProps) {
  const { ref, value: animated } = useResultStat(value);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="font-display text-4xl leading-none text-silver-50 md:text-5xl lg:text-6xl">
        {animated}
        {suffix ?? ""}
      </span>
      <span className="text-[11px] uppercase tracking-[0.28em] text-silver-300">
        {label}
      </span>
    </div>
  );
}
