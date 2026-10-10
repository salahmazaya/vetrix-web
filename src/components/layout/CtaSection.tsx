import { Reveal } from "../motion/Reveal";
import { BinaryPattern } from "../ui/BinaryPattern";
import { PillButton } from "../ui/PillButton";

/** "Ready to Scale?" band shown above the footer on every page. */
export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-24">
      {/* Soft brand-coloured lights drifting behind the text */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="cta-glow absolute top-1/2 left-1/2 size-[360px] -translate-x-[80%] -translate-y-1/2 rounded-full bg-[#9fdaff]" />
        <div
          className="cta-glow absolute top-1/2 left-1/2 size-[300px] -translate-x-[10%] -translate-y-[40%] rounded-full bg-[#c9d4ff]"
          style={{ animationDelay: "-5s" }}
        />
      </div>
      <BinaryPattern className="absolute -top-12 right-[-40px] w-48" />
      <BinaryPattern className="absolute bottom-[-30px] -left-12 w-48" />
      <div className="relative mx-auto flex max-w-[673px] flex-col items-center gap-7 text-center">
        <div className="flex flex-col items-center gap-5">
          <Reveal as="p" className="eyebrow-shine text-xl leading-normal font-medium text-brand-bright">
            Ready to Scale?
          </Reveal>
          <Reveal delay={100}>
            <h2 className="cta-title-shine max-w-[492px] text-[30px] leading-[1.35] font-semibold tracking-[-0.02em] sm:text-[38px] sm:leading-[62px]">
              Let’s Build Your <br className="max-sm:hidden" />
              Intelligent Software.
            </h2>
          </Reveal>
          <Reveal as="p" delay={200} className="text-sm leading-normal text-[#737373]">
            Schedule a brief discovery call to see how Vetrix can automate your workflows, build your custom systems,
            and accelerate your growth.
          </Reveal>
        </div>
        <Reveal delay={300}>
          <PillButton href="/contact" variant="brand" className="cta-button">
            Book a Free Consultation
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
