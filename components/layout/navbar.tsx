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
  const { isScrolled, isMenuOpen, isHome, pathname, toggleMenu, closeMenu } =
    useNavbar();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-(--ease-cinema)",
          isScrolled || !isHome || isMenuOpen
            ? "bg-ink/85 backdrop-blur-xl border-b border-(--hairline)"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container size="wide">
          <nav
            className="flex h-(--navbar-height) items-center justify-between"
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
                className="brightness-0 invert"
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
                        "text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
                        active
                          ? "text-silver-50"
                          : "text-silver-200 hover:text-silver-50",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="/contato"
                className="hidden h-10 items-center rounded-full border border-(--hairline-strong) px-5 text-[10px] font-medium uppercase tracking-[0.28em] text-silver-50 transition-all duration-300 hover:bg-silver-50 hover:text-ink md:inline-flex"
              >
                {copy.nav.cta}
              </Link>

              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                className="relative flex h-10 w-10 items-center justify-center md:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-5 bg-silver-50 transition-transform duration-300",
                    isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-silver-50 transition-transform duration-300",
                    isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5",
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
          "fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-2xl px-6 pt-32 pb-12 transition-opacity duration-500 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="font-display text-5xl leading-none text-silver-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 text-silver-200">
          <Link
            href="/contato"
            onClick={closeMenu}
            className="text-[11px] uppercase tracking-[0.28em] hover:text-silver-50"
          >
            {copy.nav.cta}
          </Link>
          <span className="text-[11px] uppercase tracking-[0.28em]">
            {copy.brand.domain}
          </span>
        </div>
      </div>
    </>
  );
}
