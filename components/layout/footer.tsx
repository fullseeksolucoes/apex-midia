import Link from "next/link";

import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-black/5">
      <Container>
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            py-8
            text-center
            md:flex-row
          "
        >
          <p
            className="
              text-xs
              font-medium
              tracking-[0.08em]
              text-zinc-500
            "
          >
            © 2026 Apex Mídias
          </p>

          <p
            className="
              text-xs
              tracking-[0.08em]
              text-zinc-500
              transition-opacity
              duration-300
              hover:opacity-100
            "
          >
            {" "}
            Desenvolvido por{" "}
            <Link
              href="https://www.fullseek.com.br/"
              target="_blank"
              className="font-medium text-zinc-600 hover:text-zinc-900 transition-all duration-300"
            >
              FullSeek
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
