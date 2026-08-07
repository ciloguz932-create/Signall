import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale } from "@/lib/content";
import { loadPageData } from "@/lib/store";
import {
  getShopProduct,
  getShopProductSlugs,
  shopCategoryLabel,
  formatPrice,
} from "@/lib/shop";
import { getInquiryHref } from "@/lib/checkout";
import ShopProductCard from "@/components/ShopProductCard";
import { Reveal, Aurora, Magnet } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getShopProductSlugs();
  return (["tr", "en"] as const).flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

const t = {
  tr: {
    back: "MENAR Shop",
    about: "Ürün hakkında",
    features: "Özellikler",
    faq: "Sıkça sorulanlar",
    related: "İlgili ürünler",
    checkoutTitle: "Satın alma yakında",
    checkoutNote:
      "Çevrimiçi ödeme henüz aktif değil ve sahte bir ödeme akışı sunmuyoruz. Sipariş ve bilgi için bize ulaşabilirsin.",
    getInfo: "Bilgi Al",
  },
  en: {
    back: "MENAR Shop",
    about: "About the product",
    features: "Features",
    faq: "Frequently asked",
    related: "Related products",
    checkoutTitle: "Purchasing coming soon",
    checkoutNote:
      "Online payment is not active yet and we don't present a fake checkout. Reach out to us for orders and information.",
    getInfo: "Get Info",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const product = getShopProduct(slug, lang);
  if (!product) return { title: "MENAR Shop" };
  return {
    title: `${product.title} · MENAR Shop`,
    description: product.tagline,
    alternates: { canonical: `/${lang}/shop/${slug}` },
  };
}

export default async function ShopProductPage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const product = getShopProduct(slug, lang);
  if (!product) notFound();

  const copy = t[lang];
  const { dict } = await loadPageData(lang);
  const inquiryHref = getInquiryHref(dict.contact.instagramUrl);
  const related = product.related
    .map((s) => getShopProduct(s, lang))
    .filter((p): p is NonNullable<typeof p> => p !== null && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* Header + cover */}
      <section className="relative overflow-hidden bg-brand-deep pt-28 pb-20">
        <Aurora variant="dark" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <Link
              href={`/${lang}/shop`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-gold-light/70 uppercase transition-colors hover:text-gold-light"
            >
              <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copy.back}
            </Link>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,24rem)_1fr]">
            {/* Cover */}
            <Reveal>
              <div
                className="relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10"
                style={{ backgroundImage: `linear-gradient(150deg, ${product.cover.from}, ${product.cover.to})` }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-1 font-serif text-[11rem] leading-none font-semibold text-white/10">
                  {product.title.charAt(0)}
                </span>
                <span className="relative z-10 m-5 rounded-full bg-black/25 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
                  {shopCategoryLabel(product.category, lang)}
                </span>
              </div>
            </Reveal>

            {/* Meta */}
            <div>
              <Reveal delay={80}>
                <h1 className="font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
                  {product.title}
                </h1>
              </Reveal>
              <Reveal as="p" delay={140} className="mt-3 max-w-xl leading-relaxed text-white/65">
                {product.tagline}
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 font-serif text-3xl font-semibold text-gold tabular-nums">
                  {formatPrice(product.price, lang)}
                </p>
              </Reveal>

              {/* Honest checkout abstraction (no fake payment) */}
              <Reveal delay={280}>
                <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 p-6">
                  <p className="text-sm font-semibold text-white/90">{copy.checkoutTitle}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">{copy.checkoutNote}</p>
                  <Magnet>
                    <a
                      href={inquiryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sheen mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-[position:right_center]"
                    >
                      {copy.getInfo}
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </Magnet>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Description + features */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid gap-14 md:grid-cols-[1fr_minmax(0,18rem)]">
            <div>
              <Reveal>
                <h2 className="font-serif text-2xl font-semibold text-brand-deep">{copy.about}</h2>
              </Reveal>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-deep/75">
                {product.description.map((p, i) => (
                  <Reveal as="p" key={i} delay={i * 90}>
                    {p}
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal>
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-brand-deep/45 uppercase">
                  {copy.features}
                </h3>
              </Reveal>
              <ul className="mt-5 space-y-3">
                {product.features.map((f, i) => (
                  <Reveal as="li" key={i} delay={i * 60} className="flex items-start gap-3 text-brand-deep/75">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm leading-relaxed">{f}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ — native details (works without JS, animates open/close) */}
          {product.faq.length > 0 && (
            <div className="mt-16 max-w-2xl">
              <Reveal>
                <h2 className="mb-6 font-serif text-2xl font-semibold text-brand-deep">{copy.faq}</h2>
              </Reveal>
              <div className="divide-y divide-brand-deep/10 border-y border-brand-deep/10">
                {product.faq.map((item, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <details className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-brand-deep marker:hidden">
                        {item.q}
                        <svg className="h-5 w-5 shrink-0 text-gold-dark transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-brand-deep/60">{item.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-mist py-20 md:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="mb-8 font-serif text-2xl font-semibold text-brand-deep sm:text-3xl">{copy.related}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 70}>
                  <ShopProductCard product={item} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
