"use client";

import { useSyncExternalStore } from "react";

type Theme = "green" | "mono";

const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "mono" ? "mono" : "green";
}

function getServerSnapshot(): Theme {
  return "green";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("menar-theme", next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

const OPTIONS: { key: Theme; label: string; icon: React.ReactNode }[] = [
  {
    key: "green",
    label: "Yeşil tema",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "mono",
    label: "Siyah-beyaz tema",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="group"
      aria-label="Tema"
      className="relative flex items-center rounded-full border border-white/15 bg-white/5 p-0.5"
    >
      <span
        aria-hidden="true"
        className="absolute top-0.5 bottom-0.5 w-8 rounded-full bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: theme === "mono" ? "translateX(2rem)" : "translateX(0)" }}
      />
      {OPTIONS.map((opt) => {
        const active = theme === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => setTheme(opt.key)}
            aria-pressed={active}
            aria-label={opt.label}
            title={opt.label}
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
              active ? "text-brand-deep" : "text-white/60 hover:text-white"
            }`}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
