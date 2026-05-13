"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitting = fetchStatus === "fetching";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    const emailAddress = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      setSubmitError(error.message ?? "Não foi possível entrar.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/admin/dashboard");
          router.push(url);
        },
      });
      return;
    }

    setSubmitError("Não foi possível concluir o login. Tente novamente.");
  }

  const identifierError = errors.fields.identifier?.message;
  const passwordError = errors.fields.password?.message;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[11px] uppercase tracking-[0.18em] text-silver-200"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border border-(--hairline-strong) bg-ink-soft px-4 py-3 text-sm text-silver-50 outline-none transition-colors focus:border-silver-50"
        />
        {identifierError && (
          <p className="text-xs text-red-600">{identifierError}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-[11px] uppercase tracking-[0.18em] text-silver-200"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border border-(--hairline-strong) bg-ink-soft px-4 py-3 text-sm text-silver-50 outline-none transition-colors focus:border-silver-50"
        />
        {passwordError && (
          <p className="text-xs text-red-600">{passwordError}</p>
        )}
      </div>

      {submitError && (
        <p className="rounded-md border border-red-600/30 bg-red-600/10 px-3 py-2 text-xs text-red-600">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-silver-50 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-opacity duration-300 ease-(--ease-cinema) hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Entrando…" : "Entrar"}
      </button>

      <div id="clerk-captcha" />
    </form>
  );
}
