import { loadPageData, type Locale } from "@/lib/store";
import Link from "next/link";
import Nav from "@/components/Nav";
import BirdLogo from "@/components/BirdLogo";

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamic = "force-dynamic";

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const { dict } = await loadPageData(lang);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
        }}
      />
      <Nav dict={dict} lang={lang} />
      <main id="main" className="flex-1">
        {children}
      </main>
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
          <p className="mt-2">
            <Link
              href="/admin"
              className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase transition-colors hover:text-gold-light"
            >
              Yönetim
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
