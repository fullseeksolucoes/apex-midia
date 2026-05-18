"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Select } from "@/components/ui/select";
import { useContactForm } from "@/components/sections/useContactForm";
import { copy } from "@/lib/i18n";
import { cn } from "@/utils/cn";

const fieldBase =
  "w-full bg-transparent border-b border-(--hairline) pb-3 pt-2 text-base text-silver-50 placeholder:text-silver-400/70 transition-all duration-500 ease-(--ease-cinema) focus:border-accent/40 focus:bg-[var(--ink)]/30 focus:outline-none focus-visible:outline-none hover:border-(--hairline-strong)";

const labelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-[0.28em] text-silver-300 transition-colors duration-500 ease-(--ease-cinema)";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function ContactForm() {
  const { payload, errors, status, projectTypes, setField, onSubmit, reset } =
    useContactForm();

  if (status === "success") {
    return (
      <section
        aria-label={copy.a11y.sectionContactForm}
        className="py-32 md:py-48"
      >
        <Container size="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-start gap-6"
          >
            <h2 className="font-display text-4xl leading-[1.08] text-silver-50 md:text-6xl">
              {copy.contato.form.successTitle}
            </h2>
            <p className="text-lg text-silver-200">
              {copy.contato.form.successBody}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-[11px] uppercase tracking-[0.28em] text-silver-400 transition-colors duration-500 ease-(--ease-cinema) hover:text-silver-50 hover:cursor-pointer"
            >
              ← {copy.contato.form.submit}
            </button>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-label={copy.a11y.sectionContactForm}
      className="py-24 md:py-44"
    >
      <Container size="default">
        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr] md:gap-20 lg:gap-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="flex flex-col gap-6 md:sticky md:top-32 md:self-start"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-medium uppercase tracking-[0.4em] text-silver-300"
            >
              {copy.contato.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-[0.92] text-silver-50 md:text-7xl lg:text-[6.5rem]"
            >
              {copy.contato.hero.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed text-silver-200 md:text-lg"
            >
              {copy.contato.hero.sub}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 md:mt-16"
            >
              <div className="h-px w-12 bg-accent/40" />
              <a
                href={`mailto:${copy.contato.direct.email}`}
                className="text-sm text-silver-100 transition-colors duration-500 ease-(--ease-cinema) hover:text-silver-50 md:text-base"
              >
                {copy.contato.direct.email}
              </a>
              <span className="text-sm text-silver-400 md:text-base">
                {copy.contato.direct.phone}
              </span>
              <a
                href="https://wa.me/5511900000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-silver-300 transition-colors duration-500 ease-(--ease-cinema) hover:text-silver-50"
              >
                {copy.contato.whatsapp.cta}
                <span className="inline-block transition-transform duration-500 ease-(--ease-cinema) group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </motion.div>
          </motion.div>

          <div className="md:pt-4">
            <form
              noValidate
              onSubmit={onSubmit}
              className="flex flex-col gap-8"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                className="grid gap-8 md:grid-cols-2 md:gap-10"
              >
                <motion.div variants={fadeUp} className="group">
                  <label htmlFor="contact-name" className={labelClass}>
                    {copy.contato.form.name}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={payload.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={cn(fieldBase)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name ? (
                    <p id="err-name" className="mt-2 text-xs text-silver-100">
                      {errors.name}
                    </p>
                  ) : null}
                </motion.div>

                <motion.div variants={fadeUp} className="group">
                  <label htmlFor="contact-email" className={labelClass}>
                    {copy.contato.form.email}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={payload.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={cn(fieldBase)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email ? (
                    <p id="err-email" className="mt-2 text-xs text-silver-100">
                      {errors.email}
                    </p>
                  ) : null}
                </motion.div>

                <motion.div variants={fadeUp} className="group">
                  <label htmlFor="contact-company" className={labelClass}>
                    {copy.contato.form.company}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    value={payload.company ?? ""}
                    onChange={(e) => setField("company", e.target.value)}
                    className={cn(fieldBase)}
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Select
                    id="contact-project"
                    label={copy.contato.form.projectType}
                    options={projectTypes}
                    value={payload.projectType}
                    onChange={(v) => setField("projectType", v as typeof payload.projectType)}
                    error={errors.projectType}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                <motion.div variants={fadeUp} className="group">
                  <label htmlFor="contact-message" className={labelClass}>
                    {copy.contato.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={payload.message}
                    onChange={(e) => setField("message", e.target.value)}
                    placeholder={copy.contato.form.messagePlaceholder}
                    className={cn(fieldBase, "resize-none")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "err-message" : undefined
                    }
                  />
                  {errors.message ? (
                    <p
                      id="err-message"
                      className="mt-2 text-xs text-silver-100"
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                className="flex flex-col items-start gap-6 pt-2"
              >
                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-silver-50 px-10 text-[12px] font-medium uppercase tracking-[0.28em] text-ink transition-all duration-500 ease-(--ease-cinema) hover:bg-silver-100 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? copy.contato.form.submitting
                      : copy.contato.form.submit}
                    <span className="inline-block transition-transform duration-500 ease-(--ease-cinema) group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </motion.div>

                {status === "error" ? (
                  <motion.p
                    variants={fadeUp}
                    className="text-sm text-silver-100"
                  >
                    <span className="font-medium text-silver-50">
                      {copy.contato.form.errorTitle}
                    </span>{" "}
                    {copy.contato.form.errorBody}
                  </motion.p>
                ) : null}
              </motion.div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
