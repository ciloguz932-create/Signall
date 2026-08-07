import Link from "next/link";
import { loadPageData, type Locale } from "@/lib/store";
import BirdLogo from "@/components/BirdLogo";
import { Stagger } from "@/components/Stagger";
import { CursorGlow } from "@/components/CursorGlow";
import {
  Reveal,
  SpotlightCard,
  Magnet,
  CountUp,
  Marquee,
  Aurora,
  GhostWord,
  Sparkle,
} from "@/components/motion";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ lang: string }>;
};

const BRAND_ICON_PATHS: Record<string, string> = {
  // sparkle — creative / media studio
  studio: "M12 3l1.8 4.6L18.5 9.4l-4.7 1.9L12 16l-1.8-4.7L5.5 9.4l4.7-1.8z",
  // graduation cap — academy
  academy: "M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5",
  // smile — kids
  kids: "M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14s1.3 2 3.5 2 3.5-2 3.5-2M9 9.5h.01M15 9.5h.01",
  // shopping bag — shop
  shop: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  // beaker — lab
  lab: "M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M8 15h8",
};

function BrandIcon({ k, className }: { k: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={BRAND_ICON_PATHS[k] ?? BRAND_ICON_PATHS.studio} />
    </svg>
  );
}

function formatDate(iso: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function SectionHeader({
  index,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      className={`relative mb-14 flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <span
        aria-hidden="true"
        className={`ghost-num -top-16 -left-4 text-[9rem] sm:text-[12rem] ${
          align === "center" ? "left-1/2 -translate-x-1/2" : ""
        }`}
      >
        {index}
      </span>
      <Reveal>
        <span
          className={`inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase ${
            dark ? "text-gold" : "text-gold-dark"
          }`}
        >
          <span
            className={`h-px w-10 ${dark ? "bg-gold/60" : "bg-gold-dark/50"}`}
          />
          {index}
          <svg viewBox="0 0 8 8" className={`h-1.5 w-1.5 rotate-45 ${dark ? "fill-gold/70" : "fill-gold-dark/60"}`} aria-hidden="true">
            <rect width="8" height="8" />
          </svg>
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`relative font-serif text-4xl font-semibold tracking-tight sm:text-5xl ${
            dark ? "text-white" : "text-brand-deep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={200}>
          <p
            className={`max-w-xl text-lg leading-relaxed ${
              dark ? "text-white/60" : "text-brand-deep/60"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export default async function Home({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const { dict, posts } = await loadPageData(lang);
  const instagramUrl = dict.contact.instagramUrl
    ? dict.contact.instagramUrl
    : "https://www.instagram.com/menar.official/";

  return (
    <>
      <CursorGlow />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-deep">
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-drift-b absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/35 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <GhostWord className="-right-6 top-16 hidden sm:block lg:-right-10">
          {dict.hero.ghost}
        </GhostWord>
        {/* Folio */}
        <span
          aria-hidden="true"
          className="folio absolute top-1/2 left-7 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-gold-light/40 uppercase xl:block"
        >
          Menar — Düşünce Dergisi № 01
        </span>
        <span
          aria-hidden="true"
          className="folio absolute top-1/2 right-7 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.4em] text-gold-light/40 uppercase xl:block"
        >
          Tarih · Bilim · Felsefe
        </span>

        <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center">
          <Reveal as="span" delay={100}>
            <span className="mb-8 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-gold-light uppercase">
              <span className="h-px w-10 bg-gold/60" />
              {dict.hero.badge}
              <span className="h-px w-10 bg-gold/60" />
            </span>
          </Reveal>
          <Reveal className="mb-8" delay={0}>
            <div className="animate-float">
              <div className="relative">
                <div className="conic-ring absolute -inset-7 opacity-60" />
                <div className="rounded-full border border-gold/30 bg-white/5 p-4 shadow-2xl shadow-gold/10">
                  <BirdLogo className="h-24 w-24 drop-shadow-xl" />
                </div>
              </div>
            </div>
          </Reveal>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.08] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <Stagger
              as="span"
              text={dict.hero.title}
              delay={200}
              className="block"
            />
            <span className="text-shimmer block italic">
              {dict.hero.titleAccent}
            </span>
          </h1>
          <Reveal as="p" delay={400} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            {dict.hero.subtitle}
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnet>
                <Link
                  href={`/${lang}#posts`}
                  className="btn-sheen block rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-[length:200%_auto] px-8 py-3.5 font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-[position:right_center] hover:shadow-xl hover:shadow-gold/25"
                >
                  {dict.hero.ctaPrimary}
                </Link>
              </Magnet>
              <Magnet strength={0.25}>
                <Link
                  href={`/${lang}#about`}
                  className="block rounded-full border border-gold/40 px-8 py-3.5 font-semibold text-gold-light transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                >
                  {dict.hero.ctaSecondary}
                </Link>
              </Magnet>
            </div>
          </Reveal>
        </div>
        {/* Marquee band */}
        <div className="relative border-y border-gold/20 bg-brand-deep/60 py-4">
          <Marquee>
            {dict.marquee.map((word, i) => (
              <span
                key={i}
                className="font-serif text-lg italic tracking-wide text-gold-light/80"
              >
                <Sparkle className="mx-6 inline h-3.5 w-3.5 text-gold/50" />
                {word}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Brand hub — "MENAR nedir" scroll story */}
      <section
        id="brands"
        className="relative scroll-mt-20 overflow-hidden bg-mist py-28 md:py-32"
      >
        <div className="pointer-events-none absolute -left-32 top-8 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeader
            index="01"
            title={dict.brandGrid.title}
            subtitle={dict.brandGrid.subtitle}
          />
          <div className="grid auto-rows-[minmax(190px,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {dict.brandGrid.items.map((item, i) => {
              const feature = item.key === "studio";
              const span = feature
                ? "sm:col-span-2 lg:col-span-3 lg:row-span-2"
                : "lg:col-span-3";
              const soonLabel = lang === "tr" ? "Yakında" : "Soon";

              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center justify-center rounded-2xl ${
                        feature
                          ? "h-14 w-14 bg-gold/15 text-gold-light ring-1 ring-gold/30"
                          : "h-12 w-12 bg-brand-deep/5 text-brand-mid ring-1 ring-brand-deep/10 transition-colors group-hover:bg-gold/15 group-hover:text-gold-dark"
                      }`}
                    >
                      <BrandIcon k={item.key} className={feature ? "h-7 w-7" : "h-6 w-6"} />
                    </span>
                    {item.soon ? (
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase ${
                          feature
                            ? "bg-white/10 text-gold-light/80"
                            : "bg-brand-deep/5 text-brand-deep/40"
                        }`}
                      >
                        {soonLabel}
                      </span>
                    ) : (
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${
                          feature ? "text-gold-light" : "text-gold opacity-0 group-hover:opacity-100"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="mt-auto">
                    <h3
                      className={`font-serif font-semibold ${
                        feature
                          ? "text-2xl text-white md:text-3xl"
                          : "text-xl text-brand-deep"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`mt-2 leading-relaxed ${
                        feature ? "max-w-md text-white/60" : "text-sm text-brand-deep/60"
                      }`}
                    >
                      {item.description}
                    </p>
                    {!item.soon && (
                      <span
                        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${
                          feature ? "text-gold-light" : "text-gold-dark"
                        }`}
                      >
                        {dict.nav.explore}
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                </>
              );

              const cardClass = `group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 ${
                feature
                  ? "bg-brand-deep ring-1 ring-brand-deep/20 shadow-[0_24px_60px_-30px_rgba(10,43,32,0.55)] hover:-translate-y-1.5"
                  : "border border-brand-deep/10 bg-gradient-to-br from-mist to-white hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_40px_-24px_rgba(10,43,32,0.4)]"
              }`;

              return (
                <Reveal key={item.key} delay={i * 80} className={span}>
                  {feature ? (
                    <SpotlightCard className={cardClass}>
                      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:22px_22px]" />
                      <div className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
                      {item.href ? (
                        <Link href={`/${lang}${item.href}`} className="relative flex h-full flex-col">
                          {inner}
                        </Link>
                      ) : (
                        <div className="relative flex h-full flex-col">{inner}</div>
                      )}
                    </SpotlightCard>
                  ) : item.href ? (
                    <Link href={`/${lang}${item.href}`} className={cardClass}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cardClass} aria-disabled="true">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative scroll-mt-20 overflow-hidden bg-white py-28 md:py-32"
      >
        <Aurora variant="light" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-mist blur-3xl" />
        <GhostWord className="top-10 -left-8 hidden sm:block lg:-left-14">
          {dict.about.ghost}
        </GhostWord>
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeader index="02" title={dict.about.title} />
          <div className="grid items-start gap-14 md:grid-cols-[auto_1fr]">
            <Reveal className="group relative mx-auto md:mx-0">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/25 via-transparent to-brand-light/25 blur-xl" />
              <div className="relative rounded-[2rem] border border-gold/30 bg-gradient-to-br from-mist to-white p-10 transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.02]">
                <div className="conic-ring absolute -inset-8 opacity-40" />
                <BirdLogo className="h-40 w-40" />
              </div>
              <span className="absolute -right-3 -bottom-3 rounded-lg bg-brand-deep px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-gold-light uppercase">
                {dict.about.ghost}
              </span>
            </Reveal>
            <div>
              <div className="space-y-5 text-lg leading-relaxed text-brand-deep/75">
                {dict.about.body.map((paragraph, i) => (
                  <Reveal
                    as="p"
                    delay={150 + i * 100}
                    key={i}
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
              <Reveal delay={450}>
                <div className="mt-10 flex flex-wrap gap-x-12 gap-y-8 divide-brand-deep/10 sm:divide-x">
                  {dict.about.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1.5 sm:px-8 sm:first:pl-0">
                      <span className="font-serif text-5xl font-semibold text-gold tabular-nums">
                        <CountUp to={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="text-sm tracking-wide text-brand-deep/55 uppercase">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section
        id="posts"
        className="relative scroll-mt-20 overflow-hidden bg-mist py-28 md:py-32"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_1px_rgba(10,43,32,0.14)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeader
            index="03"
            title={dict.postsSection.title}
            subtitle={dict.postsSection.subtitle}
          />

          {posts.length > 0 ? (
            <div className="space-y-12">
              {/* Featured post */}
              <Reveal>
                <SpotlightCard className="group relative overflow-hidden rounded-2xl bg-brand-deep p-8 ring-1 ring-brand-deep/20 shadow-[0_24px_60px_-28px_rgba(10,43,32,0.5)] transition-all duration-300 hover:-translate-y-1.5 md:p-12">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="animate-pulse-glow animate-drift-a absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
                    <div className="animate-drift-b absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-light/25 blur-3xl" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:22px_22px]" />
                  <article className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex rounded-md bg-gold/15 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-gold-light uppercase ring-1 ring-gold/30">
                          {posts[0].tag}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                          {formatDate(posts[0].date, lang)}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl leading-snug font-semibold text-white transition-colors md:text-3xl">
                        {posts[0].title}
                      </h3>
                      {posts[0].excerpt && (
                        <p className="mt-4 max-w-xl leading-relaxed text-white/60">
                          {posts[0].excerpt}
                        </p>
                      )}
                      <div className="mt-7">
                        <a
                          href={posts[0].link || instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-gold-light transition-colors hover:text-white"
                        >
                          {dict.postsSection.readMore}
                          <svg
                            className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="hidden select-none font-serif text-[8rem] leading-none font-semibold text-gold/25 transition-colors duration-300 group-hover:text-gold/40 md:block md:text-[10rem]"
                    >
                      01
                    </span>
                  </article>
                </SpotlightCard>
              </Reveal>

              {/* Editorial index */}
              <ol className="divide-y divide-brand-deep/10 border-y border-brand-deep/10">
                {posts.slice(1).map((post, i) => (
                  <li key={post.id}>
                    <Reveal delay={i * 80}>
                      <a
                        href={post.link || instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-7 transition-all duration-300 sm:grid-cols-[5rem_1fr_auto] sm:gap-x-8 md:py-9"
                      >
                        <span className="font-serif text-4xl font-semibold text-brand-deep/15 transition-colors duration-300 group-hover:text-gold sm:text-5xl">
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex rounded-md bg-brand-deep px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-gold-light uppercase">
                              {post.tag}
                            </span>
                            <span className="font-mono text-[10px] tracking-[0.25em] text-brand-deep/40 uppercase">
                              {formatDate(post.date, lang)}
                            </span>
                          </span>
                          <span className="mt-2 block text-xl leading-snug font-semibold text-brand-deep transition-transform duration-300 group-hover:translate-x-2 group-hover:text-brand-mid sm:text-2xl">
                            {post.title}
                          </span>
                          {post.excerpt && (
                            <span className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-brand-deep/55 sm:block">
                              {post.excerpt}
                            </span>
                          )}
                        </span>
                        <svg
                          className="h-5 w-5 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="py-16 text-center font-serif text-xl italic text-brand-deep/40">
              {lang === "tr"
                ? "Henüz paylaşım yok."
                : "No posts yet."}
            </p>
          )}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-brand-deep py-28 md:py-32"
      >
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-b absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-drift-a absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-brand-light/25 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <GhostWord className="right-0 bottom-8 hidden sm:block">
          {dict.contact.ghost}
        </GhostWord>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <SectionHeader
            index="04"
            title={dict.contact.title}
            subtitle={dict.contact.subtitle}
            align="center"
            dark
          />
          <Reveal delay={300}>
            <div className="relative mt-6 inline-block">
              <div className="conic-ring absolute -inset-8 opacity-50" />
              <Magnet>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sheen group relative inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 font-semibold text-gold-light transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-brand-deep hover:shadow-xl hover:shadow-gold/30"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.62 2.2 15.24 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-1.08.05-1.66.23-2.05.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.97-.38 2.05C2.51 9.66 2.5 10.03 2.5 12s.01 2.34.07 3.58c.05 1.08.23 1.66.38 2.05.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.97.33 2.05.38 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.08-.05 1.66-.23 2.05-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.97.38-2.05.06-1.24.07-1.61.07-3.58s-.01-2.34-.07-3.58c-.05-1.08-.23-1.66-.38-2.05-.2-.52-.44-.89-.83-1.28a3.44 3.44 0 0 0-1.28-.83c-.39-.15-.97-.33-2.05-.38-1.24-.06-1.61-.07-4.76-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 8.15a3.21 3.21 0 1 0 0-6.42 3.21 3.21 0 0 0 0 6.42Zm6.3-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
                  </svg>
                  {dict.contact.instagram}
                </a>
              </Magnet>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
