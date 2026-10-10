import Image from "next/image";
import { Reveal } from "../motion/Reveal";
import { ScrollWords } from "../motion/ScrollWords";
import { BinaryPattern } from "../ui/BinaryPattern";
import { PillButton } from "../ui/PillButton";

const pills = [
  { label: "Custom CRMs", color: "#f97316" },
  { label: "Smart Automation", color: "#8b5cf6" },
  { label: "Scalable Code", color: "#22c55e" },
  { label: "Data Insights", color: "#3b82f6" },
  { label: "Increased Output", color: "#ef4444" },
  { label: "Super-Brain", color: "#eab308" },
  { label: "Style Variations", color: "#d946ef" },
];

const intro = [
  { text: "We're a passionate team of " },
  { text: "innovators obsessed with", highlight: true },
  { text: " using AI to streamline business operations. " },
  { text: "We believe", highlight: true },
  { text: " intelligent software can revolutionize how enterprises scale, " },
  { text: "making", highlight: true },
  { text: " custom automation and reliable systems " },
  { text: "faster and", highlight: true },
  { text: " more " },
  { text: "accessible", highlight: true },
];

function Spark({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" className="pill-spark">
      <path
        d="M8 0C8.6 4.6 11.4 7.4 16 8 11.4 8.6 8.6 11.4 8 16 7.4 11.4 4.6 8.6 0 8 4.6 7.4 7.4 4.6 8 0Z"
        fill={color}
      />
    </svg>
  );
}

/** Dashed connector under the pills, with light running along it and a cursor pointing at the result. */
function Connector() {
  const path = "M8 0 V30 a14 14 0 0 0 14 14 H538 a14 14 0 0 0 14 -14 V0";
  return (
    <div className="relative mx-auto hidden h-[110px] max-w-[560px] md:block" aria-hidden="true">
      <svg viewBox="0 0 560 60" className="absolute inset-x-0 top-0 w-full overflow-visible">
        <path d={path} fill="none" stroke="#3d4672" strokeWidth="1.2" strokeDasharray="7 7" />
        <path d={path} pathLength={100} fill="none" className="connector-run" />
        <path d="M280 8 V44" stroke="#7d86b8" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="280" cy="44" r="9" fill="#0d1636" stroke="#c9d6ff" strokeWidth="1.2" />
        <circle cx="280" cy="44" r="4" fill="#fff" className="connector-node" />
      </svg>
      <div className="connector-cursor absolute top-[48px] left-[calc(50%+2px)] flex items-start gap-1">
        <svg viewBox="0 0 24 24" className="w-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          <path d="M4 2l15 9-6.5 1.6L16 20l-3 1.4-3.4-7.4L4 18z" fill="#0a0f2c" stroke="#e6ecff" strokeWidth="1.2" />
        </svg>
        <span className="mt-5 rounded-full border border-white/25 bg-[#0b1430]/80 px-3 py-1 font-poppins text-[13px] text-white/85 backdrop-blur">
          You will access
        </span>
      </div>
    </div>
  );
}

export function AboutIntro() {
  return (
    <section className="bg-night-gradient relative isolate overflow-hidden px-4 pt-[105px] pb-24 md:min-h-[866px]">
      <Image
        src="/images/about-grid.webp"
        alt=""
        fill
        sizes="100vw"
        className="about-grid -z-10 object-cover opacity-50"
      />
      <div aria-hidden="true" className="about-scan pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/3" />
      <BinaryPattern tone="dark" className="absolute top-0 -left-4 w-40" />
      <BinaryPattern tone="dark" className="absolute top-0 right-[-40px] w-60 opacity-70" />
      <BinaryPattern tone="dark" className="absolute top-[683px] -left-6 w-40 opacity-70" />

      {/* Light source: a glowing dot with a beam falling from it */}
      <div
        aria-hidden="true"
        className="about-dot absolute top-[105px] left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand-bright"
      />
      <div
        aria-hidden="true"
        className="about-beam absolute top-[110px] left-1/2 -z-10 h-[300px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-bright/60 via-brand-bright/10 to-transparent"
      />
      <Image
        src="/images/about-light.webp"
        alt=""
        width={375}
        height={375}
        className="about-light pointer-events-none absolute top-[119px] left-1/2 -z-10 -translate-x-1/2 opacity-70 mix-blend-screen"
      />

      <div className="relative mx-auto flex max-w-[1014px] flex-col items-center gap-4 pt-[31px] text-center">
        <Reveal as="p" className="text-xl font-medium text-brand-bright">
          About Vetrix
        </Reveal>
        <div className="flex flex-col items-center gap-10">
          <ScrollWords parts={intro} className="text-[22px] leading-[1.55] md:text-[30px] md:leading-[48px]" />
          <Reveal delay={150}>
            <PillButton href="/about" className="!py-2 !px-4 text-[18px]">
              More About Us
            </PillButton>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto mt-[76px] max-w-[768px]">
        <ul className="flex flex-wrap justify-center gap-[18px] font-poppins">
          {pills.map((p, i) => (
            <Reveal
              as="li"
              key={p.label}
              delay={i * 80}
              className="about-pill flex h-[38px] items-center gap-3 rounded-full border border-[#393d64]/70 bg-[#091223] px-5 text-sm text-[#f4f7ff]"
            >
              <Spark color={p.color} />
              {p.label}
            </Reveal>
          ))}
        </ul>
        <Connector />
      </div>
    </section>
  );
}
