import { locales, defaultLocale, type Locale } from "@/lib/i18n";

export { locales, defaultLocale };
export type { Locale };

/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the environment for
 * production (used by metadataBase, canonical URLs, sitemap and robots).
 * Falls back to localhost during local development.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
