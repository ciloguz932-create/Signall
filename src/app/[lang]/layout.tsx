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
      <footer className="relative border-t border-gold/20 bg-brand-deep text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BirdLogo className="h-7 w-7" />
              <span className="font-serif text-lg font-semibold tracking-[0.15em] uppercase">
                Menar
              </span>
            </div>
            <p className="max-w-xs font-serif text-sm leading-relaxed italic text-sage">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Sections */}
          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <span className="font-mono text-[10px] tracking-[0.25em] text-gold/70 uppercase">
              {dict.brandGrid.kicker}
            </span>
            {[
              { id: "brands", label: dict.nav.explore },
              { id: "posts", label: dict.nav.posts },
              { id: "about", label: dict.nav.about },
              { id: "contact", label: dict.nav.contact },
            ].map((link) => (
              <Link
                key={link.id}
                href={`/${lang}#${link.id}`}
                className="w-fit text-white/60 transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-mono text-[10px] tracking-[0.25em] text-gold/70 uppercase">
              {dict.contact.title}
            </span>
            <a
              href={dict.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-white/60 transition-colors hover:text-gold-light"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.62 2.2 15.24 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.06a4.94 4.94 0 1 0 0 9.88 4.94 4.94 0 0 0 0-9.88Zm0 8.15a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42Zm6.3-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
              </svg>
              {dict.contact.instagram}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Menar. {dict.footer.rights}
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/DavidHDev/react-bits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/30 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/60"
              >
                react-bits (MIT)
              </a>
              <Link
                href="/admin"
                className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase transition-colors hover:text-gold-light"
              >
                Yönetim
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
