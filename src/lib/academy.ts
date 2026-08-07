import type { Bilingual, Locale } from "@/lib/content";

export type AcademyCategory =
  | "math"
  | "science"
  | "history"
  | "language"
  | "islamic"
  | "tech";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Lesson = { title: Bilingual<string>; duration: string };
export type Resource = { label: Bilingual<string>; note: Bilingual<string> };

export type Course = {
  slug: string;
  category: AcademyCategory;
  level: CourseLevel;
  title: Bilingual<string>;
  tagline: Bilingual<string>;
  description: Bilingual<string[]>;
  lessons: Lesson[];
  resources: Resource[];
  accent: { from: string; to: string };
  related: string[];
};

export type LessonView = { title: string; duration: string };
export type ResourceView = { label: string; note: string };

export type CourseView = {
  slug: string;
  category: AcademyCategory;
  level: string;
  title: string;
  tagline: string;
  description: string[];
  lessons: LessonView[];
  resources: ResourceView[];
  accent: { from: string; to: string };
  related: string[];
};

export const academyCategoryLabels: Record<AcademyCategory, Bilingual<string>> = {
  math: { tr: "Matematik", en: "Mathematics" },
  science: { tr: "Bilim", en: "Science" },
  history: { tr: "Tarih", en: "History" },
  language: { tr: "Dil", en: "Language" },
  islamic: { tr: "İslami İlimler", en: "Islamic Studies" },
  tech: { tr: "Teknoloji", en: "Technology" },
};

export const levelLabels: Record<CourseLevel, Bilingual<string>> = {
  beginner: { tr: "Başlangıç", en: "Beginner" },
  intermediate: { tr: "Orta", en: "Intermediate" },
  advanced: { tr: "İleri", en: "Advanced" },
};

export const academyFilterOrder: (AcademyCategory | "all")[] = [
  "all",
  "math",
  "science",
  "history",
  "language",
  "islamic",
  "tech",
];

export const academyAllLabel: Bilingual<string> = { tr: "Tümü", en: "All" };

const COURSES: Course[] = [
  {
    slug: "sayilarin-dili",
    category: "math",
    level: "beginner",
    title: { tr: "Sayıların Dili", en: "The Language of Numbers" },
    tagline: {
      tr: "Matematiği ezber değil, sezgiyle kavramak.",
      en: "Grasping math through intuition, not memorization.",
    },
    description: {
      tr: [
        "Bu ders, sayı hissini ve temel işlemleri günlük örneklerle yeniden kurar.",
        "Formüllerin arkasındaki mantığı görerek matematiğe sağlam bir temel atarsın.",
      ],
      en: [
        "This course rebuilds number sense and basic operations with everyday examples.",
        "You build a solid foundation by seeing the logic behind the formulas.",
      ],
    },
    lessons: [
      { title: { tr: "Sayı hissi nedir?", en: "What is number sense?" }, duration: "12 dk" },
      { title: { tr: "İşlemlerin mantığı", en: "The logic of operations" }, duration: "18 dk" },
      { title: { tr: "Örüntüler ve tahmin", en: "Patterns and estimation" }, duration: "15 dk" },
    ],
    resources: [
      { label: { tr: "Çalışma kağıdı", en: "Worksheet" }, note: { tr: "Alıştırmalar (PDF)", en: "Exercises (PDF)" } },
      { label: { tr: "Özet notlar", en: "Summary notes" }, note: { tr: "Ders özeti", en: "Lesson summary" } },
    ],
    accent: { from: "#7c3aed", to: "#0f3d2e" },
    related: ["kuantum-dusuncesi", "algoritmik-dusunme"],
  },
  {
    slug: "kuantum-dusuncesi",
    category: "science",
    level: "intermediate",
    title: { tr: "Kuantum Düşüncesi", en: "Quantum Thinking" },
    tagline: {
      tr: "Gerçekliğin küçük ölçekteki tuhaf kuralları.",
      en: "The strange rules of reality at small scales.",
    },
    description: {
      tr: [
        "Süperpozisyon, dolanıklık ve ölçüm sorununu sezgisel bir dille ele alır.",
        "Kuantum dünyasının neden sıra dışı olduğunu adım adım keşfedersin.",
      ],
      en: [
        "Covers superposition, entanglement and the measurement problem in intuitive language.",
        "You discover step by step why the quantum world is so extraordinary.",
      ],
    },
    lessons: [
      { title: { tr: "Süperpozisyon", en: "Superposition" }, duration: "20 dk" },
      { title: { tr: "Dolanıklık", en: "Entanglement" }, duration: "22 dk" },
      { title: { tr: "Ölçüm sorunu", en: "The measurement problem" }, duration: "17 dk" },
    ],
    resources: [
      { label: { tr: "Kavram haritası", en: "Concept map" }, note: { tr: "Görsel özet", en: "Visual summary" } },
      { label: { tr: "İleri okuma", en: "Further reading" }, note: { tr: "Kaynak listesi", en: "Reading list" } },
    ],
    accent: { from: "#0e7490", to: "#0a2b20" },
    related: ["sayilarin-dili", "algoritmik-dusunme"],
  },
  {
    slug: "elyazmalari-ve-tarih",
    category: "history",
    level: "intermediate",
    title: { tr: "Elyazmaları ve Tarih", en: "Manuscripts and History" },
    tagline: {
      tr: "Bir kenar notu tarihi nasıl değiştirir?",
      en: "How can a single marginal note change history?",
    },
    description: {
      tr: [
        "Elyazması geleneğini, metin aktarımını ve tarihsel kaynak eleştirisini ele alır.",
        "Küçük detayların büyük anlatıları nasıl sarstığını örneklerle görürsün.",
      ],
      en: [
        "Covers the manuscript tradition, textual transmission and historical source criticism.",
        "You see with examples how small details can shake large narratives.",
      ],
    },
    lessons: [
      { title: { tr: "Elyazması nedir?", en: "What is a manuscript?" }, duration: "14 dk" },
      { title: { tr: "Metin aktarımı", en: "Textual transmission" }, duration: "19 dk" },
      { title: { tr: "Kaynak eleştirisi", en: "Source criticism" }, duration: "21 dk" },
    ],
    resources: [
      { label: { tr: "Zaman çizelgesi", en: "Timeline" }, note: { tr: "Görsel kronoloji", en: "Visual chronology" } },
    ],
    accent: { from: "#8a6d3b", to: "#0a2b20" },
    related: ["osmanlica-okumalari", "kuantum-dusuncesi"],
  },
  {
    slug: "osmanlica-okumalari",
    category: "language",
    level: "beginner",
    title: { tr: "Osmanlıca Okumaları", en: "Ottoman Turkish Readings" },
    tagline: {
      tr: "Eski metinleri okumaya ilk adım.",
      en: "A first step to reading historical texts.",
    },
    description: {
      tr: [
        "Osmanlı Türkçesinin harflerini ve temel okuma mantığını tanıtır.",
        "Basit metinlerle adım adım okuma pratiği yaparsın.",
      ],
      en: [
        "Introduces the letters and basic reading logic of Ottoman Turkish.",
        "You practice reading step by step with simple texts.",
      ],
    },
    lessons: [
      { title: { tr: "Harfler ve sesler", en: "Letters and sounds" }, duration: "16 dk" },
      { title: { tr: "İlk kelimeler", en: "First words" }, duration: "18 dk" },
      { title: { tr: "Basit metin okuma", en: "Reading a simple text" }, duration: "20 dk" },
    ],
    resources: [
      { label: { tr: "Alfabe tablosu", en: "Alphabet chart" }, note: { tr: "Referans (PDF)", en: "Reference (PDF)" } },
      { label: { tr: "Alıştırma metni", en: "Practice text" }, note: { tr: "Örnek metin", en: "Sample text" } },
    ],
    accent: { from: "#be123c", to: "#0a2b20" },
    related: ["elyazmalari-ve-tarih", "usul-ve-dusunce"],
  },
  {
    slug: "usul-ve-dusunce",
    category: "islamic",
    level: "intermediate",
    title: { tr: "Usûl ve Düşünce", en: "Method and Thought" },
    tagline: {
      tr: "İslami ilimlerde yöntem ve kavram dünyası.",
      en: "Method and conceptual world in Islamic studies.",
    },
    description: {
      tr: [
        "Temel kavramları ve düşünce yöntemini kaynaklara dayalı olarak tanıtır.",
        "Metin okuma ve anlama üzerine dengeli bir giriş sunar.",
      ],
      en: [
        "Introduces core concepts and methods of reasoning based on sources.",
        "Offers a balanced introduction to reading and understanding texts.",
      ],
    },
    lessons: [
      { title: { tr: "Kavramlar", en: "Concepts" }, duration: "17 dk" },
      { title: { tr: "Yöntem", en: "Method" }, duration: "19 dk" },
      { title: { tr: "Metinle çalışma", en: "Working with texts" }, duration: "22 dk" },
    ],
    resources: [
      { label: { tr: "Kavram sözlüğü", en: "Glossary" }, note: { tr: "Terimler", en: "Terms" } },
    ],
    accent: { from: "#15803d", to: "#0a2b20" },
    related: ["osmanlica-okumalari", "elyazmalari-ve-tarih"],
  },
  {
    slug: "algoritmik-dusunme",
    category: "tech",
    level: "beginner",
    title: { tr: "Algoritmik Düşünme", en: "Algorithmic Thinking" },
    tagline: {
      tr: "Problemleri adımlara bölerek çözmek.",
      en: "Solving problems by breaking them into steps.",
    },
    description: {
      tr: [
        "Kod yazmadan önce, problemleri algoritmik olarak düşünmeyi öğretir.",
        "Günlük örneklerle mantık, döngü ve karar yapılarını sezgisel kurarsın.",
      ],
      en: [
        "Teaches you to think about problems algorithmically before writing code.",
        "You build logic, loops and decision structures intuitively with everyday examples.",
      ],
    },
    lessons: [
      { title: { tr: "Adım adım düşünme", en: "Thinking step by step" }, duration: "13 dk" },
      { title: { tr: "Döngüler", en: "Loops" }, duration: "16 dk" },
      { title: { tr: "Karar yapıları", en: "Decision structures" }, duration: "18 dk" },
    ],
    resources: [
      { label: { tr: "Akış şeması şablonu", en: "Flowchart template" }, note: { tr: "Çalışma dosyası", en: "Worksheet" } },
      { label: { tr: "Alıştırmalar", en: "Exercises" }, note: { tr: "Pratik seti", en: "Practice set" } },
    ],
    accent: { from: "#1e3a8a", to: "#0a2b20" },
    related: ["sayilarin-dili", "kuantum-dusuncesi"],
  },
];

function pick<T>(b: Bilingual<T>, locale: Locale): T {
  return b[locale];
}

function toView(course: Course, locale: Locale): CourseView {
  return {
    slug: course.slug,
    category: course.category,
    level: levelLabels[course.level][locale],
    title: pick(course.title, locale),
    tagline: pick(course.tagline, locale),
    description: course.description[locale],
    lessons: course.lessons.map((l) => ({ title: pick(l.title, locale), duration: l.duration })),
    resources: course.resources.map((r) => ({ label: pick(r.label, locale), note: pick(r.note, locale) })),
    accent: course.accent,
    related: course.related,
  };
}

export function getCourses(locale: Locale): CourseView[] {
  return COURSES.map((c) => toView(c, locale));
}

export function getCourse(slug: string, locale: Locale): CourseView | null {
  const found = COURSES.find((c) => c.slug === slug);
  return found ? toView(found, locale) : null;
}

export function getCourseSlugs(): string[] {
  return COURSES.map((c) => c.slug);
}

export function academyCategoryLabel(category: AcademyCategory, locale: Locale): string {
  return academyCategoryLabels[category][locale];
}
