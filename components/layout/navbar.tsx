"use client";

import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";

export function Navbar() {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-black/5
        bg-[#F5F5F2]/70
        backdrop-blur-xl
      "
    >
      <Container>
        <nav
          className="
            flex
            h-24
            items-center
            justify-between
          "
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logotipo.webp"
              loading="eager"
              alt="Apex Mídias"
              width={60}
              height={40}
              draggable={false}
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="
              hidden
              items-center
              gap-10
              md:flex
            "
          >
            <Link
              href="/sobre"
              className="
                text-[13px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-zinc-900/70
                transition-colors
                duration-300
                hover:text-zinc-900
              "
            >
              Sobre
            </Link>

            <Link
              href="/portfolio"
              className="
                text-[13px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-zinc-900/70
                transition-colors
                duration-300
                hover:text-zinc-900
              "
            >
              Portfólio
            </Link>

            <Link
              href="/contato"
              className="
                text-[13px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-zinc-900/70
                transition-colors
                duration-300
                hover:text-zinc-900
              "
            >
              Contato
            </Link>
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            {/* CTA Desktop */}
            <Link
              href="/contato"
              className="
                hidden
                rounded-full
                border
                border-black/10
                px-5
                py-2.5
                text-[12px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-zinc-900
                transition-all
                duration-300
                hover:border-black
                md:flex
              "
            >
              Iniciar Projeto
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="
                flex
                items-center
                justify-center
                md:hidden
              "
            >
              {/* <Menu size={20} strokeWidth={1.5} className="text-[#111111]" /> */}
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
