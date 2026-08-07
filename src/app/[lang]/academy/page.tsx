import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/content";
import {
  getCourses,
  academyFilterOrder,
  academyCategoryLabels,
  academyAllLabel,
} from "@/lib/academy";
import FilterGrid, { type FilterOption } from "@/components/FilterGrid";
import { Reveal, Aurora, GhostWord } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ lang: string }> };

const t = {
  tr: {
    title: "Öğrenmenin yeni yolu",
    subtitle: "Matematikten dile, bilimden İslami ilimlere kısa ve derli toplu dersler.",
    ghost: "Öğren",
    empty: "Bu kategoride ders yok.",
  },
  en: {
    title: "A new way to learn",
    subtitle: "Concise, well-structured lessons from math and language to science and Islamic studies.",
    ghost: "Learn",
    empty: "No courses in this category.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  return {
    title: "MENAR Akademi",
    description: t[lang].subtitle,
    alternates: { canonical: `/${lang}/academy` },
  };
}

export default async function AcademyPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const copy = t[lang];
  const courses = getCourses(lang);

  const filters: FilterOption[] = academyFilterOrder.map((key) => ({
    key,
    label: key === "all" ? academyAllLabel[lang] : academyCategoryLabels[key][lang],
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
              MENAR Akademi
            </h1>
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 max-w-xl font-serif text-xl italic text-gold-light/80">
            {copy.title}
          </Reveal>
          <Reveal as="p" delay={240} className="mt-4 max-w-2xl leading-relaxed text-white/55">
            {copy.subtitle}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <FilterGrid
            kind="academy"
            items={courses}
            filters={filters}
            lang={lang}
            emptyLabel={copy.empty}
          />
        </div>
      </section>
    </>
  );
}
