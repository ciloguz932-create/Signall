"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const current = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  ) ?? ("tr" as Locale);

  const switchTo = useCallback(
    (locale: Locale) => {
      const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
      startTransition(() => {
        router.push(`/${locale}${rest}`);
      });
    },
    [pathname, router]
  );

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          disabled={isPending}
          aria-pressed={current === locale}
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
            current === locale
              ? "bg-white text-brand-deep"
              : "text-white/80 hover:text-white"
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
