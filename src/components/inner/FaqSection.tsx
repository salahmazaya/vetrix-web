"use client";

import { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import type { SiteFaq } from "@/lib/site-content";

/** Numbered questions; one opens at a time and slides its answer open. */
export function FaqSection({ content }: { content: SiteFaq }) {
  const [open, setOpen] = useState(0);
  const items = content.items ?? [];
  if (!items.length) return null;

  return (
    <section id="SiteFaq" className="scroll-mt-28 bg-white px-4 pt-16 pb-8 md:px-8 md:pt-24 xl:px-[160px]">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
      <ul className="mx-auto mt-14 max-w-[1120px] border-t border-[#ececec]">
        {items.map((item, i) => {
          const isOpen = open === i;
          const id = `SiteFaq-${i}`;
          return (
            <Reveal as="li" key={item.id ?? i} delay={i * 70} className="border-b border-[#ececec]">
              <div data-open={isOpen} className="faq-item relative">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`flex w-full items-center gap-5 px-4 text-start md:px-6 ${isOpen ? "pt-6 pb-3 md:pt-7 md:pb-4" : "py-6 md:py-7"}`}
                  >
                    <span className="faq-number w-7 shrink-0 text-lg font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-question flex-1 text-base font-semibold md:text-lg">{item.question}</span>
                    <span aria-hidden="true" className="faq-icon relative size-4 shrink-0">
                      <span className="absolute start-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded bg-current" />
                      <span className="faq-icon-v absolute start-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded bg-current" />
                    </span>
                  </button>
                </h3>
                <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="faq-answer grid">
                  <div className="overflow-hidden">
                    <p className="pe-4 pb-6 ps-16 text-[15px] leading-[1.7] text-[#6f6c8f] md:pe-6 md:pb-7 md:ps-[4.5rem] md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
