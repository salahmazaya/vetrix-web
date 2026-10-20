"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { useInView } from "../three/useInView";
import type { SiteAiCore } from "@/lib/site-content";

// Where each step sits on the diagonal, as % of the graph box (desktop)
const spots = [
  { x: 0, y: 0 },
  { x: 26, y: 24 },
  { x: 52.5, y: 48 },
  { x: 78, y: 72 },
];
const PATH = "M 0 21 C 12 21, 18 40, 30 45 S 48 62, 56 69 S 74 86, 82 92 S 96 99, 100 99";

/** Four steps stepping down a glowing path over a perspective grid floor. */
export function HowItWorks({ content }: { content: SiteAiCore["steps"] }) {
  const { ref, inView } = useInView<HTMLDivElement>("-120px", true);
  const items = content.items ?? [];
  return (
    <section className="how-section page-px relative isolate overflow-hidden py-20 md:py-[75px]">
      <div aria-hidden="true" className="how-floor absolute inset-x-0 bottom-0 -z-10 h-[55%]" />
      <SectionHeading
        tone="dark"
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description ?? undefined}
      />

      <div ref={ref} data-visible={inView} className="how-graph relative mx-auto mt-14 max-w-[920px] md:mt-[60px] md:h-[590px]">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 hidden size-full overflow-visible md:block rtl:-scale-x-100"
        >
          <defs>
            <linearGradient id="how-line" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#9fdaff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#008dd2" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d={PATH} className="how-path-base" vectorEffect="non-scaling-stroke" />
          <path d={PATH} className="how-path" pathLength={1} vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className="relative flex flex-col gap-6 border-s border-white/15 ps-6 md:block md:h-full md:border-0 md:ps-0">
          {items.map((step, i) => (
            <li
              key={step.id ?? i}
              className="how-step md:absolute"
              style={
                {
                  "--i": i,
                  "--x": `${spots[i % 4].x}%`,
                  "--y": `${spots[i % 4].y}%`,
                } as React.CSSProperties
              }
            >
              <span aria-hidden="true" className="how-dot absolute top-1 -start-[29px] size-2.5 rounded-full md:hidden" />
              <div className="how-step-card relative py-1 ps-0 md:ps-4">
                <h3 className="text-[15px] font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/60">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
