import Image from "next/image";
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

function Spark({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 0C8.6 4.6 11.4 7.4 16 8 11.4 8.6 8.6 11.4 8 16 7.4 11.4 4.6 8.6 0 8 4.6 7.4 7.4 4.6 8 0Z" fill={color} />
    </svg>
  );
}

const Hi = ({ children }: { children: React.ReactNode }) => <span className="text-sky-soft">{children}</span>;

export function AboutIntro() {
  return (
    <section className="bg-night-gradient relative isolate overflow-hidden px-4 pt-[105px] pb-24 md:min-h-[866px]">
      <Image
        src="/images/about-grid.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-50"
      />
      <BinaryPattern tone="dark" className="absolute top-0 -left-4 w-40" />
      <BinaryPattern tone="dark" className="absolute top-0 right-[-40px] w-60 opacity-70" />
      <BinaryPattern tone="dark" className="absolute top-[683px] -left-6 w-40 opacity-70" />

      <div aria-hidden="true" className="absolute top-[105px] left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand-bright" />
      <Image
        src="/images/about-light.webp"
        alt=""
        width={375}
        height={375}
        className="pointer-events-none absolute top-[119px] left-1/2 -z-10 -translate-x-1/2 opacity-70 mix-blend-screen"
      />

      <div className="relative mx-auto flex max-w-[1014px] flex-col items-center gap-4 pt-[31px] text-center">
        <p className="text-xl font-medium text-brand-bright">About Vetrix</p>
        <div className="flex flex-col items-center gap-10">
          <p className="text-[22px] leading-[1.55] text-white md:text-[30px] md:leading-[48px]">
            We&apos;re a passionate team of <Hi>innovators obsessed with</Hi> using AI to streamline business
            operations. <Hi>We believe</Hi> intelligent software can revolutionize how enterprises scale,{" "}
            <Hi>making</Hi> custom automation and reliable systems <Hi>faster and</Hi> more <Hi>accessible</Hi>
          </p>
          <PillButton href="/about" className="!py-2 !px-4 text-[18px]">
            More About Us
          </PillButton>
        </div>
      </div>

      <div className="relative mx-auto mt-[76px] max-w-[768px]">
        <ul className="flex flex-wrap justify-center gap-[18px] font-poppins">
          {pills.map((p) => (
            <li
              key={p.label}
              className="flex h-[38px] items-center gap-3 rounded-full border border-[#393d64]/70 bg-[#091223] px-5 text-sm text-[#f4f7ff]"
            >
              <Spark color={p.color} />
              {p.label}
            </li>
          ))}
        </ul>
        <div className="relative mx-auto hidden max-w-[560px] md:block">
          <Image src="/images/about-connector.webp" alt="" width={560} height={97} className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
