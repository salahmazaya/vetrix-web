"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "../ui/Logo";
import { LocaleLink } from "../ui/LocaleLink";
import { PillButton } from "../ui/PillButton";
import { localeFromPath, localeHref } from "@/lib/i18n";
import { copyFor } from "@/lib/ui-copy";
import type { SiteHeader } from "@/lib/site-content";

/** Glass nav overlaid on the hero/header band; scrolls with the page (not sticky). */
type NavbarProps = { links: NonNullable<SiteHeader["links"]>; button: SiteHeader["button"] };

export function Navbar({ links, button }: NavbarProps) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = copyFor(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-[38px] z-50 px-4 md:px-8 xl:px-[160px] max-md:top-4">
      <nav
        aria-label={copy.navLabel}
        className={`mx-auto flex max-w-[1120px] items-center justify-between rounded-[67px] border border-white/10 p-4 backdrop-blur-[2px] transition-colors duration-300 ${
          scrolled ? "bg-[#0a1232]/80 backdrop-blur-md" : "bg-white/[0.04]"        }`}
      >
        <LocaleLink href="/" aria-label={copy.homeAria}>
          <Logo priority className="h-11 w-[120px]" />
        </LocaleLink>

        <ul className="hidden items-center gap-[43px] text-base text-white lg:flex">
          {links.map((link) => (
            <li key={link.id ?? link.href}>
              <LocaleLink
                href={link.href}
                aria-current={pathname === localeHref(locale, link.href) ? "page" : undefined}
                className="transition-colors hover:text-sky aria-[current=page]:text-sky"
              >
                {link.label}
              </LocaleLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitch />
          <PillButton href={button.href}>{button.label}</PillButton>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? copy.closeMenu : copy.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-3 max-w-[1120px] rounded-3xl border border-white/10 bg-[#0a1232]/95 p-6 backdrop-blur-md lg:hidden"
        >
          <LanguageSwitch className="mb-5" />
          <ul className="flex flex-col gap-5 text-lg text-white">
            {links.map((link) => (
              <li key={link.id ?? link.href}>
                <LocaleLink href={link.href} className="block hover:text-sky" onClick={() => setOpen(false)}>
                  {link.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
          <PillButton href={button.href} className="mt-6 w-full">
            {button.label}
          </PillButton>
        </div>
      )}
    </header>
  );
}
