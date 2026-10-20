import { Highlight } from "../inner/Highlight";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { Orb } from "../three/Orb";
import { ArrowIcon } from "../ui/ArrowIcon";
import type { SiteAiCore } from "@/lib/site-content";

// Row widths alternate narrow/wide like the design: 41/57, then 57/41
const spans = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];

/** "Built for Scale" heading with the live Ve orb, then four feature cards. */
export function ScaleFeatures({ content }: { content: SiteAiCore["features"] }) {
  return (
    <section className="page-px overflow-x-clip pt-20 pb-24 md:pt-[64px] md:pb-[64px]">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex items-center justify-between gap-8">
          <div className="max-w-[676px]">
            <Reveal as="p" className="eyebrow-shine text-base font-medium text-brand">
              {content.eyebrow}
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 text-[32px] leading-[1.3] font-medium tracking-[-0.02em] text-black md:text-[48px]">
                <Highlight text={content.title} className="text-gradient-brand" />
              </h2>
            </Reveal>
          </div>
          <div className="relative hidden size-[225px] shrink-0 sm:block">
            <div aria-hidden="true" className="orb-ring absolute inset-[-14px] rounded-full" />
            <Orb className="size-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {(content.cards ?? []).map((card, i) => (
            <Reveal key={card.id ?? i} delay={i * 90} className={spans[i % 4]}>
              <TiltCard max={5} className="feature-card glass-card relative flex h-full min-h-[178px] flex-col justify-between gap-8 overflow-hidden p-6">
                <div className="flex items-start justify-between gap-6">
                  <p className="max-w-[440px] text-[13px] leading-[1.7] text-[#5b6b7c]">{card.body}</p>
                  <span className="feature-arrow flex size-[38px] shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_6px_16px_-4px_rgba(6,122,193,0.6)]">
                    <ArrowIcon className="size-3" />
                  </span>
                </div>
                <h3 className="text-lg font-medium text-navy">{card.title}</h3>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
