import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n";

const ADMIN_LANGUAGE = "payload-lng";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;
  return defaultLocale;
}

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
}

function setAdminLanguageCookie(response: NextResponse, lang: "en" | "ar") {
  response.cookies.set(ADMIN_LANGUAGE, lang, {
    path: "/",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
}

/**
 * English is the default for the public site and the admin UI.
 * Content locale (en/ar fields) stays independent via Payload's locale selector.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const existing = request.cookies.get(ADMIN_LANGUAGE)?.value;
    if (existing === "en" || existing === "ar") {
      return NextResponse.next();
    }

    // Ignore browser Accept-Language — default dashboard UI language is English.
    // Redirect once so the cookie is present on the request Payload reads.
    // Content locale (EN/AR field values) stays independent via the Localizer.
    const response = NextResponse.redirect(request.nextUrl);
    setAdminLanguageCookie(response, "en");
    return response;
  }

  if (locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    const response = NextResponse.next();
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (!saved || !isLocale(saved)) {
      const segment = pathname.split("/")[1];
      if (isLocale(segment)) setLocaleCookie(response, segment);
    }
    return response;
  }

  const url = request.nextUrl.clone();
  const locale = preferredLocale(request);
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  if (!request.cookies.get(LOCALE_COOKIE)?.value) {
    setLocaleCookie(response, defaultLocale);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|images|.*\\..*).*)"],
};
