import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase())
    .map((l) => l.split("-")[0]);

  for (const lang of preferred) {
    if (lang.startsWith("tr")) return "tr";
    if (lang.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|admin|.*\\.svg$).*)",
  ],
};
