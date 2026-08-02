import type { Locale, PageDict } from "@/lib/content";

export type { Locale, PageDict };
export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export type Dictionary = PageDict;
