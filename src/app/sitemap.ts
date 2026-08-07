import type { MetadataRoute } from "next";
import { siteUrl, locales } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: lang === "tr" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}`])
      ),
    },
  }));
}
