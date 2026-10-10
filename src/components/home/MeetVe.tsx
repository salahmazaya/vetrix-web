import Image from "next/image";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { BracketLabel } from "../ui/StatBadge";
import { BentoHeart } from "./BentoHeart";
import { AiToggle, ChipCluster, GenerateButton } from "./BentoWidgets";
import { mediaSrc } from "@/lib/cms";
import type { Home } from "@/payload-types";

export function MeetVe({ content }: { content: Home["meetVe"] }) {
  const { introCard, trustedCard, statCard } = content;
  const avatars = mediaSrc(trustedCard.avatars);
  return (
    <section className="bg-white px-4 pt-16 pb-16 md:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-[42px]">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

        <div className="grid gap-5 lg:grid-cols-[262px_1fr_262px]">
          {/* Center column: the "heart" card with the live orb */}
          <Reveal className="mx-auto w-full max-w-[556px] lg:order-2" delay={150}>
            <BentoHeart content={content.heart} />
          </Reveal>

          {/* Left column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-1 lg:grid-cols-1 lg:grid-rows-[396px_220px_164px]">
            <Reveal className="glass-card bento-card flex flex-col justify-between gap-10 px-8 pt-7 pb-6">
              <p className="text-[32px] leading-10 font-medium tracking-[-0.01em] text-navy">
                {introCard.title}{" "}
                {introCard.highlight && <span className="text-gradient-brand">{introCard.highlight}</span>}
              </p>
              {introCard.caption && (
                <p className="max-w-[217px] text-base leading-6 text-black/50">{introCard.caption}</p>
              )}
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col items-center justify-between gap-2 px-8 pt-7 pb-6" delay={100}>
              <p className="text-sm leading-7 text-navy/50">{trustedCard.label}</p>
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">
                <CountUp value={trustedCard.value} />
              </p>
              {avatars && (
                <Image src={avatars.src} alt={avatars.alt} width={150} height={62} className="avatars-bob" />
              )}
              <p className="text-[18px] leading-7 text-navy">{trustedCard.caption}</p>
            </Reveal>
            <Reveal className="glass-card bento-card flex items-center justify-center p-6" delay={200}>
              <GenerateButton label={content.generateLabel} />
            </Reveal>
          </div>

          {/* Right column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-3 lg:grid-cols-1 lg:grid-rows-[157px_211px_412px]">
            <Reveal className="glass-card bento-card flex items-center justify-center p-6" delay={250}>
              <AiToggle />
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col items-center justify-center gap-5 px-8 pt-7 pb-6" delay={350}>
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">
                <CountUp value={statCard.value} />
              </p>
              <BracketLabel>{statCard.label}</BracketLabel>
            </Reveal>
            <Reveal className="glass-card bento-card flex flex-col justify-between gap-6 overflow-hidden px-8 pt-7 pb-6" delay={450}>
              <p className="text-xl leading-7 font-medium text-navy">{content.chipsTitle}</p>
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
