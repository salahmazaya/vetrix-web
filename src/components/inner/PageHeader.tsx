import { BinaryRain } from "./BinaryRain";
import { Highlight } from "./Highlight";
import { LocaleLink } from "../ui/LocaleLink";
import type { Locale } from "@/lib/i18n";
import { copyFor } from "@/lib/ui-copy";

type PageHeaderProps = {
  locale: Locale;
  content: { title: string; headline: string; intro: string };
  /** Shorter blue band when there is no overlapping card below */
  compact?: boolean;
  /** The first section's card, which overlaps the bottom of the blue band */
  children?: React.ReactNode;
};

/** Blue band at the top of every inner page: page name, breadcrumb, headline and intro. */
export function PageHeader({ locale, content, compact, children }: PageHeaderProps) {
  const copy = copyFor(locale);
  const bandPad = compact
    ? "pb-16 md:pb-20"
    : "pb-[250px] md:pb-[354px]";
  return (
    <section className="relative isolate overflow-x-clip">
      <div className={`page-header-band page-px relative pt-[132px] md:pt-[162px] ${bandPad}`}>
        <BinaryRain className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-[1120px]">
          <h1 className="hero-rise text-2xl leading-[18px] text-white">{content.title}</h1>
          <nav aria-label={copy.breadcrumb} className="hero-rise mt-[13px] [animation-delay:80ms]">
            <ol className="flex items-center gap-[10px] text-sm text-white">
              <li>
                <LocaleLink href="/" className="transition-colors hover:text-sky">
                  {copy.home}
                </LocaleLink>
              </li>
              <li aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" className="-rotate-90 rtl:rotate-90" fill="currentColor">
                  <path d="M4 6h8l-4 5z" />
                </svg>
              </li>
              <li aria-current="page">{content.title}</li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,420px)_minmax(0,605px)] md:justify-between">
            <p className="hero-rise text-[24px] leading-[1.3] font-medium tracking-[-0.01em] text-white capitalize [animation-delay:160ms] md:text-[28px]">
              <Highlight text={content.headline} className="page-SiteHeader-highlight" />
            </p>
            <p className="hero-rise text-[15px] leading-[1.6] text-[#e4e4e4] [animation-delay:240ms] md:text-justify md:text-base">
              {content.intro}
            </p>
          </div>
        </div>
      </div>
      {children && (
        <div className="page-px relative -mt-[190px] md:-mt-[286px]">
          <div className="mx-auto max-w-[1120px]">{children}</div>
        </div>
      )}
    </section>
  );
}
