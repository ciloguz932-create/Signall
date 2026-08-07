import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale } from "@/lib/content";
import {
  getCourse,
  getCourseSlugs,
  academyCategoryLabel,
} from "@/lib/academy";
import CourseCard from "@/components/CourseCard";
import { Reveal, Aurora } from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getCourseSlugs();
  return (["tr", "en"] as const).flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

const t = {
  tr: {
    back: "MENAR Akademi",
    about: "Bu ders hakkında",
    lessons: "Dersler",
    resources: "Kaynaklar",
    related: "İlgili dersler",
    level: "Seviye",
  },
  en: {
    back: "MENAR Academy",
    about: "About this course",
    lessons: "Lessons",
    resources: "Resources",
    related: "Related courses",
    level: "Level",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const course = getCourse(slug, lang);
  if (!course) return { title: "MENAR Akademi" };
  return {
    title: `${course.title} · MENAR Akademi`,
    description: course.tagline,
    alternates: { canonical: `/${lang}/academy/${slug}` },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = (langParam === "en" ? "en" : "tr") as Locale;
  const course = getCourse(slug, lang);
  if (!course) notFound();

  const copy = t[lang];
  const related = course.related
    .map((s) => getCourse(s, lang))
    .filter((c): c is NonNullable<typeof c> => c !== null && c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-deep pt-28 pb-20">
        <Aurora variant="dark" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})` }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <Link
              href={`/${lang}/academy`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-gold-light/70 uppercase transition-colors hover:text-gold-light"
            >
              <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copy.back}
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white uppercase"
                style={{ backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})` }}
              >
                {academyCategoryLabel(course.category, lang)}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-wide text-white/60 uppercase">
                {copy.level}: {course.level}
              </span>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-5 font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>
          </Reveal>
          <Reveal as="p" delay={220} className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
            {course.tagline}
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="relative mx-auto max-w-4xl px-6">
          {/* About */}
          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-brand-deep">{copy.about}</h2>
          </Reveal>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-deep/75">
            {course.description.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 90}>
                {p}
              </Reveal>
            ))}
          </div>

          {/* Lessons (curriculum) */}
          <div className="mt-14">
            <Reveal>
              <h2 className="mb-6 font-serif text-2xl font-semibold text-brand-deep">{copy.lessons}</h2>
            </Reveal>
            <ol className="divide-y divide-brand-deep/10 border-y border-brand-deep/10">
              {course.lessons.map((lesson, i) => (
                <Reveal as="li" key={i} delay={i * 70}>
                  <div className="group flex items-center gap-5 py-5">
                    <span className="font-serif text-2xl font-semibold text-brand-deep/15 transition-colors group-hover:text-gold sm:text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-medium text-brand-deep">{lesson.title}</span>
                    <span className="font-mono text-[11px] tracking-wide text-brand-deep/40 uppercase">
                      {lesson.duration}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Resources */}
          {course.resources.length > 0 && (
            <div className="mt-14">
              <Reveal>
                <h2 className="mb-6 font-serif text-2xl font-semibold text-brand-deep">{copy.resources}</h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {course.resources.map((res, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <div className="flex items-start gap-4 rounded-2xl border border-brand-deep/10 bg-mist/60 p-5 transition-colors hover:border-gold/40">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-deep/5 text-brand-mid">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M4 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2zM14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium text-brand-deep">{res.label}</p>
                        <p className="mt-0.5 text-sm text-brand-deep/55">{res.note}</p>
                      </div>
                    </div>
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
                  <CourseCard course={item} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
