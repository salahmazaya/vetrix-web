import { Reveal } from "../motion/Reveal";
import { BinaryPattern } from "../ui/BinaryPattern";
import { PillButton } from "../ui/PillButton";
import type { SiteCta } from "@/lib/site-content";

/** "Ready to Scale?" band shown above the footer on every page. */
export function CtaSection({ content }: { content: SiteCta }) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-24">
      {/* Soft brand-coloured lights drifting behind the text */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="SiteCta-glow absolute top-1/2 left-1/2 size-[360px] -translate-x-[80%] -translate-y-1/2 rounded-full bg-[#9fdaff]" />
        <div
          className="SiteCta-glow absolute top-1/2 left-1/2 size-[300px] -translate-x-[10%] -translate-y-[40%] rounded-full bg-[#c9d4ff]"
          style={{ animationDelay: "-5s" }}
        />
      </div>
      <BinaryPattern className="absolute -top-12 right-[-40px] w-48" />
      <BinaryPattern className="absolute bottom-[-30px] -left-12 w-48" />
      <div className="relative mx-auto flex max-w-[673px] flex-col items-center gap-7 text-center">
        <div className="flex flex-col items-center gap-5">
          <Reveal as="p" className="eyebrow-shine text-xl leading-normal font-medium text-brand-bright">
            {content.eyebrow}
          </Reveal>
          <Reveal delay={100}>
            <h2 className="SiteCta-title-shine max-w-[492px] text-[30px] leading-[1.35] font-semibold tracking-[-0.02em] sm:text-[38px] sm:leading-[62px]">
              {content.title.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br className="max-sm:hidden" />}
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          {content.description && (
            <Reveal as="p" delay={200} className="text-sm leading-normal text-[#737373]">
              {content.description}
            </Reveal>
          )}
        </div>
        <Reveal delay={300}>
          <PillButton href={content.button.href} variant="brand" className="SiteCta-button">
            {content.button.label}
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
