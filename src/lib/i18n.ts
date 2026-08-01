export type Locale = "tr" | "en";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export const dictionary = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımda",
      posts: "Paylaşımlar",
      contact: "İletişim",
    },
    hero: {
      badge: "Bilgi · Bilim · Fikir",
      title: "Dünyayı anlamak,",
      titleAccent: "geleceği tasarlamak.",
      subtitle:
        "Tarih, bilim ve felsefe üzerine düşünceler. Merak ettiğim şeyleri araştırır, keşfettiklerimi paylaşırım.",
      ctaPrimary: "Paylaşımlarımı Gör",
      ctaSecondary: "Hakkımda",
    },
    about: {
      title: "Ben Kimim?",
      body: [
        "Ben Menar. Dünyayı anlamaya ve geleceği tasarlamaya adanmış bir meraklıyım.",
        "Tarihin sessiz izlerini, bilimin sınırlarını ve fikirlerin gücünü araştırıyorum. Bu sayfa, keşiflerimi ve düşüncelerimi paylaştığım yerdir.",
      ],
    },
    posts: {
      title: "Son Paylaşımlar",
      subtitle: "Instagram'da paylaştığım konulardan bir seçki.",
      readMore: "Instagram'da Oku",
    },
    contact: {
      title: "Benimle İletişim",
      subtitle: "Beni sosyal medyada takip edebilirsin.",
      instagram: "Instagram",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      tagline: "Dünyayı anla, geleceği keşfet.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      posts: "Posts",
      contact: "Contact",
    },
    hero: {
      badge: "Knowledge · Science · Ideas",
      title: "Understand the world,",
      titleAccent: "design the future.",
      subtitle:
        "Thoughts on history, science and philosophy. I research what I'm curious about and share what I discover.",
      ctaPrimary: "See My Posts",
      ctaSecondary: "About Me",
    },
    about: {
      title: "Who Am I?",
      body: [
        "I am Menar. A curious mind devoted to understanding the world and designing the future.",
        "I explore the silent traces of history, the frontiers of science and the power of ideas. This page is where I share my discoveries and thoughts.",
      ],
    },
    posts: {
      title: "Latest Posts",
      subtitle: "A selection of topics I share on Instagram.",
      readMore: "Read on Instagram",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "You can follow me on social media.",
      instagram: "Instagram",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Understand the world, discover the future.",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
