type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Centered eyebrow + title + supporting line, repeated at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`mx-auto flex max-w-[784px] flex-col items-center gap-[18px] text-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <p className={`text-base font-medium leading-normal ${dark ? "text-brand-bright" : "text-brand"}`}>
          {eyebrow}
        </p>
        <h2
          className={`text-2xl font-medium tracking-[-0.02em] ${dark ? "text-white" : "text-black"}`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className={`text-sm leading-normal ${dark ? "text-white/70" : "text-muted"}`}>{description}</p>
      )}
    </div>
  );
}
