"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({
  callbackUrl,
  initialError,
}: {
  callbackUrl: string;
  initialError?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(initialError);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    setPending(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result || result.error) {
      setError("E-mail ou senha incorretos.");
      setPending(false);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-silver-50/10 bg-ink-2/40 p-8 backdrop-blur"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-[0.2em] text-silver-50/60"
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-silver-50 outline-none focus:border-silver-50/40"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs uppercase tracking-[0.2em] text-silver-50/60"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-silver-50/15 bg-ink/60 px-3 py-2.5 text-silver-50 outline-none focus:border-silver-50/40"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-silver-50 px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-silver-50/90 disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
