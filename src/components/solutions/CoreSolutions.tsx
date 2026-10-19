import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { SectionHeading } from "../ui/SectionHeading";
import type { Solution } from "@/payload-types";
import { mediaSrc } from "@/lib/cms";

/** Grid of solution cards, each with its 3D render, summary and link. */
export function CoreSolutions({ content }: { content: Solution["core"] }) {
  return (
    <section id="core-solutions" className="scroll-mt-28 bg-white px-4 py-20 md:px-8 md:py-[86px] xl:px-[160px]">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
      <ul className="mx-auto mt-14 grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(content.cards ?? []).map((card, i) => {
          const img = mediaSrc(card.image);
          return (
            <Reveal as="li" key={card.id ?? i} delay={(i % 3) * 100}>
              <TiltCard max={6} className="solution-card glass-card relative flex h-full flex-col p-[14px]">
                <div className="relative aspect-[313/245] overflow-hidden rounded-[16px] bg-white">
                  {img && (
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 332px" className="solution-art object-contain" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 px-2 pt-5 pb-3">
                  <h3 className="text-base font-medium text-black">{card.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-[#6b7480]">{card.body}</p>
                  <Link
                    href={card.link.href}
                    className="solution-link mt-auto inline-flex items-center gap-2 pt-2 text-[13px] font-medium text-brand"
                  >
                    {card.link.label}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
