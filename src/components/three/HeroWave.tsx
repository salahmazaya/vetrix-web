"use client";

import dynamic from "next/dynamic";
import { useInView, usePrefersReducedMotion } from "./useInView";

const HeroWaveScene = dynamic(() => import("./HeroWaveScene"), { ssr: false });

/** Interactive particle wave that replaces the stock photo behind the hero. */
export function HeroWave({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>("0px");
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <HeroWaveScene active={inView} animate={!reduced} />
    </div>
  );
}
