import { Reveal } from "../motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Centered eyebrow + title + supporting line, repeated at the top of most sections. Rises in on scroll. */
export function SectionHeading({ eyebrow, title, description, tone = "light", className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`mx-auto flex max-w-[784px] flex-col items-center gap-[18px] text-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <Reveal
          as="p"
          className={`eyebrow-shine text-base leading-normal font-medium ${dark ? "text-brand-bright" : "text-brand"}`}
        >
          {eyebrow}
        </Reveal>
        <Reveal delay={100}>
          <h2 className={`text-2xl font-medium tracking-[-0.02em] ${dark ? "text-white" : "text-black"}`}>{title}</h2>
        </Reveal>
      </div>
      {description && (
        <Reveal as="p" delay={200} className={`text-sm leading-normal ${dark ? "text-white/70" : "text-muted"}`}>
          {description}
        </Reveal>
      )}
    </div>
  );
}
