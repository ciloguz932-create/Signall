import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import BirdLogo from "@/components/BirdLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menar — Dünyayı Anla, Geleceği Keşfet",
  description:
    "Menar: tarih, bilim ve felsefe üzerine düşünceler. Understand the world, design the future.",
};

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand-deep">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-deep/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-3 text-white"
            >
              <BirdLogo className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight">Menar</span>
            </Link>
            <nav className="hidden items-center gap-8 text-sm text-white/85 sm:flex">
              <Link href={`/${lang}#posts`} className="transition-colors hover:text-white">
                {dict.nav.posts}
              </Link>
              <Link href={`/${lang}#about`} className="transition-colors hover:text-white">
                {dict.nav.about}
              </Link>
              <Link href={`/${lang}#contact`} className="transition-colors hover:text-white">
                {dict.nav.contact}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-brand-deep/10 bg-white py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center">
            <div className="flex items-center gap-2 text-brand-deep">
              <BirdLogo className="h-6 w-6" />
              <span className="font-semibold">Menar</span>
            </div>
            <p className="text-sm text-brand-deep/60">{dict.footer.tagline}</p>
            <p className="text-xs text-brand-deep/40">
              © {new Date().getFullYear()} Menar. {dict.footer.rights}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
