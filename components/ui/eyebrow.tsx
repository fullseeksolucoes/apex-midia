import { cn } from "@/utils/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-silver-200/90",
        "before:block before:h-px before:w-8 before:bg-accent/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
