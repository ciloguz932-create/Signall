import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menar — Dünyayı Anla, Geleceği Keşfet",
  description:
    "Menar: tarih, bilim ve felsefe üzerine düşünceler. Understand the world, design the future.",
  openGraph: {
    title: "Menar",
    description:
      "Tarih, bilim ve felsefe üzerine düşünceler. Understand the world, design the future.",
    type: "website",
  },
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
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-deep">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-deep/80 backdrop-blur-xl">
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
            <nav className="hidden items-center gap-8 text-sm text-white/85 sm:flex">
              <Link
                href={`/${lang}#posts`}
                className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {dict.nav.posts}
              </Link>
              <Link
                href={`/${lang}#about`}
                className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {dict.nav.about}
              </Link>
              <Link
                href={`/${lang}#contact`}
                className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {dict.nav.contact}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="relative border-t border-gold/20 bg-brand-deep py-12 text-white">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center">
            <div className="flex items-center gap-2">
              <BirdLogo className="h-6 w-6" />
              <span className="font-serif text-lg font-semibold tracking-[0.15em] uppercase">
                Menar
              </span>
            </div>
            <p className="font-serif text-sm italic text-sage">
              {dict.footer.tagline}
            </p>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Menar. {dict.footer.rights}
            </p>
            <p className="text-xs text-white/30">
              Motion effects inspired by{" "}
              <a
                href="https://github.com/DavidHDev/react-bits"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white/60"
              >
                react-bits
              </a>{" "}
              by DavidHDev (MIT)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
