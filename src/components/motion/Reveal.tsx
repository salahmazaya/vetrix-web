"use client";

import { useInView } from "../three/useInView";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms, used to stagger neighbours */
  delay?: number;
  as?: "div" | "li" | "article" | "p" | "span";
};

/** Rises and sharpens its children into place the first time they scroll into view. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>("-60px", true);
  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-visible={inView}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
