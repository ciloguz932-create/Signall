import Link from "next/link";
import { academyCategoryLabel, type CourseView } from "@/lib/academy";
import type { Locale } from "@/lib/content";

export default function CourseCard({
  course,
  lang,
}: {
  course: CourseView;
  lang: Locale;
}) {
  const lessonsLabel =
    course.lessons.length + " " + (lang === "tr" ? "ders" : "lessons");

  return (
    <Link
      href={`/${lang}/academy/${course.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-deep/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_-24px_rgba(10,43,32,0.4)]"
    >
      {/* accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 transition-transform duration-300"
        style={{
          backgroundImage: `linear-gradient(90deg, ${course.accent.from}, ${course.accent.to})`,
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center justify-center rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white uppercase"
          style={{
            backgroundImage: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})`,
          }}
        >
          {academyCategoryLabel(course.category, lang)}
        </span>
        <span className="rounded-full bg-brand-deep/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-brand-deep/55">
          {course.level}
        </span>
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold text-brand-deep">
        {course.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-brand-deep/60">
        {course.tagline}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-brand-deep/10 pt-4">
        <span className="font-mono text-[11px] tracking-wide text-brand-deep/45 uppercase">
          {lessonsLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep/70 transition-colors group-hover:text-gold-dark">
          {lang === "tr" ? "Derse Git" : "Open"}
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
