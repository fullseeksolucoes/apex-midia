import type { ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "wide" | "default" | "narrow" | "reading";
  as?: ElementType;
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  wide: "max-w-[1640px]",
  default: "max-w-[1440px]",
  narrow: "max-w-[1120px]",
  reading: "max-w-[760px]",
};

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 md:px-10", sizes[size], className)}>
      {children}
    </Tag>
  );
}
