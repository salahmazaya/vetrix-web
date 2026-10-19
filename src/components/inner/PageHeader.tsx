import Link from "next/link";
import { BinaryRain } from "./BinaryRain";
import { Highlight } from "./Highlight";

type PageHeaderProps = {
  content: { title: string; headline: string; intro: string };
  /** The first section's card, which overlaps the bottom of the blue band */
  children?: React.ReactNode;
};

/** Blue band at the top of every inner page: page name, breadcrumb, headline and intro. */
export function PageHeader({ content, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-x-clip">
      <div className="page-header-band relative px-4 pt-[132px] pb-[250px] md:px-8 md:pt-[162px] md:pb-[354px] xl:px-[160px]">
        <BinaryRain className="absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1120px]">
          <h1 className="hero-rise text-2xl leading-[18px] text-white">{content.title}</h1>
          <nav aria-label="Breadcrumb" className="hero-rise mt-[13px] [animation-delay:80ms]">
            <ol className="flex items-center gap-[10px] text-sm text-white">
              <li>
                <Link href="/" className="transition-colors hover:text-sky">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" className="-rotate-90" fill="currentColor">
                  <path d="M4 6h8l-4 5z" />
                </svg>
              </li>
              <li aria-current="page">{content.title}</li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,420px)_minmax(0,605px)] md:justify-between">
            <p className="hero-rise text-[24px] leading-[1.3] font-medium tracking-[-0.01em] text-white capitalize [animation-delay:160ms] md:text-[28px]">
              <Highlight text={content.headline} className="page-header-highlight" />
            </p>
            <p className="hero-rise text-[15px] leading-[1.6] text-[#e4e4e4] [animation-delay:240ms] md:text-justify md:text-base">
              {content.intro}
            </p>
          </div>
        </div>
      </div>
      {children && (
        <div className="relative -mt-[190px] px-4 md:-mt-[286px] md:px-8 xl:px-[160px]">
          <div className="mx-auto max-w-[1120px]">{children}</div>
        </div>
      )}
    </section>
  );
}
