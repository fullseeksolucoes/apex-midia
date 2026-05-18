import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = {
  title: copy.contato.hero.title,
  description: copy.contato.hero.sub,
};

export default function ContatoPage() {
  return <ContactForm />;
}
