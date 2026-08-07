import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/content";
import {
  getKidsProducts,
  kidsCategoryOrder,
  categoryLabel,
} from "@/lib/kids";
import KidsProductCard from "@/components/KidsProductCard";
import { Reveal, Aurora, GhostWord } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ lang: string }>;
};

const t = {
  tr: {
    badge: "MENAR Kids",
    title: "Çocuklar için bir keşif dünyası",
    subtitle: "Çocuklar için hikâyeler, keşif ve öğrenme.",
    ghost: "Merak",
    intro:
      "Hikâye kitaplarından boyama setlerine, eğitsel içeriklerden ilk kelime kitaplarına — çocukların hayal gücünü ve merakını besleyen bir seçki.",
    empty: "Henüz ürün yok.",
  },
  en: {
    badge: "MENAR Kids",
    title: "A world of discovery for children",
    subtitle: "Stories, discovery and learning for children.",
    ghost: "Wonder",
    intro:
      "From story books to coloring sets, from educational content to first-word books — a selection that nurtures children's imagination and curiosity.",
    empty: "No products yet.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  return {
    title: "MENAR Kids",
    description: t[lang].subtitle,
    alternates: { canonical: `/${lang}/kids` },
  };
}

export default async function KidsPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const copy = t[lang];
  const products = getKidsProducts(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-deep pt-32 pb-24">
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-drift-b absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/35 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <GhostWord className="-right-4 top-14 hidden sm:block">{copy.ghost}</GhostWord>
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal as="div">
            <Link
              href={`/${lang}#brands`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-gold-light/70 uppercase transition-colors hover:text-gold-light"
            >
              <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              MENAR
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
          </Reveal>
          <Reveal as="p" delay={180} className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            {copy.subtitle}
          </Reveal>
          <Reveal as="p" delay={260} className="mt-4 max-w-2xl leading-relaxed text-white/45">
            {copy.intro}
          </Reveal>
        </div>
      </section>

      {/* Product groups */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          {products.length === 0 ? (
            <p className="py-16 text-center font-serif text-xl italic text-brand-deep/40">
              {copy.empty}
            </p>
          ) : (
            <div className="space-y-20">
              {kidsCategoryOrder.map((category) => {
                const items = products.filter((p) => p.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <Reveal>
                      <div className="mb-8 flex items-baseline gap-4">
                        <h2 className="font-serif text-2xl font-semibold text-brand-deep sm:text-3xl">
                          {categoryLabel(category, lang)}
                        </h2>
                        <span className="h-px flex-1 bg-brand-deep/10" />
                        <span className="font-mono text-[11px] tracking-[0.2em] text-brand-deep/40 uppercase">
                          {String(items.length).padStart(2, "0")}
                        </span>
                      </div>
                    </Reveal>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((product, i) => (
                        <Reveal key={product.slug} delay={i * 70}>
                          <KidsProductCard product={product} lang={lang} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
