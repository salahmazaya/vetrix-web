import Image from "next/image";
import { Orb } from "../three/Orb";
import { SectionHeading } from "../ui/SectionHeading";
import { BracketLabel } from "../ui/StatBadge";

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
          {/* Center column: the dark "heart" card with the live orb on top */}
          <div className="relative mx-auto w-full max-w-[556px] lg:order-2">
            <Image
              src="/images/bento-center.webp"
              alt=""
              width={556}
              height={820}
              className="h-auto w-full"
              priority={false}
            />
            <h3 className="sr-only">The Intelligent Heart of Your Business.</h3>
            <div className="sr-only">
              <p>Smart Workflows: Explore multiple operational paths and automated decision-making.</p>
              <p>Predictive Insights: Extract key data points and boost precision with deep analysis.</p>
            </div>
            {/* Soft glow + 3D orb aligned with the orb in the artwork */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[51.5%] left-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_35%,rgba(205,228,250,0.6)_55%,transparent_72%)]"
            />
            <Orb className="absolute top-[51.5%] left-1/2 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Left column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-1 lg:grid-cols-1 lg:grid-rows-[396px_220px_164px]">
            <div className="glass-card flex flex-col justify-between gap-10 px-8 pt-7 pb-6">
              <p className="text-[32px] leading-10 font-medium tracking-[-0.01em] text-navy">
                Zero Effort. Pure Intelligence
              </p>
              <p className="max-w-[217px] text-base leading-6 text-black/50">
                Where complex code meets autonomous execution.
              </p>
            </div>
            <div className="glass-card flex flex-col items-center justify-between gap-2 px-8 pt-7 pb-6">
              <p className="text-sm leading-7 text-navy/50">Trusted by</p>
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">12K</p>
              <Image src="/images/bento-avatars.webp" alt="" width={150} height={62} />
              <p className="text-[18px] leading-7 text-navy">Innovators</p>
            </div>
            <div className="glass-card flex items-center justify-center p-6">
              <Image src="/images/bento-generate.webp" alt="Generate" width={198} height={64} />
            </div>
          </div>

          {/* Right column */}
          <div className="grid gap-5 sm:grid-cols-3 lg:order-3 lg:grid-cols-1 lg:grid-rows-[157px_211px_412px]">
            <div className="glass-card flex items-center justify-center p-6">
              <Image src="/images/bento-toggle.webp" alt="" width={132} height={72} />
            </div>
            <div className="glass-card flex flex-col items-center justify-center gap-5 px-8 pt-7 pb-6">
              <p className="text-gradient-brand text-[62px] leading-[56px] font-semibold tracking-[-0.02em]">20M</p>
              <BracketLabel>Smart Operations</BracketLabel>
            </div>
            <div className="glass-card flex flex-col justify-between gap-6 px-8 pt-7 pb-6">
              <p className="text-xl leading-7 font-medium text-navy">Custom Software Solutions</p>
              <Image src="/images/bento-cluster.webp" alt="" width={206} height={282} className="self-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
