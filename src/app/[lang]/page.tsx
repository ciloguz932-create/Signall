import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import BirdLogo from "@/components/BirdLogo";

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
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-mid/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <div className="animate-float mb-8">
            <BirdLogo className="h-24 w-24 drop-shadow-lg" />
          </div>
          <span className="animate-fade-up mb-6 inline-flex items-center rounded-full border border-sage/40 bg-white/5 px-4 py-1.5 text-sm text-sage">
            {dict.hero.badge}
          </span>
          <h1
            className="animate-fade-up max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {dict.hero.title}
            <span className="block bg-gradient-to-r from-white via-sage to-brand-light bg-clip-text text-transparent">
              {dict.hero.titleAccent}
            </span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-white/70"
            style={{ animationDelay: "0.2s" }}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href={`/${lang}#posts`}
              className="rounded-full bg-white px-8 py-3.5 font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}#about`}
              className="rounded-full border border-white/30 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
            <div className="mx-auto">
              <BirdLogo className="h-40 w-40" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
                {dict.about.title}
              </h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-brand-deep/75">
                {dict.about.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section id="posts" className="scroll-mt-20 bg-mist py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
              {dict.posts.title}
            </h2>
            <p className="mt-3 text-lg text-brand-deep/60">{dict.posts.subtitle}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-brand-deep/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-light/40 hover:shadow-lg"
              >
                <span className="inline-block rounded-full bg-brand-deep px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  {post[lang].tag}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-deep">
                  {post[lang].title}
                </h3>
                <a
                  href="https://www.instagram.com/meran.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-colors group-hover:text-brand-mid"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-deep sm:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-3 text-lg text-brand-deep/60">{dict.contact.subtitle}</p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/meran.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-deep px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-mid hover:shadow-xl"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.62 2.2 15.24 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-1.08.05-1.66.23-2.05.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.97-.38 2.05C2.51 9.66 2.5 10.03 2.5 12s.01 2.34.07 3.58c.05 1.08.23 1.66.38 2.05.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.97.33 2.05.38 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.08-.05 1.66-.23 2.05-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.97.38-2.05.06-1.24.07-1.61.07-3.58s-.01-2.34-.07-3.58c-.05-1.08-.23-1.66-.38-2.05-.2-.52-.44-.89-.83-1.28a3.44 3.44 0 0 0-1.28-.83c-.39-.15-.97-.33-2.05-.38-1.24-.06-1.61-.07-4.76-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 8.15a3.21 3.21 0 1 0 0-6.42 3.21 3.21 0 0 0 0 6.42Zm6.3-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
              </svg>
              {dict.contact.instagram}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
