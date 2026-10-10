import Image from "next/image";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { BracketLabel } from "../ui/StatBadge";
import { BentoHeart } from "./BentoHeart";
import { AiToggle, ChipCluster, GenerateButton } from "./BentoWidgets";

export function MeetVe() {
  return (
    <section className="bg-white px-4 pt-16 pb-16 md:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-[42px]">
        <SectionHeading
          eyebrow="Meet Ve"
          title="Complex Operations, Simple Prompts"
          description="An intelligent digital assistant designed to help businesses discover the right software solution faster. From websites and CRM systems to custom dashboards and internal management platforms."
        />

        <div className="grid gap-5 lg:grid-cols-[262px_1fr_262px]">
          {/* Center column: the "heart" card with the live orb */}
          <Reveal className="mx-auto w-full max-w-[556px] lg:order-2" delay={150}>
            <BentoHeart />
          </Reveal>

          {/* Left column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-1 lg:grid-cols-1 lg:grid-rows-[396px_220px_164px]">
            <Reveal className="glass-card bento-card flex flex-col justify-between gap-10 px-8 pt-7 pb-6">
              <p className="text-[32px] leading-10 font-medium tracking-[-0.01em] text-navy">
                Zero Effort. <span className="text-gradient-brand">Pure Intelligence</span>
              </p>
              <p className="max-w-[217px] text-base leading-6 text-black/50">
                Where complex code meets autonomous execution.
              </p>
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col items-center justify-between gap-2 px-8 pt-7 pb-6" delay={100}>
              <p className="text-sm leading-7 text-navy/50">Trusted by</p>
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">
                <CountUp value="12K" />
              </p>
              <Image src="/images/bento-avatars.webp" alt="" width={150} height={62} className="avatars-bob" />
              <p className="text-[18px] leading-7 text-navy">Innovators</p>
            </Reveal>
            <Reveal className="glass-card bento-card flex items-center justify-center p-6" delay={200}>
              <GenerateButton />
            </Reveal>
          </div>

          {/* Right column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-3 lg:grid-cols-1 lg:grid-rows-[157px_211px_412px]">
            <Reveal className="glass-card bento-card flex items-center justify-center p-6" delay={250}>
              <AiToggle />
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col items-center justify-center gap-5 px-8 pt-7 pb-6" delay={350}>
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">
                <CountUp value="20M" />
              </p>
              <BracketLabel>Smart Operations</BracketLabel>
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col justify-between gap-6 overflow-hidden px-8 pt-7 pb-6" delay={450}>
              <p className="text-xl leading-7 font-medium text-navy">Custom Software Solutions</p>
              <div className="flex w-full justify-center">
                <ChipCluster />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
