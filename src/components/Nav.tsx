"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import BirdLogo from "@/components/BirdLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["brands", "posts", "about", "contact"] as const;

export default function Nav({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      setScrolled(el.scrollTop > 24);
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
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [pathname]);

  type NavLink = {
    key: string;
    href: string;
    label: string;
  } & ({ kind: "route"; match: string } | { kind: "anchor"; section: string });

  const links: NavLink[] = [
    { key: "explore", href: `/${lang}#brands`, label: dict.nav.explore, kind: "anchor", section: "brands" },
    { key: "academy", href: `/${lang}/academy`, label: dict.nav.academy, kind: "route", match: `/${lang}/academy` },
    { key: "kids", href: `/${lang}/kids`, label: dict.nav.kids, kind: "route", match: `/${lang}/kids` },
    { key: "shop", href: `/${lang}/shop`, label: dict.nav.shop, kind: "route", match: `/${lang}/shop` },
    { key: "about", href: `/${lang}#about`, label: dict.nav.about, kind: "anchor", section: "about" },
  ];

  const isActive = (link: NavLink) => {
    if (link.kind === "route") {
      return pathname === link.match || pathname.startsWith(link.match + "/");
    }
    return onHome && activeSection === link.section;
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open || !onHome
            ? "border-b border-white/10 bg-brand-deep/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href={`/${lang}`} className="group flex items-center gap-3 text-white">
            <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <BirdLogo className="h-9 w-9" />
            </span>
            <span className="font-serif text-lg font-semibold tracking-[0.15em] text-white uppercase">
              Menar
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/85 md:flex" aria-label="Main">
            {links.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all hover:text-white hover:after:w-full ${
                    active ? "text-gold after:w-full" : "after:w-0"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-white/10 bg-brand-deep/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 text-white/85" aria-label="Mobile">
            {links.map((link, i) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors hover:bg-white/5 hover:text-white ${
                  isActive(link) ? "text-gold" : ""
                }`}
              >
                <sup className="font-mono text-[10px] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </sup>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
