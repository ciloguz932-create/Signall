import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/content";
import {
  getShopProducts,
  shopFilterOrder,
  shopCategoryLabels,
  shopAllLabel,
} from "@/lib/shop";
import FilterGrid, { type FilterOption } from "@/components/FilterGrid";
import { Reveal, Aurora, GhostWord } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ lang: string }> };

const t = {
  tr: {
    badge: "MENAR Shop",
    title: "Dijital ve fiziksel ürünler",
    subtitle: "Kitaplar, dijital derlemeler ve özenle tasarlanmış baskılar.",
    ghost: "Ürün",
    empty: "Bu kategoride ürün yok.",
  },
  en: {
    badge: "MENAR Shop",
    title: "Digital and physical products",
    subtitle: "Books, digital collections and carefully designed prints.",
    ghost: "Store",
    empty: "No products in this category.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  return {
    title: "MENAR Shop",
    description: t[lang].subtitle,
    alternates: { canonical: `/${lang}/shop` },
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const copy = t[lang];
  const products = getShopProducts(lang);

  const filters: FilterOption[] = shopFilterOrder.map((key) => ({
    key,
    label: key === "all" ? shopAllLabel[lang] : shopCategoryLabels[key][lang],
  }));

  return (
    <>
      <section className="relative overflow-hidden bg-brand-deep pt-32 pb-24">
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-drift-b absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/35 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <GhostWord className="-right-4 top-14 hidden sm:block">{copy.ghost}</GhostWord>
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
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
            <h1 className="mt-6 max-w-3xl font-serif text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
          </Reveal>
          <Reveal as="p" delay={180} className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            {copy.subtitle}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <FilterGrid
            kind="shop"
            items={products}
            filters={filters}
            lang={lang}
            emptyLabel={copy.empty}
          />
        </div>
      </section>
    </>
  );
}
