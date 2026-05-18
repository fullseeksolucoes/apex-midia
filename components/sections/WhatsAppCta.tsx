import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/lib/i18n";

const whatsappHref = "https://wa.me/5511900000000";

export function WhatsAppCta() {
  return (
    <section
      aria-label={copy.a11y.sectionWhatsapp}
      className="relative py-24 md:py-40"
    >
      <Container size="narrow">
        <Reveal className="flex flex-col items-start gap-8">
          <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl">
            {copy.contato.whatsapp.title}
          </h2>
          <Button href={whatsappHref} external size="lg" variant="outline">
            {copy.contato.whatsapp.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
