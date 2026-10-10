"use client";

import { useInView } from "../three/useInView";
import { SectionHeading } from "../ui/SectionHeading";
import type { Solution } from "@/payload-types";

// Each step's dot, as % of the 1120 x 300 wave box, and how far its text drops below
const dots = [
  { x: 13, y: 8 },
  { x: 50, y: 48 },
  { x: 85, y: 30 },
];
const WAVE = "M -4 30 C 4 6, 9 4, 13 8 S 30 52, 50 48 S 72 4, 85 30 S 98 46, 104 40";

/** Three numbered steps riding a dashed wave; light flows along it once it scrolls in. */
export function Methodology({ content }: { content: Solution["methodology"] }) {
  const { ref, inView } = useInView<HTMLDivElement>("-120px", true);
  const steps = content.steps ?? [];
  return (
    <section className="method-section relative isolate overflow-hidden px-4 py-20 md:px-8 md:py-[75px] xl:px-[160px]">
      <div aria-hidden="true" className="how-floor absolute inset-x-0 bottom-0 -z-10 h-[45%] opacity-60" />
      <SectionHeading tone="dark" eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

      <div ref={ref} data-visible={inView} className="method relative mx-auto mt-14 max-w-[1120px] md:mt-20 md:h-[420px]">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-[250px] w-full overflow-visible md:block">
          <path d={WAVE} className="method-wave-base" vectorEffect="non-scaling-stroke" />
          <path d={WAVE} className="method-wave" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="relative flex flex-col gap-12 md:block md:h-full">
          {steps.map((step, i) => {
            const d = dots[i % 3];
            return (
              <li
                key={step.id ?? i}
                className="method-step flex flex-col items-center text-center md:absolute md:w-[300px] md:-translate-x-1/2"
                style={{ "--i": i, "--x": `${d.x}%`, "--y": `${(d.y / 100) * 250}px` } as React.CSSProperties}
              >
                <span aria-hidden="true" className="method-dot relative z-10 size-[14px] rounded-full" />
                <span aria-hidden="true" className="method-number mt-2 text-[64px] leading-none font-semibold md:text-[76px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="-mt-3 text-[15px] font-medium text-white">{step.title}</h3>
                <p className="mt-3 max-w-[300px] text-[13px] leading-[1.6] text-white/60">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
