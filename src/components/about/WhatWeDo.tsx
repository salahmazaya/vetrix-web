import { Reveal } from "../motion/Reveal";
import { PillButton } from "../ui/PillButton";
import { SectionHeading } from "../ui/SectionHeading";
import type { SiteAbout } from "@/lib/site-content";

/** Dark section: a glowing centre line with the four services stepping down either side. */
export function WhatWeDo({ content }: { content: SiteAbout["whatWeDo"] }) {
  const items = content.items ?? [];

  return (
    <section className="bg-night-gradient relative isolate overflow-hidden px-4 py-20 md:px-8 md:py-[86px] xl:px-[160px]">
      <div aria-hidden="true" className="absolute top-[38%] left-1/2 -z-10 size-[620px] -translate-x-1/2 rounded-full bg-[#0b3a8a]/40 blur-[120px]" />
      <div aria-hidden="true" className="mx-auto mb-3 flex justify-center">
        <span className="timeline-spark size-2 rotate-45 bg-brand-bright" />
      </div>
      <SectionHeading tone="dark" eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

      <ol className="timeline relative mx-auto mt-14 max-w-[1120px] md:mt-[70px]">
        <span aria-hidden="true" className="absolute inset-y-0 start-[5px] w-px bg-white/10 lg:start-1/2 lg:-translate-x-1/2" />
        <span aria-hidden="true" className="timeline-fill absolute inset-y-0 start-[5px] w-px lg:start-1/2 lg:-translate-x-1/2" />

        {items.map((item, i) => {
          const onEnd = i % 2 === 1;
          return (
            <li key={item.id ?? i} className={`relative ${i > 0 ? "mt-6 lg:mt-0" : ""} lg:py-7`}>
              <span
                aria-hidden="true"
                className="timeline-dot absolute top-7 start-[5px] z-10 size-[11px] -translate-x-1/2 rounded-full bg-white lg:top-1/2 lg:start-1/2 lg:-translate-y-1/2"
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-7 hidden h-px border-t border-dashed border-white/25 lg:top-1/2 lg:block ${
                  onEnd ? "start-1/2 w-[calc(50%-1.25rem)]" : "end-1/2 w-[calc(50%-1.25rem)]"
                }`}
              />

              <div className="ps-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:ps-0">
                <Reveal
                  delay={i * 120}
                  className={`w-full min-w-0 lg:max-w-[452px] ${onEnd ? "lg:col-start-2 lg:justify-self-end" : "lg:col-start-1 lg:justify-self-start"}`}
                >
                  <div className="timeline-card rounded-[10px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-[2px]">
                    <h3 className="text-[15px] font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-white/65">{item.body}</p>
                  </div>
                </Reveal>
              </div>
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
