"use client";

import type { ReactNode } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "li";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const isMobile = useIsMobile();

  return (
    <Tag
      ref={ref as never}
      className={cn(
        !isMobile &&
          "transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-cinema) will-change-transform",
        isMobile || isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
      style={{ transitionDelay: !isMobile ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
