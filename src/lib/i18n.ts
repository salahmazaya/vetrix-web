/** Site languages. Add a code here and the dashboard, routes, and fallback follow it. */
export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "vetrix-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function direction(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localeFromPath(pathname: string): Locale {
  const code = pathname.split("/")[1] ?? "";
  return isLocale(code) ? code : defaultLocale;
}

/** Prefix an in-site path. External links, mailto, and bare hashes stay untouched. */
export function localeHref(locale: Locale, href: string): string {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#")) return href;

  const hashAt = href.indexOf("#");
  const beforeHash = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const queryAt = beforeHash.indexOf("?");
  const pathname = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : "";

  if (locales.some((code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`))) return href;

  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const suffix = normalized === "/" ? "" : normalized;
  return `/${locale}${suffix}${query}${hash}`;
}

/** Same page in another language, keeping the path after the locale. */
export function switchLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1] ?? "")) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return localeHref(next, pathname || "/");
}

export function languageAlternates(path: string) {
  const suffix = path === "/" ? "" : path;
  return {
    languages: {
      en: `/en${suffix}`,
      ar: `/ar${suffix}`,
      "x-default": `/en${suffix}`,
    },
  };
}
