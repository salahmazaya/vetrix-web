"use client";

import Image from "next/image";
import { useRef } from "react";

type TiltImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  maxTilt?: number;
};

/** Image that tilts in 3D toward the pointer, used for the globe. */
export function TiltImage({ src, alt, width, height, className = "", imageClassName = "", maxTilt = 8 }: TiltImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${-y * maxTilt}deg`);
    el.style.setProperty("--ry", `${x * maxTilt}deg`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`[perspective:1200px] ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="transition-transform duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]"
      >
        <Image src={src} alt={alt} width={width} height={height} className={imageClassName} />
      </div>
    </div>
  );
}
