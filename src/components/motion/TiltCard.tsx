"use client";

import { useRef } from "react";

/** Card that leans toward the pointer in 3D, with a light that follows it across the surface. */
export function TiltCard({
  children,
  className = "",
  style,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };
  return (
    <div className="h-full [perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={`tilt-card ${className}`} style={style}>
        {children}
        <span aria-hidden="true" className="tilt-light pointer-events-none absolute inset-0 rounded-[inherit]" />
      </div>
    </div>
  );
}
