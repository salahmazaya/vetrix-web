"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeFromPath, switchLocale, type Locale } from "@/lib/i18n";

/** Remembers the choice, then opens the same page in that language. */
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const current = localeFromPath(pathname);
  const next: Locale = current === "en" ? "ar" : "en";
  const label = current === "ar" ? "English" : "العربية";
  const ariaLabel = current === "ar" ? "التبديل إلى English" : "Switch to Arabic";

  return (
    <Link
      href={switchLocale(pathname, next)}
      hrefLang={next}
      onClick={() => remember(next)}
      title={label}
      aria-label={ariaLabel}
      className={`flex size-10 items-center justify-center rounded-full text-white transition-colors duration-200 hover:text-sky ${className}`}
    >
      <GlobeIcon className="size-5" />
    </Link>
  );
}
