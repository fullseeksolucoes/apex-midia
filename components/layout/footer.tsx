import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { copy } from "@/lib/i18n";

const socials: Array<{ label: string; href: string }> = [
  {
    label: copy.footer.social.instagram,
    href: "https://www.instagram.com/apex.midias/",
  },
];

const navLinks = [
  { href: "/sobre", label: copy.nav.sobre },
  { href: "/portfolio", label: copy.nav.portfolio },
  { href: "/contato", label: copy.nav.contato },
];

export function Footer() {
  return (
    <footer className="relative border-t border-(--hairline) bg-ink pt-20 pb-8">
      <Container size="wide">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={copy.brand.name} className="inline-flex">
              <Image
                src="/logotipo.webp"
                alt={copy.brand.name}
                width={72}
                height={48}
                // className="brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-md font-display text-3xl leading-[1.1] text-silver-50">
              {copy.brand.tagline}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-[10px] uppercase tracking-[0.32em] text-silver-300">
              Navegar
            </p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver-100 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-silver-300">
              Direto
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${copy.contato.direct.email}`}
                  className="text-sm text-silver-100 hover:text-accent"
                >
                  {copy.contato.direct.email}
                </a>
              </li>
              <li>
                <span className="text-sm text-silver-100">
                  {copy.contato.direct.phone}
                </span>
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] uppercase tracking-[0.24em] text-silver-200 transition-colors duration-300 hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-(--hairline) pt-8 text-[11px] uppercase tracking-[0.24em] text-silver-300 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {copy.brand.name}. {copy.footer.rights}
          </span>
          <span>
            {copy.footer.builtBy}{" "}
            <Link
              href="https://www.fullseek.com.br/"
              target="_blank"
              className="text-silver-100 hover:text-accent"
            >
              FullSeek
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
