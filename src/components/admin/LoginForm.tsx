"use client";

import { useState } from "react";
import { useActionState } from "react";
import { login, type ActionResult } from "@/app/admin/actions";
import BirdLogo from "@/components/BirdLogo";

export default function LoginForm() {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    login,
    null
  );
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="w-full max-w-sm">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="lbl text-gold-light">
          Yönetici Şifresi
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            required
            autoFocus
            className="inp !border-gold/40 !bg-white/10 !text-white placeholder:!text-white/35 focus:!border-gold"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] tracking-widest text-gold-light uppercase hover:text-white"
            aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {show ? "Gizle" : "Göster"}
          </button>
        </div>
      </div>
      {state?.ok === false && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm text-gold-light"
        >
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-gold mt-6 w-full disabled:opacity-60"
      >
        {pending ? "Doğrulanıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}

export function LoginShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-deep px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulse-glow animate-drift-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="animate-drift-b absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative flex w-full flex-col items-center text-center">
        <div className="mb-8 rounded-full border border-gold/30 bg-white/5 p-4">
          <BirdLogo className="h-16 w-16" animated={false} />
        </div>
        <span className="mb-3 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-gold-light uppercase">
          <span className="h-px w-8 bg-gold/60" />
          Yönetim Paneli
          <span className="h-px w-8 bg-gold/60" />
        </span>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-white">
          Menar
        </h1>
        <div className="mt-10 w-full">{children}</div>
      </div>
    </main>
  );
}
