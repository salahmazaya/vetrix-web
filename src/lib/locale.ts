import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./i18n";

/** Read the `[locale]` segment and 404 when it is not a language this site serves. */
export async function requireLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
