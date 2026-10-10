import { HeroWave } from "../three/HeroWave";
import { PillButton } from "../ui/PillButton";
import type { Home } from "@/payload-types";

export function Hero({ content }: { content: Home["hero"] }) {
  return (
    <section className="relative isolate flex min-h-[760px] items-start justify-center overflow-hidden bg-[#050d24] px-4 pt-[200px] md:min-h-[935px] md:pt-[231px]">
      {/* Deep navy backdrop with the blue glow the stock photo used to provide */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 100%, rgba(18, 92, 196, 0.55) 0%, rgba(6, 30, 84, 0.25) 45%, transparent 75%), linear-gradient(180deg, #0b1c3d 0%, #061031 45%, #030a22 100%)",
        }}
      />
      <HeroWave className="absolute inset-x-0 bottom-0 -z-10 h-[50%] md:h-[78%]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#030a22]/70"
      />

      <div className="flex max-w-[636px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-6">
          <h1 className="hero-rise text-[34px] leading-tight font-semibold text-white md:text-[42px]">
            {content.title}
          </h1>
          <p className="hero-rise text-base leading-normal text-[#f9f9f9] [animation-delay:150ms]">
            {content.description}
          </p>
        </div>
        <div className="hero-rise flex flex-wrap items-center justify-center gap-4 [animation-delay:300ms]">
          <PillButton href={content.primaryButton.href}>{content.primaryButton.label}</PillButton>
          <PillButton href={content.secondaryButton.href} variant="ghost">
            {content.secondaryButton.label}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
