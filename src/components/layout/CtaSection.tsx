import { BinaryPattern } from "../ui/BinaryPattern";
import { PillButton } from "../ui/PillButton";

/** "Ready to Scale?" band shown above the footer on every page. */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24">
      <BinaryPattern className="absolute -top-12 right-[-40px] w-48" />
      <BinaryPattern className="absolute bottom-[-30px] -left-12 w-48" />
      <div className="relative mx-auto flex max-w-[673px] flex-col items-center gap-7 text-center">
        <div className="flex flex-col items-center gap-5">
          <p className="text-xl font-medium leading-normal text-brand-bright">Ready to Scale?</p>
          <h2 className="max-w-[492px] text-[30px] leading-[1.35] font-semibold tracking-[-0.02em] text-navy sm:text-[38px] sm:leading-[62px]">
            Let’s Build Your <br className="max-sm:hidden" />
            Intelligent Software.
          </h2>
          <p className="text-sm leading-normal text-[#737373]">
            Schedule a brief discovery call to see how Vetrix can automate your workflows, build your custom
            systems, and accelerate your growth.
          </p>
        </div>
        <PillButton href="/contact" variant="brand">
          Book a Free Consultation
        </PillButton>
      </div>
    </section>
  );
}
