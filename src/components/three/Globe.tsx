"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useInView, usePrefersReducedMotion } from "./useInView";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

/** Rotating 3D glass globe. The static render shows until WebGL is ready (or if it never is). */
export function Globe({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return (
    <div ref={ref} aria-hidden="true" className={`relative aspect-[1430/767] ${className}`}>
      <Image
        src="/images/globe.webp"
        alt=""
        fill
        sizes="(max-width: 1430px) 100vw, 1430px"
        className={`object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
        <GlobeScene active={inView} animate={!reduced} onReady={onReady} />
      </div>
    </div>
  );
}
