import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type Variant = "primary" | "primary-light" | "ghost" | "outline" | "outline-light";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.16em] transition-all duration-300 ease-(--ease-cinema) focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-silver-50 text-ink hover:bg-silver-100 active:bg-silver-100 shadow-(--shadow-lift) hover:shadow-(--shadow-editorial)",
  "primary-light":
    "bg-ink text-silver-50 hover:bg-ink-soft active:bg-ink-soft shadow-(--shadow-lift) hover:shadow-(--shadow-editorial)",
  ghost:
    "border border-transparent text-silver-50/70 hover:text-silver-50 hover:border-(--hairline-strong)",
  outline:
    "border border-(--hairline-strong) text-silver-50 hover:bg-silver-50 hover:text-ink",
  "outline-light":
    "border border-white/30 text-white/85 hover:bg-white hover:text-silver-50",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[11px]",
  lg: "h-14 px-9 text-[12px]",
};

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _c; void _ch;
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonProps;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
