import { Reveal } from "../motion/Reveal";
import { PillButton } from "../ui/PillButton";
import { SectionHeading } from "../ui/SectionHeading";
import type { About } from "@/payload-types";

/** Dark section: a glowing centre line with the four services stepping down either side. */
export function WhatWeDo({ content }: { content: About["whatWeDo"] }) {
  return (
    <section className="bg-night-gradient relative isolate overflow-hidden px-4 py-20 md:px-8 md:py-[86px] xl:px-[160px]">
      <div aria-hidden="true" className="absolute top-[38%] left-1/2 -z-10 size-[620px] -translate-x-1/2 rounded-full bg-[#0b3a8a]/40 blur-[120px]" />
      <div aria-hidden="true" className="mx-auto mb-3 flex justify-center">
        <span className="timeline-spark size-2 rotate-45 bg-brand-bright" />
      </div>
      <SectionHeading tone="dark" eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

      <ol className="timeline relative mx-auto mt-14 max-w-[1120px] md:mt-[70px]">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-[5px] w-px bg-white/10 md:left-1/2" />
        <span aria-hidden="true" className="timeline-fill absolute top-0 bottom-0 left-[5px] w-px md:left-1/2" />
        {(content.items ?? []).map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li key={item.id ?? i} className={`relative flex pl-8 md:pl-0 ${right ? "md:justify-end" : "md:justify-start"} ${i ? "mt-6 md:mt-0" : ""}`}>
              <span
                aria-hidden="true"
                className="timeline-dot absolute top-1/2 left-0 z-10 size-[11px] -translate-y-1/2 rounded-full bg-white md:left-1/2 md:-translate-x-1/2"
              />
              <span
                aria-hidden="true"
                className={`absolute top-1/2 hidden h-px border-t border-dashed border-white/25 md:block ${
                  right ? "right-[452px] left-1/2" : "right-1/2 left-[452px]"
                }`}
              />
              <Reveal delay={i * 120} className="w-full md:w-[452px]">
                <div className="timeline-card rounded-[10px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-[2px]">
                  <h3 className="text-[15px] font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-white/65">{item.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Reveal className="mt-12 flex justify-center">
        <PillButton href={content.button.href} variant="ghost" className="px-6 text-sm">
          {content.button.label}
        </PillButton>
      </Reveal>
    </section>
  );
}
