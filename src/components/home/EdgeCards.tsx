"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../three/useInView";
import { BinaryPattern } from "../ui/BinaryPattern";

const cards = [
  {
    n: "01",
    title: "Scalable Web Solutions",
    body: "We design and build high-performance, responsive websites and enterprise platforms tailored to deliver flawless user experiences and drive conversions.",
    numberLeft: true,
    bodyWidth: "sm:max-w-[272px]",
  },
  {
    n: "02",
    title: "Tailored CRM Systems",
    body: "Take full control of your business data. We build custom management tools and CRMs that centralize your operations, sales, and customer relations.",
    numberLeft: true,
    bodyWidth: "sm:max-w-[228px]",
  },
  {
    n: "03",
    title: "Intelligent Automation",
    body: "Eliminate repetitive tasks. Our smart automation tools streamline your workflows, allowing your team to focus on high-value growth.",
  },
  {
    n: "04",
    title: "Proprietary AI Engines",
    body: "Future-proof your software. We embed custom AI models directly into your systems to analyze data, predict trends.",
  },
];

const numberClip = { WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const;

/**
 * The four Vetrix Edge cards. They start light; hovering (or, on touch screens, scrolling a card
 * to the middle of the screen) turns a card dark with the glowing blue number from the design.
 */
export function EdgeCards() {
  const { ref, inView } = useInView<HTMLDivElement>("-80px");
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
      {cards.map((c, i) => (
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
          <BinaryPattern tone="dark" className="edge-binary absolute -top-6 right-2 w-48" />

          <h3 className="edge-title relative text-2xl leading-[30px] font-medium">{c.title}</h3>
          <div
            className={`relative z-10 mt-6 flex flex-col gap-4 sm:mt-0 ${
              c.numberLeft ? `sm:ml-auto ${c.bodyWidth} sm:pt-[60px]` : "sm:max-w-[269px] sm:pt-[90px]"
            }`}
          >
            <p className="edge-body text-sm leading-[30px]">{c.body}</p>
          </div>

          <span
            aria-hidden="true"
            className={`edge-number pointer-events-none absolute top-[101px] text-[150px] leading-none font-normal max-sm:hidden sm:text-[190px] ${
              c.numberLeft ? "left-[18px]" : "left-[293px]"
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
      ))}
    </div>
  );
}
