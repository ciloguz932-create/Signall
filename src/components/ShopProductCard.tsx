import Link from "next/link";
import {
  shopCategoryLabel,
  formatPrice,
  type ShopProductView,
} from "@/lib/shop";
import type { Locale } from "@/lib/content";

export default function ShopProductCard({
  product,
  lang,
}: {
  product: ShopProductView;
  lang: Locale;
}) {
  return (
    <Link
      href={`/${lang}/shop/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-deep/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_-24px_rgba(10,43,32,0.4)]"
    >
      <div
        className="cover-art relative aspect-[4/3] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(150deg, ${product.cover.from}, ${product.cover.to})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:18px_18px]" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -right-2 font-serif text-[8rem] leading-none font-semibold text-white/10 transition-transform duration-500 group-hover:scale-110"
        >
          {product.title.charAt(0)}
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
          {shopCategoryLabel(product.category, lang)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-brand-deep">
          {product.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-brand-deep/60">
          {product.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-gold-dark tabular-nums">
            {formatPrice(product.price, lang)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep/70 transition-colors group-hover:text-gold-dark">
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
      </div>
    </Link>
  );
}
