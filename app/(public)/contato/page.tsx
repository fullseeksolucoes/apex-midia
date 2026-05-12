import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { ContactHero } from "@/components/sections/ContactHero";
import { WhatsAppCta } from "@/components/sections/WhatsAppCta";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: copy.contato.hero.title,
  description: copy.contato.hero.sub,
};

export default function ContatoPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <WhatsAppCta />
    </>
  );
}
