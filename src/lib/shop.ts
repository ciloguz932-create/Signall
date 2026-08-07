import type { Bilingual, Locale } from "@/lib/content";

export type ShopCategory = "digital" | "book" | "kids" | "physical";

export type ShopFaq = { q: Bilingual<string>; a: Bilingual<string> };

/** A MENAR Shop product. Prices are sample catalog data; there is no real
 *  checkout — purchase intent routes to contact (see lib/checkout.ts). */
export type ShopProduct = {
  slug: string;
  category: ShopCategory;
  title: Bilingual<string>;
  tagline: Bilingual<string>;
  description: Bilingual<string[]>;
  price: number;
  features: Bilingual<string[]>;
  faq: ShopFaq[];
  cover: { from: string; to: string };
  related: string[];
};

export type ShopFaqView = { q: string; a: string };

export type ShopProductView = {
  slug: string;
  category: ShopCategory;
  title: string;
  tagline: string;
  description: string[];
  price: number;
  features: string[];
  faq: ShopFaqView[];
  cover: { from: string; to: string };
  related: string[];
};

export const shopCategoryLabels: Record<ShopCategory, Bilingual<string>> = {
  digital: { tr: "Dijital", en: "Digital" },
  book: { tr: "Kitap", en: "Book" },
  kids: { tr: "MENAR Kids", en: "MENAR Kids" },
  physical: { tr: "Fiziksel", en: "Physical" },
};

/** Filter order incl. the "all" pseudo-category. */
export const shopFilterOrder: (ShopCategory | "all")[] = [
  "all",
  "digital",
  "book",
  "kids",
  "physical",
];

export const shopAllLabel: Bilingual<string> = { tr: "Tümü", en: "All" };

const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "menar-dijital-arsiv",
    category: "digital",
    title: { tr: "MENAR Dijital Arşiv", en: "MENAR Digital Archive" },
    tagline: {
      tr: "Tarih, bilim ve kültür yazılarının seçili dijital derlemesi.",
      en: "A curated digital collection of history, science and culture essays.",
    },
    description: {
      tr: [
        "MENAR Dijital Arşiv, uzun formatlı araştırma yazılarını tek bir erişilebilir koleksiyonda toplar.",
        "İndirilebilir PDF formatında, kaynakçalı ve düzenli bir okuma deneyimi sunar.",
      ],
      en: [
        "The MENAR Digital Archive gathers long-form research essays into a single accessible collection.",
        "It offers an organized reading experience in downloadable PDF format with references.",
      ],
    },
    price: 149,
    features: {
      tr: ["İndirilebilir PDF", "Kaynakça dahil", "Düzenli güncelleme", "Tüm cihazlarda okuma"],
      en: ["Downloadable PDF", "Includes references", "Regular updates", "Read on any device"],
    },
    faq: [
      {
        q: { tr: "Hangi formatta?", en: "What format is it?" },
        a: { tr: "PDF olarak indirilir, tüm cihazlarda okunur.", en: "Delivered as PDF, readable on any device." },
      },
      {
        q: { tr: "Güncelleniyor mu?", en: "Is it updated?" },
        a: { tr: "Yeni yazılar periyodik olarak eklenir.", en: "New essays are added periodically." },
      },
    ],
    cover: { from: "#0f3d2e", to: "#0a2b20" },
    related: ["menar-poster-seti", "dede-korkut-kitap"],
  },
  {
    slug: "dede-korkut-kitap",
    category: "book",
    title: { tr: "Dede Korkut: Kayıp Nüsha", en: "Dede Korkut: The Lost Copy" },
    tagline: {
      tr: "Türk destan geleneğine dair bir araştırma kitabı.",
      en: "A research book on the Turkic epic tradition.",
    },
    description: {
      tr: [
        "Dede Korkut destanlarının izini süren, kaynaklara dayalı bir inceleme.",
        "Elyazması geleneği, dil ve kültürel bağlam üzerine derinlemesine bir okuma.",
      ],
      en: [
        "A source-based study tracing the Dede Korkut epics.",
        "An in-depth read on the manuscript tradition, language and cultural context.",
      ],
    },
    price: 220,
    features: {
      tr: ["Ciltli baskı", "Kaynakça ve dizin", "240 sayfa"],
      en: ["Hardcover", "References & index", "240 pages"],
    },
    faq: [
      {
        q: { tr: "Baskı türü nedir?", en: "What edition?" },
        a: { tr: "Ciltli, mat kâğıt baskı.", en: "Hardcover, matte paper." },
      },
    ],
    cover: { from: "#8a6d3b", to: "#0a2b20" },
    related: ["menar-dijital-arsiv", "antikythera-poster"],
  },
  {
    slug: "yildizlarin-fisiltisi-kitap",
    category: "kids",
    title: { tr: "Yıldızların Fısıltısı", en: "Whisper of the Stars" },
    tagline: {
      tr: "MENAR Kids hikâye kitabı — merak, cesaret ve dostluk.",
      en: "A MENAR Kids story book — curiosity, courage and friendship.",
    },
    description: {
      tr: [
        "Gökyüzünü dinlemeyi öğrenen küçük bir çocuğun gece yolculuğu.",
        "5-8 yaş için renkli, ciltli bir hikâye kitabı.",
      ],
      en: [
        "A little child's night journey learning to listen to the sky.",
        "A full-color hardcover story book for ages 5-8.",
      ],
    },
    price: 130,
    features: {
      tr: ["5-8 yaş", "Ciltli, renkli", "32 sayfa"],
      en: ["Ages 5-8", "Hardcover, full color", "32 pages"],
    },
    faq: [
      {
        q: { tr: "Yaş grubu?", en: "Age group?" },
        a: { tr: "5-8 yaş için uygundur.", en: "Suitable for ages 5-8." },
      },
    ],
    cover: { from: "#1e3a8a", to: "#0f3d2e" },
    related: ["dede-korkut-kitap", "menar-poster-seti"],
  },
  {
    slug: "menar-poster-seti",
    category: "physical",
    title: { tr: "MENAR Poster Seti", en: "MENAR Poster Set" },
    tagline: {
      tr: "Bilim ve tarih temalı, özenle tasarlanmış poster koleksiyonu.",
      en: "A carefully designed poster collection on science and history.",
    },
    description: {
      tr: [
        "Duvarına ilham katacak, editoryal tasarım anlayışıyla hazırlanmış poster seti.",
        "Kalın, mat kâğıda basılı üç parçalık koleksiyon.",
      ],
      en: [
        "A poster set prepared with an editorial design sensibility to inspire your wall.",
        "A three-piece collection printed on thick, matte paper.",
      ],
    },
    price: 180,
    features: {
      tr: ["3 parça", "A2 boyut", "Mat kâğıt", "Çerçeve dahil değil"],
      en: ["3 pieces", "A2 size", "Matte paper", "Frame not included"],
    },
    faq: [
      {
        q: { tr: "Çerçeve dahil mi?", en: "Is a frame included?" },
        a: { tr: "Hayır, yalnızca posterler gönderilir.", en: "No, only the posters are shipped." },
      },
    ],
    cover: { from: "#c9a86a", to: "#8a6d3b" },
    related: ["antikythera-poster", "menar-dijital-arsiv"],
  },
  {
    slug: "antikythera-poster",
    category: "physical",
    title: { tr: "Antikythera Baskısı", en: "Antikythera Print" },
    tagline: {
      tr: "2000 yıllık mekanik dehayı anlatan tek parça baskı.",
      en: "A single print depicting the 2000-year-old mechanical genius.",
    },
    description: {
      tr: [
        "Antikythera düzeneğinin katmanlarını gösteren, açıklamalı bir infografik baskı.",
        "Bilim meraklıları için editoryal bir duvar parçası.",
      ],
      en: [
        "An annotated infographic print showing the layers of the Antikythera mechanism.",
        "An editorial wall piece for science enthusiasts.",
      ],
    },
    price: 95,
    features: {
      tr: ["A2 boyut", "Mat kâğıt", "Açıklamalı infografik"],
      en: ["A2 size", "Matte paper", "Annotated infographic"],
    },
    faq: [
      {
        q: { tr: "Boyutu nedir?", en: "What size?" },
        a: { tr: "A2 (42×59 cm) boyutundadır.", en: "A2 (42×59 cm)." },
      },
    ],
    cover: { from: "#0e7490", to: "#0a2b20" },
    related: ["menar-poster-seti", "dede-korkut-kitap"],
  },
  {
    slug: "menar-kuantum-rehberi",
    category: "digital",
    title: { tr: "Kuantum Dünyası Rehberi", en: "Guide to the Quantum World" },
    tagline: {
      tr: "Kuantum fiziğine sezgisel, dijital bir giriş.",
      en: "An intuitive, digital introduction to quantum physics.",
    },
    description: {
      tr: [
        "Süperpozisyon, dolanıklık ve ölçüm sorununu sade bir dille anlatan dijital rehber.",
        "Görsellerle desteklenmiş, indirilebilir bir okuma.",
      ],
      en: [
        "A digital guide explaining superposition, entanglement and the measurement problem in plain language.",
        "An illustrated, downloadable read.",
      ],
    },
    price: 110,
    features: {
      tr: ["İndirilebilir PDF", "Görsel anlatım", "Başlangıç seviyesi"],
      en: ["Downloadable PDF", "Visual explanations", "Beginner level"],
    },
    faq: [
      {
        q: { tr: "Ön bilgi gerekir mi?", en: "Any prerequisites?" },
        a: { tr: "Hayır, başlangıç seviyesine uygundur.", en: "No, it's suitable for beginners." },
      },
    ],
    cover: { from: "#7c3aed", to: "#0a2b20" },
    related: ["menar-dijital-arsiv", "antikythera-poster"],
  },
];

function pick<T>(b: Bilingual<T>, locale: Locale): T {
  return b[locale];
}

function toView(product: ShopProduct, locale: Locale): ShopProductView {
  return {
    slug: product.slug,
    category: product.category,
    title: pick(product.title, locale),
    tagline: pick(product.tagline, locale),
    description: product.description[locale],
    price: product.price,
    features: product.features[locale],
    faq: product.faq.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) })),
    cover: product.cover,
    related: product.related,
  };
}

export function getShopProducts(locale: Locale): ShopProductView[] {
  return SHOP_PRODUCTS.map((p) => toView(p, locale));
}

export function getShopProduct(slug: string, locale: Locale): ShopProductView | null {
  const found = SHOP_PRODUCTS.find((p) => p.slug === slug);
  return found ? toView(found, locale) : null;
}

export function getShopProductSlugs(): string[] {
  return SHOP_PRODUCTS.map((p) => p.slug);
}

export function shopCategoryLabel(category: ShopCategory, locale: Locale): string {
  return shopCategoryLabels[category][locale];
}

export function formatPrice(price: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `₺${price}`;
  }
}
