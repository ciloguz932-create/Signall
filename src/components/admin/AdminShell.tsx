"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import BirdLogo from "@/components/BirdLogo";

const NAV = [
  { href: "/admin", num: "01", label: "Yönetim" },
  { href: "/admin/posts", num: "02", label: "Yazılar" },
  { href: "/admin/settings", num: "03", label: "Ayarlar" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-brand-deep lg:flex">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <BirdLogo className="h-9 w-9" animated={false} />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold tracking-[0.15em] text-white uppercase">
              Menar
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-gold-light uppercase">
              Yönetim
            </span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-6" aria-label="Yönetim">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-gold-light"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] text-gold">
                  {item.num}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-6 py-5">
          <a
            href="/tr"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 block text-sm text-white/65 transition-colors hover:text-gold-light"
          >
            Siteyi Gör →
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-lg border border-gold/30 px-4 py-2.5 text-sm text-gold-light transition-colors hover:bg-gold/10"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-brand-deep/10 bg-brand-deep px-5 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <BirdLogo className="h-7 w-7" animated={false} />
            <span className="font-serif text-sm font-semibold tracking-[0.15em] text-white uppercase">
              Menar
            </span>
          </div>
          <div className="flex items-center gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-[10px] uppercase tracking-widest ${
                  pathname.startsWith(item.href)
                    ? "text-gold-light"
                    : "text-white/50"
                }`}
              >
                {item.num}
              </Link>
            ))}
            <form action={logout}>
              <button
                type="submit"
                className="font-mono text-[10px] tracking-widest text-white/50 uppercase hover:text-gold-light"
              >
                Çıkış
              </button>
            </form>
          </div>
        </div>
        <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
          {children}
        </main>
      </div>
    </div>
  );
}
