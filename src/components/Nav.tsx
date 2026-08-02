"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import BirdLogo from "@/components/BirdLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["posts", "about", "contact"] as const;

export default function Nav({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const links = [
    { id: "posts", label: dict.nav.posts },
    { id: "about", label: dict.nav.about },
    { id: "contact", label: dict.nav.contact },
  ];

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-deep/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href={`/${lang}`}
            className="group flex items-center gap-3 text-white"
          >
            <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BirdLogo className="h-9 w-9" />
            </span>
            <span className="font-serif text-lg font-semibold tracking-[0.15em] text-white uppercase">
              Menar
            </span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-sm text-white/85 sm:flex"
            aria-label="Main"
          >
            {links.map((link, i) => {
              const isActive = active === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/${lang}#${link.id}`}
                  className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all hover:text-white hover:after:w-full ${
                    isActive
                      ? "text-gold after:w-full"
                      : "after:w-0"
                  }`}
                >
                  <sup className="mr-1.5 font-mono text-[10px] tracking-normal text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </sup>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}
