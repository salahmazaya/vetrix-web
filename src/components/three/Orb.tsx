"use client";

import dynamic from "next/dynamic";
import { useInView, usePrefersReducedMotion } from "./useInView";

const OrbScene = dynamic(() => import("./OrbScene"), { ssr: false });

/** Live 3D version of the Ve orb. The static render underneath shows until WebGL is ready. */
export function Orb({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <OrbScene active={inView} animate={!reduced} />
    </div>
  );
}
