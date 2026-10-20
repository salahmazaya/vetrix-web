"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, localeHref } from "@/lib/i18n";

type LocaleLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-current"?: "page" | undefined;
  "aria-label"?: string;
};

/** In-site link that keeps the visitor in the language they are already reading. */
export function LocaleLink({ href, children, className, onClick, ...aria }: LocaleLinkProps) {
  const locale = localeFromPath(usePathname());
  return (
    <Link href={localeHref(locale, href)} className={className} onClick={onClick} {...aria}>
      {children}
    </Link>
  );
}
