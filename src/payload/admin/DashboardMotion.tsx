"use client";

import { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** Counts up once when the number enters the view. */
export function CountUp({ value, duration = 650 }: { value: number; duration?: number }) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || value === 0) {
      setShown(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, duration]);

  return (
    <span ref={ref} className="vx-count">
      {shown.toLocaleString("en")}
    </span>
  );
}

/** Marks a chart block so CSS can run bar and ring motion. */
export function ChartStage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`vx-stage${visible ? " is-on" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
