export type Locale = "tr" | "en";

export type Bilingual<T> = { tr: T; en: T };

export type PostData = {
  id: string;
  title: Bilingual<string>;
  tag: Bilingual<string>;
  excerpt: Bilingual<string>;
  link: string;
  date: string;
  published: boolean;
};

export type Stat = {
  label: Bilingual<string>;
  value: number;
  suffix: string;
};

export type StatView = {
  label: string;
  value: number;
  suffix: string;
};

export type SiteSettings = {
  nav: {
    posts: Bilingual<string>;
    about: Bilingual<string>;
    contact: Bilingual<string>;
  };
  hero: {
    badge: Bilingual<string>;
    title: Bilingual<string>;
    titleAccent: Bilingual<string>;
    ghost: Bilingual<string>;
    subtitle: Bilingual<string>;
    ctaPrimary: Bilingual<string>;
    ctaSecondary: Bilingual<string>;
  };
  marquee: Bilingual<string[]>;
  about: {
    title: Bilingual<string>;
    ghost: Bilingual<string>;
    body: Bilingual<string[]>;
    stats: Stat[];
  };
  postsSection: {
    title: Bilingual<string>;
    subtitle: Bilingual<string>;
    readMore: Bilingual<string>;
  };
  contact: {
    title: Bilingual<string>;
    ghost: Bilingual<string>;
    subtitle: Bilingual<string>;
    instagram: Bilingual<string>;
    instagramUrl: string;
  };
  footer: {
    rights: Bilingual<string>;
    tagline: Bilingual<string>;
  };
};

export type SiteData = {
  posts: PostData[];
  settings: SiteSettings;
};

export type PageDict = {
  nav: { posts: string; about: string; contact: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    ghost: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  marquee: string[];
  about: { title: string; ghost: string; body: string[]; stats: StatView[] };
  postsSection: { title: string; subtitle: string; readMore: string };
  contact: { title: string; ghost: string; subtitle: string; instagram: string; instagramUrl: string };
  footer: { rights: string; tagline: string };
};

export type PostView = {
  id: string;
  title: string;
  tag: string;
  excerpt: string;
  link: string;
  date: string;
};

export type PageData = {
  dict: PageDict;
  posts: PostView[];
};

export const defaultPosts: PostData[] = [
  {
    id: "dede-korkut",
    title: {
      tr: "Kayıp Nüsha: Dede Korkut'un Üçüncü Elyazması",
      en: "The Lost Copy: A Third Manuscript of Dede Korkut",
    },
    tag: { tr: "Tarih", en: "History" },
    excerpt: {
      tr: "Bir kütüphanenin tozlu raflarında bulunan elyazması, Türk destan geleneğinin bilinen en eski metnini nasıl yeniden yazabilir?",
      en: "A manuscript found on dusty library shelves could rewrite the oldest known text of the Turkic epic tradition.",
    },
    link: "https://www.instagram.com/menar.official/",
    date: "2026-04-18",
    published: true,
  },
  {
    id: "antikythera",
    title: {
      tr: "2000 Yıllık Bir Bilgisayar Geleceği Nasıl Hesapladı?",
      en: "How Did a 2000-Year-Old Computer Calculate the Future?",
    },
    tag: { tr: "Bilim", en: "Science" },
    excerpt: {
      tr: "Antikythera düzeneği, güneş tutulmalarını yüzyıllar öncesinden hesaplayabilen mekanik bir deha.",
      en: "The Antikythera mechanism: mechanical genius that could predict solar eclipses centuries in advance.",
    },
    link: "https://www.instagram.com/menar.official/",
    date: "2026-03-02",
    published: true,
  },
  {
    id: "manuscript",
    title: {
      tr: "1400 Yıllık Bir Elyazması Tarihi Değiştirebilir mi?",
      en: "Can a 1400-Year-Old Manuscript Change History?",
    },
    tag: { tr: "Tarih", en: "History" },
    excerpt: {
      tr: "Birkaç satırlık bir kenar notu, kabul edilmiş tarih anlatısını kökten sarsabilir.",
      en: "A few lines of marginalia could shake the accepted historical narrative to its core.",
    },
    link: "https://www.instagram.com/menar.official/",
    date: "2026-01-25",
    published: true,
  },
  {
    id: "quantum",
    title: {
      tr: "Gerçeklik Sandığınızdan Çok Daha Tuhaf: Kuantum Dünyasının Gizli Kuralları",
      en: "Reality Is Stranger Than You Think: The Hidden Rules of the Quantum World",
    },
    tag: { tr: "Bilim", en: "Science" },
    excerpt: {
      tr: "Süperpozisyon, dolanıklık ve ölçüm sorunu: küçük ölçekte doğa, sezgilerimizle alay eder.",
      en: "Superposition, entanglement and the measurement problem: at small scales, nature mocks our intuition.",
    },
    link: "https://www.instagram.com/menar.official/",
    date: "2025-12-09",
    published: true,
  },
];

export const defaultSettings: SiteSettings = {
  nav: {
    posts: { tr: "Paylaşımlar", en: "Posts" },
    about: { tr: "Hakkımda", en: "About" },
    contact: { tr: "İletişim", en: "Contact" },
  },
  hero: {
    badge: { tr: "Bilgi · Bilim · Fikir", en: "Knowledge · Science · Ideas" },
    title: { tr: "Dünyayı anlamak,", en: "Understand the world," },
    titleAccent: { tr: "geleceği tasarlamak.", en: "design the future." },
    ghost: { tr: "Merak", en: "Curiosity" },
    subtitle: {
      tr: "Tarih, bilim ve felsefe üzerine düşünceler. Merak ettiğim şeyleri araştırır, keşfettiklerimi paylaşırım.",
      en: "Thoughts on history, science and philosophy. I research what I'm curious about and share what I discover.",
    },
    ctaPrimary: { tr: "Paylaşımlarımı Gör", en: "See My Posts" },
    ctaSecondary: { tr: "Hakkımda", en: "About Me" },
  },
  marquee: {
    tr: ["Tarih", "Bilim", "Felsefe", "Keşif", "Merak", "Gelecek"],
    en: ["History", "Science", "Philosophy", "Discovery", "Curiosity", "Future"],
  },
  about: {
    title: { tr: "Ben Kimim?", en: "Who Am I?" },
    ghost: { tr: "Keşif", en: "Discovery" },
    body: {
      tr: [
        "Ben Menar. Dünyayı anlamaya ve geleceği tasarlamaya adanmış bir meraklıyım.",
        "Tarihin sessiz izlerini, bilimin sınırlarını ve fikirlerin gücünü araştırıyorum. Bu sayfa, keşiflerimi ve düşüncelerimi paylaştığım yerdir.",
      ],
      en: [
        "I am Menar. A curious mind devoted to understanding the world and designing the future.",
        "I explore the silent traces of history, the frontiers of science and the power of ideas. This page is where I share my discoveries and thoughts.",
      ],
    },
    stats: [
      { label: { tr: "Yıl Araştırma", en: "Years of Research" }, value: 2, suffix: "+" },
      { label: { tr: "Paylaşım", en: "Shares" }, value: 10, suffix: "+" },
      { label: { tr: "Konu Başlığı", en: "Topic Areas" }, value: 4, suffix: "" },
    ],
  },
  postsSection: {
    title: { tr: "Son Paylaşımlar", en: "Latest Posts" },
    subtitle: {
      tr: "Instagram'da paylaştığım konulardan bir seçki.",
      en: "A selection of topics I share on Instagram.",
    },
    readMore: { tr: "Instagram'da Oku", en: "Read on Instagram" },
  },
  contact: {
    title: { tr: "Benimle İletişim", en: "Get In Touch" },
    ghost: { tr: "Bağlantı", en: "Connect" },
    subtitle: {
      tr: "Beni sosyal medyada takip edebilirsin.",
      en: "You can follow me on social media.",
    },
    instagram: { tr: "Instagram", en: "Instagram" },
    instagramUrl: "https://www.instagram.com/menar.official/",
  },
  footer: {
    rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
    tagline: {
      tr: "Dünyayı anla, geleceği keşfet.",
      en: "Understand the world, discover the future.",
    },
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeSection<T>(defaults: T, incoming: unknown): T {
  if (!isPlainObject(defaults)) return incoming as T;
  if (!isPlainObject(incoming)) return incoming as T;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(defaults)) {
    const d = (defaults as Record<string, unknown>)[key];
    const f = incoming[key];
    if (f === undefined) out[key] = d;
    else if (isPlainObject(d) && isPlainObject(f)) out[key] = mergeSection(d, f);
    else out[key] = f;
  }
  return out as T;
}

export function mergeSettings(
  defaults: SiteSettings,
  incoming: Partial<SiteSettings> | null | undefined
): SiteSettings {
  if (!isPlainObject(incoming)) return defaults;
  return mergeSection(defaults, incoming);
}

export function mergeData(
  defaults: SiteData,
  incoming: Partial<SiteData> | null | undefined
): SiteData {
  if (!incoming || !isPlainObject(incoming)) return defaults;
  return {
    posts: Array.isArray(incoming.posts) ? incoming.posts : defaults.posts,
    settings: mergeSettings(defaults.settings, incoming.settings),
  };
}

function pick<T>(b: Bilingual<T>, locale: Locale): T {
  return b[locale];
}

export function toPageDict(settings: SiteSettings, locale: Locale): PageDict {
  return {
    nav: {
      posts: pick(settings.nav.posts, locale),
      about: pick(settings.nav.about, locale),
      contact: pick(settings.nav.contact, locale),
    },
    hero: {
      badge: pick(settings.hero.badge, locale),
      title: pick(settings.hero.title, locale),
      titleAccent: pick(settings.hero.titleAccent, locale),
      ghost: pick(settings.hero.ghost, locale),
      subtitle: pick(settings.hero.subtitle, locale),
      ctaPrimary: pick(settings.hero.ctaPrimary, locale),
      ctaSecondary: pick(settings.hero.ctaSecondary, locale),
    },
    marquee: settings.marquee[locale],
    about: {
      title: pick(settings.about.title, locale),
      ghost: pick(settings.about.ghost, locale),
      body: settings.about.body[locale],
      stats: settings.about.stats.map((s) => ({
        ...s,
        label: pick(s.label, locale),
      })),
    },
    postsSection: {
      title: pick(settings.postsSection.title, locale),
      subtitle: pick(settings.postsSection.subtitle, locale),
      readMore: pick(settings.postsSection.readMore, locale),
    },
    contact: {
      title: pick(settings.contact.title, locale),
      ghost: pick(settings.contact.ghost, locale),
      subtitle: pick(settings.contact.subtitle, locale),
      instagram: pick(settings.contact.instagram, locale),
      instagramUrl: settings.contact.instagramUrl,
    },
    footer: {
      rights: pick(settings.footer.rights, locale),
      tagline: pick(settings.footer.tagline, locale),
    },
  };
}

export function toPagePost(post: PostData, locale: Locale): PostView {
  return {
    id: post.id,
    title: pick(post.title, locale),
    tag: pick(post.tag, locale),
    excerpt: pick(post.excerpt, locale),
    link: post.link,
    date: post.date,
  };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
