import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ImageFrameProps {
  ratio?: number;
  className?: string;
  children: ReactNode;
}

export function ImageFrame({ ratio, className, children }: ImageFrameProps) {
  const style: CSSProperties | undefined =
    ratio !== undefined ? { aspectRatio: ratio } : undefined;

  return (
    <div
      className={cn(
        "image-placeholder relative overflow-hidden bg-graphite-soft",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
