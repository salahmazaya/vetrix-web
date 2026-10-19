"use client";

import { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import type { Faq } from "@/payload-types";

/** Numbered questions; one opens at a time and slides its answer open. */
export function FaqSection({ content }: { content: Faq }) {
  const [open, setOpen] = useState(0);
  const items = content.items ?? [];
  if (!items.length) return null;

  return (
    <section id="faq" className="scroll-mt-28 bg-white px-4 pt-16 pb-8 md:px-8 md:pt-24 xl:px-[160px]">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
      <ul className="mx-auto mt-14 max-w-[1120px] border-t border-[#ececec]">
        {items.map((item, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
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
                    className="flex w-full items-start gap-5 px-4 py-6 text-left md:px-5 md:py-8"
                  >
                    <span className="faq-number w-7 shrink-0 pt-px text-lg font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-question flex-1 text-base font-semibold md:text-lg">{item.question}</span>
                    <span aria-hidden="true" className="faq-icon relative mt-1.5 size-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded bg-current" />
                      <span className="faq-icon-v absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded bg-current" />
                    </span>
                  </button>
                </h3>
                <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="faq-answer grid">
                  <div className="overflow-hidden">
                    <p className="px-4 pb-7 pl-[64px] text-[15px] leading-[1.66] text-[#6f6c8f] md:px-5 md:pl-[68px] md:text-base">
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
