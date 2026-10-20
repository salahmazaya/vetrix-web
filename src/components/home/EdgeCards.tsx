"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../three/useInView";
import { BinaryPattern } from "../ui/BinaryPattern";
import type { SiteHome } from "@/lib/site-content";

const layouts = [
  { align: "start" as const, bodyWidth: "sm:max-w-[272px]", bodyPad: "sm:pt-[60px]" },
  { align: "start" as const, bodyWidth: "sm:max-w-[228px]", bodyPad: "sm:pt-[60px]" },
  { align: "end" as const, bodyWidth: "sm:max-w-[269px]", bodyPad: "sm:pt-[90px]" },
  { align: "end" as const, bodyWidth: "sm:max-w-[269px]", bodyPad: "sm:pt-[90px]" },
];

const numberClip = { WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const;

/**
 * The four Vetrix Edge cards. They start light; hovering (or, on touch screens, scrolling a card
 * to the middle of the screen) turns a card dark with the glowing blue number from the design.
 */
export function EdgeCards({ cards }: { cards: NonNullable<SiteHome["edge"]["cards"]> }) {
  const { ref, inView } = useInView<HTMLDivElement>("-80px", true);
  const [touchActive, setTouchActive] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Touch screens have no hover, so light up whichever card sits in the middle of the screen
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setTouchActive((e.target as HTMLElement).dataset.n ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} data-visible={inView} className="edge-grid grid gap-[18px] md:grid-cols-2">
      {cards.map((card, i) => {
        const layout = layouts[i] ?? layouts[0]!;
        const c = { ...card, n: String(i + 1).padStart(2, "0"), ...layout };
        return (
          <article
            key={c.n}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-n={c.n}
            data-active={touchActive === c.n}
            tabIndex={0}
            onPointerMove={onMove}
            className="edge-card group relative min-h-[270px] overflow-hidden rounded-3xl bg-mist p-[30px] outline-none"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {/* Dark hover state, with a soft light that follows the pointer */}
            <div aria-hidden="true" className="edge-dark absolute inset-0 bg-[#050c16]" />
            <div aria-hidden="true" className="edge-spotlight absolute inset-0" />
            <BinaryPattern tone="dark" className="edge-binary absolute -top-6 end-2 w-48" />

            <h3 className="edge-title relative z-10 text-2xl leading-[30px] font-medium">{c.title}</h3>
            <div
              className={`relative z-10 flex flex-col gap-4 ${
                c.align === "start" ? `sm:ms-auto ${c.bodyWidth} ${c.bodyPad}` : `${c.bodyWidth} ${c.bodyPad}`
              }`}
            >
              <p className="edge-body text-sm leading-[30px]">{c.body}</p>
            </div>

            <span
              aria-hidden="true"
              data-align={c.align}
              className={`edge-number pointer-events-none absolute top-[101px] text-[150px] leading-none font-normal sm:text-[190px] ${
                c.align === "start" ? "edge-number--start" : "edge-number--end"
              }`}
            >
              <span style={{ ...numberClip, backgroundImage: "linear-gradient(183deg, #000547 36%, rgba(1,71,255,0) 82%)" }}>
                {c.n}
              </span>
              <span
                className="edge-number-glow absolute inset-0"
                style={{ ...numberClip, backgroundImage: "linear-gradient(183deg, #008dd2 36%, rgba(0,141,210,0) 82%)" }}
              >
                {c.n}
              </span>
            </span>
          </article>
        );
      })}
    </div>
  );
}
