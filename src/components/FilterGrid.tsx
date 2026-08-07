"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/content";
import type { ShopProductView } from "@/lib/shop";
import type { CourseView } from "@/lib/academy";
import ShopProductCard from "@/components/ShopProductCard";
import CourseCard from "@/components/CourseCard";

export type FilterOption = { key: string; label: string };

type BaseProps = {
  filters: FilterOption[];
  lang: Locale;
  emptyLabel: string;
};

type Props =
  | (BaseProps & { kind: "shop"; items: ShopProductView[] })
  | (BaseProps & { kind: "academy"; items: CourseView[] });

export default function FilterGrid(props: Props) {
  const { filters, lang, emptyLabel } = props;
  const [active, setActive] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: props.items.length };
    for (const it of props.items) {
      map[it.category] = (map[it.category] ?? 0) + 1;
    }
    return map;
  }, [props.items]);

  const visibleShop =
    props.kind === "shop"
      ? active === "all"
        ? props.items
        : props.items.filter((i) => i.category === active)
      : [];
  const visibleAcademy =
    props.kind === "academy"
      ? active === "all"
        ? props.items
        : props.items.filter((i) => i.category === active)
      : [];

  const total =
    props.kind === "shop" ? visibleShop.length : visibleAcademy.length;

  return (
    <div>
      {/* Filter chips — horizontally scrollable on mobile, touch-friendly */}
      <div
        role="tablist"
        aria-label={lang === "tr" ? "Kategoriler" : "Categories"}
        className="-mx-6 mb-10 flex snap-x gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((f) => {
          const isActive = active === f.key;
          const count = counts[f.key] ?? 0;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "border-gold bg-gold text-brand-deep shadow-sm"
                  : "border-brand-deep/15 bg-white text-brand-deep/70 hover:border-gold/50 hover:text-brand-deep"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                  isActive ? "bg-brand-deep/10 text-brand-deep/70" : "bg-brand-deep/5 text-brand-deep/40"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid — re-mounted on filter change (key) to replay the entry animation */}
      {total === 0 ? (
        <p className="py-16 text-center font-serif text-xl italic text-brand-deep/40">
          {emptyLabel}
        </p>
      ) : (
        <div
          key={active}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {props.kind === "shop"
            ? visibleShop.map((product, i) => (
                <div
                  key={product.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <ShopProductCard product={product} lang={lang} />
                </div>
              ))
            : visibleAcademy.map((course, i) => (
                <div
                  key={course.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <CourseCard course={course} lang={lang} />
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
