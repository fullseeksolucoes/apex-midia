"use client";

import { Container } from "@/components/layout/container";
import { useContactForm } from "@/components/sections/useContactForm";
import { copy } from "@/lib/i18n";
import { cn } from "@/utils/cn";

const fieldBase =
  "w-full bg-transparent border-b border-(--hairline-strong) py-4 text-base text-silver-50 placeholder:text-silver-300 transition-colors duration-300 focus:border-silver-50 focus:outline-none";

export function ContactForm() {
  const { payload, errors, status, projectTypes, setField, onSubmit, reset } =
    useContactForm();

  if (status === "success") {
    return (
      <section
        aria-label={copy.a11y.sectionContactForm}
        className="relative border-y border-(--hairline) py-32 md:py-48"
      >
        <Container size="reading">
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-display text-4xl leading-[1.05] text-silver-50 md:text-6xl">
              {copy.contato.form.successTitle}
            </h2>
            <p className="text-lg text-silver-200">{copy.contato.form.successBody}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 text-[11px] uppercase tracking-[0.28em] text-silver-300 hover:text-silver-50"
            >
              ← {copy.contato.form.submit}
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-label={copy.a11y.sectionContactForm}
      className="relative border-y border-(--hairline) py-24 md:py-40"
    >
      <Container size="wide">
        <form
          noValidate
          onSubmit={onSubmit}
          className="grid gap-x-12 gap-y-10 md:grid-cols-12"
        >
          <div className="md:col-span-6">
            <label
              htmlFor="contact-name"
              className="text-[10px] uppercase tracking-[0.32em] text-silver-300"
            >
              {copy.contato.form.name}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              autoComplete="name"
              value={payload.name}
              onChange={(e) => setField("name", e.target.value)}
              className={cn(fieldBase, "mt-3")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name ? (
              <p id="err-name" className="mt-2 text-xs text-silver-100">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-6">
            <label
              htmlFor="contact-email"
              className="text-[10px] uppercase tracking-[0.32em] text-silver-300"
            >
              {copy.contato.form.email}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              value={payload.email}
              onChange={(e) => setField("email", e.target.value)}
              className={cn(fieldBase, "mt-3")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email ? (
              <p id="err-email" className="mt-2 text-xs text-silver-100">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-6">
            <label
              htmlFor="contact-company"
              className="text-[10px] uppercase tracking-[0.32em] text-silver-300"
            >
              {copy.contato.form.company}
            </label>
            <input
              id="contact-company"
              type="text"
              autoComplete="organization"
              value={payload.company ?? ""}
              onChange={(e) => setField("company", e.target.value)}
              className={cn(fieldBase, "mt-3")}
            />
          </div>

          <div className="md:col-span-6">
            <label
              htmlFor="contact-project"
              className="text-[10px] uppercase tracking-[0.32em] text-silver-300"
            >
              {copy.contato.form.projectType}
            </label>
            <select
              id="contact-project"
              value={payload.projectType}
              onChange={(e) =>
                setField("projectType", e.target.value as typeof payload.projectType)
              }
              className={cn(
                fieldBase,
                "mt-3 appearance-none bg-[length:10px_10px] bg-[right_center] bg-no-repeat pr-8",
              )}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path fill='none' stroke='%23a8a8a4' d='M1 3l4 4 4-4'/></svg>\")",
              }}
            >
              {projectTypes.map((t) => (
                <option key={t.value} value={t.value} className="bg-ink">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-12">
            <label
              htmlFor="contact-message"
              className="text-[10px] uppercase tracking-[0.32em] text-silver-300"
            >
              {copy.contato.form.message}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              value={payload.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder={copy.contato.form.messagePlaceholder}
              className={cn(fieldBase, "mt-3 resize-none")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "err-message" : undefined}
            />
            {errors.message ? (
              <p id="err-message" className="mt-2 text-xs text-silver-100">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-12 flex flex-col items-start gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-14 items-center justify-center rounded-full bg-silver-50 px-10 text-[12px] font-medium uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:bg-silver-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting"
                ? copy.contato.form.submitting
                : copy.contato.form.submit}
            </button>

            {status === "error" ? (
              <p className="text-sm text-silver-100">
                <span className="font-medium text-silver-50">
                  {copy.contato.form.errorTitle}
                </span>{" "}
                {copy.contato.form.errorBody}
              </p>
            ) : null}
          </div>
        </form>
      </Container>
    </section>
  );
}
