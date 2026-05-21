"use client";

import Image from "next/image";
import Link from "next/link";

import { useNavbar } from "@/components/layout/useNavbar";
import { Container } from "@/components/layout/container";
import { copy } from "@/lib/i18n";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/sobre", label: copy.nav.sobre },
  { href: "/portfolio", label: copy.nav.portfolio },
  { href: "/contato", label: copy.nav.contato },
];

export function Navbar() {
  const { isScrolled, isMenuOpen, isHome, isTransparent, pathname, toggleMenu, closeMenu } =
    useNavbar();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-(--ease-cinema)">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-(--ease-cinema)",
            isHome && !isScrolled && !isMenuOpen
              ? "opacity-100"
              : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(244,240,234,0.18) 0%, rgba(244,240,234,0.06) 60%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b transition-all duration-500 ease-(--ease-cinema)",
            isScrolled || !isTransparent || isMenuOpen
              ? "bg-ink/88 backdrop-blur-2xl border-(--hairline) opacity-100"
              : "bg-transparent border-transparent opacity-0",
          )}
        />

        <Container size="wide">
          <nav
            className="relative flex h-(--navbar-height) items-center justify-between"
            aria-label="Navegação principal"
          >
            <Link
              href="/"
              aria-label={copy.brand.name}
              className="relative flex items-center"
              onClick={closeMenu}
            >
              <Image
                src="/logotipo.webp"
                alt={copy.brand.name}
                width={60}
                height={40}
                priority
                className={cn(
                  "transition-[filter] duration-300",
                  isTransparent && !isScrolled && !isMenuOpen && "brightness-0 invert",
                )}
              />
            </Link>

            <ul className="hidden items-center gap-12 md:flex">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
                        active && isTransparent && !isScrolled && !isMenuOpen
                          ? "text-white"
                          : active
                            ? "text-accent"
                            : isTransparent && !isScrolled && !isMenuOpen
                              ? "text-white/75 hover:text-white"
                              : "text-silver-200 hover:text-accent",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px transition-all duration-500 group-hover:w-full",
                          active
                            ? "w-full"
                            : "w-0",
                          isTransparent && !isScrolled && !isMenuOpen
                            ? "bg-white"
                            : "bg-accent",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/contato"
                className={cn(
                  "hidden h-10 items-center rounded-full border px-5 text-[10px] font-medium uppercase tracking-[0.28em] transition-all duration-300 md:inline-flex",
                  isTransparent && !isScrolled && !isMenuOpen
                    ? "border-white/20 text-white/85 hover:border-white/50 hover:text-white"
                    : "border-(--hairline-strong) text-silver-50 hover:bg-silver-50 hover:text-ink",
                )}
              >
                {copy.nav.cta}
              </Link>

              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                className="relative flex h-11 w-11 items-center justify-center md:hidden"
              >
                <span
                  className={cn(
                    "absolute h-0.5 w-6 transition-all duration-300",
                    isTransparent && !isScrolled && !isMenuOpen
                      ? "bg-white/85"
                      : "bg-silver-50",
                    isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-0.5 w-6 transition-all duration-300",
                    isTransparent && !isScrolled && !isMenuOpen
                      ? "bg-white/85"
                      : "bg-silver-50",
                    isMenuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-0.5 w-6 transition-all duration-300",
                    isTransparent && !isScrolled && !isMenuOpen
                      ? "bg-white/85"
                      : "bg-silver-50",
                    isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px]",
                  )}
                />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink/98 backdrop-blur-2xl px-8 pt-8 pb-10 transition-all duration-500 ease-(--ease-cinema) md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/logotipo.webp"
            alt={copy.brand.name}
            width={48}
            height={32}
            priority
          />
          <button
            type="button"
            onClick={closeMenu}
            aria-label={copy.nav.closeMenu}
            className="flex h-10 w-10 items-center justify-center"
          >
            <span className="absolute h-px w-5 rotate-45 bg-silver-50" />
            <span className="absolute h-px w-5 -rotate-45 bg-silver-50" />
          </button>
        </div>

        <nav className="mt-12 flex flex-1 flex-col justify-center">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link, idx) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "group relative inline-flex items-center gap-5 font-display text-4xl leading-none tracking-tight transition-colors duration-300 md:text-5xl",
                      active
                        ? "text-accent"
                        : "text-silver-50/60 hover:text-silver-50",
                    )}
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <span
                      className={cn(
                        "h-px transition-all duration-500 ease-(--ease-cinema) group-hover:w-12",
                        active
                          ? "w-12 bg-accent"
                          : "w-6 bg-silver-50/30 group-hover:bg-silver-50",
                      )}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Link
              href="/contato"
              onClick={closeMenu}
              className="inline-flex h-12 items-center gap-3 rounded-full border border-(--hairline-strong) bg-ink-soft px-7 text-[11px] font-medium uppercase tracking-[0.28em] text-silver-50 transition-all duration-300 hover:bg-silver-50 hover:text-ink"
            >
              <span className="text-base leading-none">+</span>
              {copy.nav.cta}
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-between border-t border-(--hairline) pt-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-silver-400">
            {copy.brand.domain}
          </span>
        </div>
      </div>
    </>
  );
}
