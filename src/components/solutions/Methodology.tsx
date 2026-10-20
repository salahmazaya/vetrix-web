"use client";

import { useInView } from "../three/useInView";
import { SectionHeading } from "../ui/SectionHeading";
import type { SiteSolution } from "@/lib/site-content";

const WAVE = "M -4 30 C 4 6, 9 4, 13 8 S 30 52, 50 48 S 72 4, 85 30 S 98 46, 104 40";

/** Dot anchor on the wave (% of the wave box). */
const anchors = [
  { x: 13, y: 8 },
  { x: 50, y: 48 },
  { x: 85, y: 30 },
];

/** Three numbered steps riding a dashed wave (md+) or stacked cards (mobile). */
export function Methodology({ content }: { content: SiteSolution["methodology"] }) {
  const { ref, inView } = useInView<HTMLDivElement>("-120px", true);
  const steps = content.steps ?? [];

  return (
    <section className="method-section relative isolate px-4 py-20 md:px-8 md:py-[75px] xl:px-[160px]">
      <div aria-hidden="true" className="how-floor absolute inset-x-0 bottom-0 -z-10 h-[45%] opacity-60" />
      <SectionHeading tone="dark" eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

      <div
        ref={ref}
        data-visible={inView}
        className="method relative mx-auto mt-14 w-full min-w-0 max-w-[1120px] md:mt-20 md:min-h-[480px] md:pb-6"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="method-wave-svg pointer-events-none absolute inset-x-0 top-0 hidden w-full overflow-visible md:block rtl:-scale-x-100"
        >
          <path d={WAVE} className="method-wave-base" vectorEffect="non-scaling-stroke" />
          <path d={WAVE} className="method-wave" vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className="relative flex flex-col gap-14 md:block md:min-h-[var(--method-wave-h)]">
          {steps.map((step, i) => {
            const a = anchors[i % anchors.length];
            return (
              <li
                key={step.id ?? i}
                className="method-step flex w-full flex-col items-center px-2 text-center md:absolute md:w-[min(300px,31%)] md:max-w-[320px]"
                style={
                  {
                    "--i": i,
                    "--mx": `${a.x}%`,
                    "--my": a.y,
                  } as React.CSSProperties
                }
              >
                <span
                  aria-hidden="true"
                  className="method-dot relative z-10 mb-4 size-[14px] shrink-0 rounded-full md:absolute md:top-0 md:start-1/2 md:mb-0 md:-translate-x-1/2 md:-translate-y-1/2 rtl:md:translate-x-1/2"
                />
                <span aria-hidden="true" className="method-number mt-0 text-[56px] leading-none font-semibold sm:text-[64px] md:mt-7 md:text-[72px] lg:text-[76px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="-mt-2 text-[15px] font-medium text-white md:-mt-3">{step.title}</h3>
                <p className="mt-3 w-full max-w-[360px] text-[13px] leading-[1.65] text-white/60">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
