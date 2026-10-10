"use client";

import { useEffect, useState } from "react";
import { useInView } from "../three/useInView";

/**
 * Counts a stat like "85%", "4x", "99.9%", "150+", "12K" up from zero when it scrolls into view.
 * The final value is rendered on the server, so the number is right even without JavaScript.
 */
export function CountUp({
  value,
  className = "",
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const { ref, inView } = useInView<HTMLSpanElement>("-40px", true);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || !match) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // match is derived from value, which is covered by target/decimals
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, decimals, duration]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {match[1]}
      {shown ?? match[2]}
      {match[3]}
    </span>
  );
}
