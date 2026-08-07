import type { Bilingual, Locale } from "@/lib/content";

export type KidsCategory = "story" | "coloring" | "educational";

/** A MENAR Kids product. Prices are intentionally optional — no price is
 *  shown unless real commercial data exists (no fabricated numbers). */
export type KidsProduct = {
  slug: string;
  category: KidsCategory;
  title: Bilingual<string>;
  tagline: Bilingual<string>;
  intro: Bilingual<string[]>;
  ageGroup: string;
  pages: number;
  format: Bilingual<string>;
  cover: { from: string; to: string };
  price?: number;
  related: string[];
};

export type KidsProductView = {
  slug: string;
  category: KidsCategory;
  title: string;
  tagline: string;
  intro: string[];
  ageGroup: string;
  pages: number;
  format: string;
  cover: { from: string; to: string };
  price?: number;
  related: string[];
};

export const kidsCategoryLabels: Record<KidsCategory, Bilingual<string>> = {
  story: { tr: "Hikâye Kitapları", en: "Story Books" },
  coloring: { tr: "Boyama Kitapları", en: "Coloring Books" },
  educational: { tr: "Eğitsel", en: "Educational" },
};

export const kidsCategoryOrder: KidsCategory[] = [
  "story",
  "coloring",
  "educational",
];

const KIDS_PRODUCTS: KidsProduct[] = [
  {
    slug: "yildizlarin-fisiltisi",
    category: "story",
    title: { tr: "Yıldızların Fısıltısı", en: "Whisper of the Stars" },
    tagline: {
      tr: "Gökyüzünü dinlemeyi öğrenen küçük bir çocuğun gece yolculuğu.",
      en: "A little child's night journey learning to listen to the sky.",
    },
    intro: {
      tr: [
        "Her gece penceresinden gökyüzüne bakan Ada, bir gün yıldızların birbirine fısıldadığını duyar.",
        "Bu fısıltıları takip ederek merak, cesaret ve dostluk üzerine küçük bir keşfe çıkar.",
      ],
      en: [
        "Ada, who looks at the sky from her window every night, one day hears the stars whispering to each other.",
        "Following these whispers, she sets out on a small journey about curiosity, courage and friendship.",
      ],
    },
    ageGroup: "5-8",
    pages: 32,
    format: { tr: "Ciltli, renkli", en: "Hardcover, full color" },
    cover: { from: "#1e3a8a", to: "#0f3d2e" },
    related: ["kucuk-kasif-kutupta", "sayilarla-oyun"],
  },
  {
    slug: "kucuk-kasif-kutupta",
    category: "story",
    title: { tr: "Küçük Kaşif Kutup'ta", en: "The Little Explorer in the Arctic" },
    tagline: {
      tr: "Buzların arasında yeni dostlar ve büyük sorular.",
      en: "New friends and big questions among the ice.",
    },
    intro: {
      tr: [
        "Küçük kaşif Deniz, bir harita ve bir pusulayla kutup buzullarına doğru yola çıkar.",
        "Yolda karşılaştığı canlılar ona doğayı korumanın ne demek olduğunu anlatır.",
      ],
      en: [
        "The little explorer Deniz sets off toward the polar ice with a map and a compass.",
        "The creatures met along the way teach what it means to protect nature.",
      ],
    },
    ageGroup: "4-7",
    pages: 28,
    format: { tr: "Ciltli, renkli", en: "Hardcover, full color" },
    cover: { from: "#0e7490", to: "#0f3d2e" },
    related: ["yildizlarin-fisiltisi", "ilk-kelimelerim"],
  },
  {
    slug: "renklerin-sehri",
    category: "coloring",
    title: { tr: "Renklerin Şehri", en: "City of Colors" },
    tagline: {
      tr: "Boş sokakları hayal gücüyle boyayan bir boyama macerası.",
      en: "A coloring adventure that paints empty streets with imagination.",
    },
    intro: {
      tr: [
        "Renklerin Şehri, çocukların kendi renk paletleriyle bir şehir kurmasına davet eder.",
        "Her sayfa, ince çizgili bir sahne ve boyanmayı bekleyen küçük detaylarla dolu.",
      ],
      en: [
        "City of Colors invites children to build a city with their own palettes.",
        "Each page is a finely drawn scene full of small details waiting to be colored.",
      ],
    },
    ageGroup: "3-6",
    pages: 40,
    format: { tr: "Yumuşak kapak, mat kâğıt", en: "Softcover, matte paper" },
    cover: { from: "#b45309", to: "#8a6d3b" },
    related: ["doga-deseni", "sayilarla-oyun"],
  },
  {
    slug: "doga-deseni",
    category: "coloring",
    title: { tr: "Doğa Deseni", en: "Patterns of Nature" },
    tagline: {
      tr: "Yaprak, dalga ve kanat desenleriyle sakinleştiren bir boyama seti.",
      en: "A calming coloring set of leaf, wave and wing patterns.",
    },
    intro: {
      tr: [
        "Doğa Deseni, doğadan ilham alan geometrik ve organik desenleri bir araya getirir.",
        "Odaklanmayı ve ince motor becerileri destekleyen, dingin bir boyama deneyimi sunar.",
      ],
      en: [
        "Patterns of Nature brings together geometric and organic patterns inspired by nature.",
        "It offers a calm coloring experience that supports focus and fine motor skills.",
      ],
    },
    ageGroup: "5-9",
    pages: 36,
    format: { tr: "Yumuşak kapak, mat kâğıt", en: "Softcover, matte paper" },
    cover: { from: "#15803d", to: "#0f3d2e" },
    related: ["renklerin-sehri", "yildizlarin-fisiltisi"],
  },
  {
    slug: "sayilarla-oyun",
    category: "educational",
    title: { tr: "Sayılarla Oyun", en: "Playing with Numbers" },
    tagline: {
      tr: "Oyunlarla sayıları ve ilk toplama fikrini keşfet.",
      en: "Discover numbers and the first idea of addition through games.",
    },
    intro: {
      tr: [
        "Sayılarla Oyun, matematiğe eğlenceli bir giriş sunan etkinlik kitabıdır.",
        "Bulmacalar ve resimli örneklerle sayı hissini adım adım geliştirir.",
      ],
      en: [
        "Playing with Numbers is an activity book offering a fun introduction to math.",
        "It builds number sense step by step with puzzles and illustrated examples.",
      ],
    },
    ageGroup: "4-7",
    pages: 48,
    format: { tr: "Yumuşak kapak, etkinlikli", en: "Softcover, activity-based" },
    cover: { from: "#7c3aed", to: "#0f3d2e" },
    related: ["ilk-kelimelerim", "yildizlarin-fisiltisi"],
  },
  {
    slug: "ilk-kelimelerim",
    category: "educational",
    title: { tr: "İlk Kelimelerim", en: "My First Words" },
    tagline: {
      tr: "İlk kelimeler için resimli, iki dilli bir başlangıç.",
      en: "An illustrated, bilingual start for first words.",
    },
    intro: {
      tr: [
        "İlk Kelimelerim, günlük hayattan nesneleri resimlerle eşleştiren bir kelime kitabıdır.",
        "Türkçe ve İngilizce karşılıklarıyla erken dil gelişimini destekler.",
      ],
      en: [
        "My First Words is a vocabulary book matching everyday objects with pictures.",
        "It supports early language development with Turkish and English equivalents.",
      ],
    },
    ageGroup: "2-5",
    pages: 24,
    format: { tr: "Kalın karton, iki dilli", en: "Board book, bilingual" },
    cover: { from: "#be123c", to: "#8a6d3b" },
    related: ["sayilarla-oyun", "kucuk-kasif-kutupta"],
  },
];

function pick<T>(b: Bilingual<T>, locale: Locale): T {
  return b[locale];
}

function toView(product: KidsProduct, locale: Locale): KidsProductView {
  return {
    slug: product.slug,
    category: product.category,
    title: pick(product.title, locale),
    tagline: pick(product.tagline, locale),
    intro: product.intro[locale],
    ageGroup: product.ageGroup,
    pages: product.pages,
    format: pick(product.format, locale),
    cover: product.cover,
    price: product.price,
    related: product.related,
  };
}

export function getKidsProducts(locale: Locale): KidsProductView[] {
  return KIDS_PRODUCTS.map((p) => toView(p, locale));
}

export function getKidsProduct(
  slug: string,
  locale: Locale
): KidsProductView | null {
  const found = KIDS_PRODUCTS.find((p) => p.slug === slug);
  return found ? toView(found, locale) : null;
}

export function getKidsProductSlugs(): string[] {
  return KIDS_PRODUCTS.map((p) => p.slug);
}

export function categoryLabel(category: KidsCategory, locale: Locale): string {
  return kidsCategoryLabels[category][locale];
}
