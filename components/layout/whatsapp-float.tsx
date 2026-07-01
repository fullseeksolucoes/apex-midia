import { FaWhatsapp } from "react-icons/fa";

import { copy } from "@/lib/i18n";

const phone = "5531971841550";
const href = `https://wa.me/${phone}?text=${encodeURIComponent(copy.contato.whatsapp.message)}`;

export function WhatsappFloat() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={copy.a11y.whatsappFloat}
      className="group fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-silver-50 text-ink shadow-(--shadow-lift) transition-all duration-300 ease-(--ease-cinema) group-hover:scale-105 group-hover:shadow-(--shadow-editorial)">
        <FaWhatsapp className="h-6 w-6" aria-hidden />

        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-(--hairline-strong) bg-ink px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-silver-50 opacity-0 shadow-(--shadow-lift) transition-all duration-300 ease-(--ease-cinema) translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
        >
          {copy.contato.whatsapp.cta}
        </span>
      </span>
    </a>
  );
}
