import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale } from "@/lib/content";
import { loadPageData } from "@/lib/store";
import {
  getKidsProduct,
  getKidsProductSlugs,
  categoryLabel,
} from "@/lib/kids";
import KidsProductCard from "@/components/KidsProductCard";
import { Reveal, Aurora } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getKidsProductSlugs();
  return (["tr", "en"] as const).flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

const t = {
  tr: {
    back: "MENAR Kids",
    ageGroup: "Yaş grubu",
    pages: "Sayfa",
    format: "Format",
    story: "Hikâye",
    samplePages: "Örnek sayfalar",
    samplePage: "Örnek Sayfa",
    availability: "Bu ürün yakında MENAR Shop'ta yer alacak.",
    availabilityNote:
      "Satış ve fiyat bilgisi için bize ulaşabilirsin. Sahte bir ödeme akışı sunmuyoruz.",
    getInfo: "Bilgi Al",
    related: "İlgili ürünler",
  },
  en: {
    back: "MENAR Kids",
    ageGroup: "Age group",
    pages: "Pages",
    format: "Format",
    story: "Story",
    samplePages: "Sample pages",
    samplePage: "Sample Page",
    availability: "This product will soon be available in MENAR Shop.",
    availabilityNote:
      "Reach out to us for availability and pricing. We don't present a fake checkout flow.",
    getInfo: "Get Info",
    related: "Related products",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const product = getKidsProduct(slug, lang);
  if (!product) return { title: "MENAR Kids" };
  return {
    title: `${product.title} · MENAR Kids`,
    description: product.tagline,
    alternates: { canonical: `/${lang}/kids/${slug}` },
  };
}

export default async function KidsProductPage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const product = getKidsProduct(slug, lang);
  if (!product) notFound();

  const copy = t[lang];
  const { dict } = await loadPageData(lang);
  const instagramUrl =
    dict.contact.instagramUrl || "https://www.instagram.com/menar.official/";
  const related = product.related
    .map((s) => getKidsProduct(s, lang))
    .filter((p): p is NonNullable<typeof p> => p !== null && p.slug !== product.slug)
    .slice(0, 3);

  const facts = [
    { label: copy.ageGroup, value: product.ageGroup },
    { label: copy.pages, value: String(product.pages) },
    { label: copy.format, value: product.format },
  ];

  return (
    <>
      {/* Header + cover */}
      <section className="relative overflow-hidden bg-brand-deep pt-28 pb-20">
        <Aurora variant="dark" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <Link
              href={`/${lang}/kids`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-gold-light/70 uppercase transition-colors hover:text-gold-light"
            >
              <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copy.back}
            </Link>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,22rem)_1fr]">
            {/* Cover */}
            <Reveal>
              <div
                className="relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${product.cover.from}, ${product.cover.to})`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                <span aria-hidden="true" className="pointer-events-none absolute -top-8 right-2 font-serif text-[12rem] leading-none font-semibold text-white/10">
                  {product.title.charAt(0)}
                </span>
                <div className="relative z-10 p-6">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
                    MENAR Kids
                  </span>
                  <p className="mt-1 font-serif text-2xl leading-snug font-semibold text-white">
                    {product.title}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Meta */}
            <div>
              <Reveal>
                <span className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase">
                  {categoryLabel(product.category, lang)}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-3 font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
                  {product.title}
                </h1>
              </Reveal>
              <Reveal as="p" delay={160} className="mt-4 max-w-xl leading-relaxed text-white/65">
                {product.tagline}
              </Reveal>

              <Reveal delay={240}>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1">
                      <dt className="font-mono text-[10px] tracking-[0.2em] text-gold-light/60 uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-medium text-white/85">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* Honest availability (no fake checkout) */}
              <Reveal delay={320}>
                <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/5 p-6">
                  <p className="text-sm leading-relaxed text-white/80">{copy.availability}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                    {copy.availabilityNote}
                  </p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sheen mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-[position:right_center]"
                  >
                    {copy.getInfo}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Story + sample pages */}
      <section className="relative overflow-hidden bg-white py-24 md:py-28">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid gap-14 md:grid-cols-[1fr_minmax(0,20rem)]">
            <div>
              <Reveal>
                <h2 className="font-serif text-2xl font-semibold text-brand-deep">
                  {copy.story}
                </h2>
              </Reveal>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-deep/75">
                {product.intro.map((paragraph, i) => (
                  <Reveal
                    as="p"
                    key={i}
                    delay={i * 100}
                    className={
                      i === 0
                        ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-gold"
                        : ""
                    }
                  >
                    {paragraph}
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Sample page placeholders (clearly labelled, no fake photos) */}
            <div>
              <Reveal>
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-brand-deep/45 uppercase">
                  {copy.samplePages}
                </h3>
              </Reveal>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((n) => (
                  <Reveal key={n} delay={n * 70}>
                    <div
                      className="relative flex aspect-[3/4] items-end overflow-hidden rounded-lg ring-1 ring-brand-deep/10"
                      style={{
                        backgroundImage: `linear-gradient(150deg, ${product.cover.from}22, ${product.cover.to}44)`,
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_1px_rgba(10,43,32,0.12)_1px,transparent_1px)] [background-size:14px_14px]" />
                      <span className="relative z-10 p-3 font-mono text-[9px] tracking-[0.15em] text-brand-deep/40 uppercase">
                        {copy.samplePage} {String(n + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-mist py-24 md:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal>
              <h2 className="mb-8 font-serif text-2xl font-semibold text-brand-deep sm:text-3xl">
                {copy.related}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 70}>
                  <KidsProductCard product={item} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
