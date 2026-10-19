"use client";

import { useEffect, useRef, useState } from "react";

type Part = { text: string; highlight?: boolean };

/**
 * A paragraph whose words light up one after another as it scrolls through the screen.
 * Highlighted words light up in the accent colour instead of white.
 */
export function ScrollWords({ parts, className = "" }: { parts: Part[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% of the screen, 1 when its bottom reaches 45%
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.4);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = parts.flatMap((part) =>
    part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((w) => ({ w, highlight: part.highlight })),
  );
  const total = words.filter(({ w }) => w.trim()).length;
  let index = 0;

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, highlight }, i) => {
        if (!w.trim()) return w;
        const lit = progress * total > index++;
        return (
          <span
            key={i}
            className={`transition-[color,text-shadow] duration-300 ${
              lit
                ? highlight
                  ? "text-sky-soft [text-shadow:0_0_18px_rgba(141,208,241,0.45)]"
                  : "text-white"
                : "text-white/20"
            }`}
          >
            {w}
          </span>
        );
      })}
    </p>
  );
}
