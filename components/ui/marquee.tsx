import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface MarqueeProps {
  children: ReactNode;
  speedSeconds?: number;
  className?: string;
}

export function Marquee({
  children,
  speedSeconds = 50,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max items-center gap-16 animate-[apex-marquee_var(--apex-marquee-duration)_linear_infinite]"
        style={{ ["--apex-marquee-duration" as string]: `${speedSeconds}s` }}
      >
        <div className="flex items-center gap-16 pr-16">{children}</div>
        <div aria-hidden className="flex items-center gap-16 pr-16">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes apex-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="--apex-marquee-duration"] {
            animation-duration: var(--apex-marquee-duration) !important;
            animation-iteration-count: infinite !important;
          }
        }
      `}</style>
    </div>
  );
}
