import Link from "next/link";
import { categoryLabel, type KidsProductView } from "@/lib/kids";
import type { Locale } from "@/lib/content";

/** Cover placeholder — no fabricated product photos; a typeset gradient
 *  "cover" keyed off the product's colors, in the site's editorial style. */
function CoverArt({ product }: { product: KidsProductView }) {
  return (
    <div
      className="relative flex aspect-[3/4] items-end overflow-hidden rounded-xl"
      style={{
        backgroundImage: `linear-gradient(150deg, ${product.cover.from}, ${product.cover.to})`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:18px_18px]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-1 font-serif text-[9rem] leading-none font-semibold text-white/10 transition-transform duration-500 group-hover:scale-110"
      >
        {product.title.charAt(0)}
      </span>
      <div className="relative z-10 p-5">
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase">
          MENAR Kids
        </span>
        <p className="mt-1 font-serif text-lg leading-snug font-semibold text-white">
          {product.title}
        </p>
      </div>
    </div>
  );
}

export default function KidsProductCard({
  product,
  lang,
}: {
  product: KidsProductView;
  lang: Locale;
}) {
  const ageLabel = lang === "tr" ? "Yaş" : "Age";

  return (
    <Link
      href={`/${lang}/kids/${product.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-brand-deep/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_-24px_rgba(10,43,32,0.4)]"
    >
      <div className="overflow-hidden">
        <CoverArt product={product} />
      </div>
      <div className="flex flex-1 flex-col px-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-gold-dark uppercase">
            {categoryLabel(product.category, lang)}
          </span>
          <span className="rounded-full bg-brand-deep/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-brand-deep/55">
            {ageLabel} {product.ageGroup}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-xl font-semibold text-brand-deep">
          {product.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-brand-deep/60">
          {product.tagline}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark">
          {lang === "tr" ? "İncele" : "View"}
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
