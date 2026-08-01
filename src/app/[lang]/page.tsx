import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import BirdLogo from "@/components/BirdLogo";
import {
  Reveal,
  ShinyText,
  SpotlightCard,
  Magnet,
  CountUp,
  Marquee,
  Aurora,
} from "@/components/motion";

type PageProps = {
  params: Promise<{ lang: string }>;
};

const posts = [
  {
    id: "dede-korkut",
    tr: {
      title: "Kayıp Nüsha: Dede Korkut'un Üçüncü Elyazması",
      tag: "Tarih",
    },
    en: {
      title: "The Lost Copy: A Third Manuscript of Dede Korkut",
      tag: "History",
    },
  },
  {
    id: "antikythera",
    tr: {
      title: "2000 Yıllık Bir Bilgisayar Geleceği Nasıl Hesapladı?",
      tag: "Bilim",
    },
    en: {
      title: "How Did a 2000-Year-Old Computer Calculate the Future?",
      tag: "Science",
    },
  },
  {
    id: "manuscript",
    tr: {
      title: "1400 Yıllık Bir Elyazması Tarihi Değiştirebilir mi?",
      tag: "Tarih",
    },
    en: {
      title: "Can a 1400-Year-Old Manuscript Change History?",
      tag: "History",
    },
  },
  {
    id: "quantum",
    tr: {
      title: "Gerçeklik Sandığınızdan Çok Daha Tuhaf: Kuantum Dünyasının Gizli Kuralları",
      tag: "Bilim",
    },
    en: {
      title: "Reality Is Stranger Than You Think: The Hidden Rules of the Quantum World",
      tag: "Science",
    },
  },
];

export default async function Home({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-deep">
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/25 blur-3xl" />
          <div className="animate-drift-b absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/35 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal className="mb-8" delay={0}>
            <div className="animate-float">
              <div className="rounded-full border border-gold/30 bg-white/5 p-4 shadow-2xl shadow-gold/10">
                <BirdLogo className="h-24 w-24 drop-shadow-xl" />
              </div>
            </div>
          </Reveal>
          <Reveal as="span" delay={100}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-5 py-1.5 text-sm tracking-[0.2em] uppercase text-gold-light">
              <span className="h-1 w-1 rounded-full bg-gold-light" />
              {dict.hero.badge}
              <span className="h-1 w-1 rounded-full bg-gold-light" />
            </span>
          </Reveal>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <Reveal as="span" delay={200}>
              <span className="block">{dict.hero.title}</span>
            </Reveal>
            <Reveal as="span" delay={300}>
              <ShinyText className="block text-4xl sm:text-6xl">
                {dict.hero.titleAccent}
              </ShinyText>
            </Reveal>
          </h1>
          <Reveal as="p" delay={400}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {dict.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Magnet>
                <Link
                  href={`/${lang}#posts`}
                  className="block rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-[length:200%_auto] px-8 py-3.5 font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-[position:right_center] hover:shadow-xl hover:shadow-gold/25"
                >
                  {dict.hero.ctaPrimary}
                </Link>
              </Magnet>
              <Magnet strength={0.25}>
                <Link
                  href={`/${lang}#about`}
                  className="block rounded-full border border-gold/40 px-8 py-3.5 font-semibold text-gold-light transition-all hover:-translate-y-0.5 hover:bg-gold/10 hover:border-gold"
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
                <span className="mx-6 text-gold/40">✦</span>
                {word}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative scroll-mt-20 overflow-hidden bg-white py-24">
        <Aurora variant="light" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-mist blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
            <Reveal className="group relative mx-auto">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/30 via-transparent to-brand-light/30 blur-lg" />
              <div className="relative rounded-full border-2 border-gold/30 bg-gradient-to-br from-mist to-white p-8 transition-transform duration-500 group-hover:scale-105">
                <BirdLogo className="h-40 w-40" />
              </div>
            </Reveal>
            <div>
              <Reveal delay={100}>
                <span className="mb-3 inline-block h-px w-16 bg-gold" />
              </Reveal>
              <Reveal delay={150}>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
                  {dict.about.title}
                </h2>
              </Reveal>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-brand-deep/75">
                {dict.about.body.map((paragraph, i) => (
                  <Reveal as="p" delay={200 + i * 100} key={i}>
                    {paragraph}
                  </Reveal>
                ))}
              </div>
              <Reveal delay={500}>
                <div className="mt-8 flex flex-wrap gap-8">
                  {dict.about.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="font-serif text-4xl font-semibold text-brand-light">
                        <CountUp to={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="mt-1 text-sm text-brand-deep/60">
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
      <section id="posts" className="relative scroll-mt-20 overflow-hidden bg-mist py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <Reveal>
              <span className="mb-3 inline-block h-px w-16 bg-gold" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
                {dict.posts.title}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-3 text-lg text-brand-deep/60">
                {dict.posts.subtitle}
              </p>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <SpotlightCard className="h-full rounded-2xl border border-brand-deep/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/10">
                  <article className="flex h-full flex-col">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-brand-deep px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-light">
                        {post[lang].tag}
                      </span>
                      <span className="font-serif text-4xl font-semibold text-brand-deep/10 transition-colors duration-300 group-hover:text-gold/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-deep transition-colors group-hover:text-brand-mid">
                      {post[lang].title}
                    </h3>
                    <div className="mt-6 flex items-center justify-between">
                      <a
                        href="https://www.instagram.com/menar.official/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-colors group-hover:text-gold-dark"
                      >
                        {dict.posts.readMore}
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-brand-deep py-24">
        <Aurora variant="dark" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-glow animate-drift-b absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-drift-a absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-brand-light/25 blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_1px_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <span className="mb-3 inline-block h-px w-16 bg-gold" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {dict.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-3 text-lg text-white/60">{dict.contact.subtitle}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex justify-center">
              <Magnet>
                <a
                  href="https://www.instagram.com/menar.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 font-semibold text-gold-light transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-brand-deep hover:shadow-xl hover:shadow-gold/30"
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
