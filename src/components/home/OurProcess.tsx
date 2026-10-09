import Image from "next/image";
import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";

export function OurProcess() {
  return (
    <section className="bg-night-gradient relative overflow-hidden px-4 pt-[54px] pb-24 md:px-8 lg:min-h-[1018px]">
      <BinaryPattern tone="dark" className="absolute top-0 -left-2 w-40" />
      <BinaryPattern tone="dark" className="absolute -top-10 left-[286px] w-56 opacity-50" />
      <BinaryPattern tone="dark" className="absolute -top-10 right-[-50px] w-56 opacity-70" />
      <BinaryPattern tone="dark" className="absolute bottom-10 -left-16 w-56 opacity-60" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-[27px]">
        <SectionHeading
          tone="dark"
          eyebrow="Our Process"
          title="From Logic to Launch"
          description="We don't just write code; we build the future of your operations. Our step-by-step process ensures your custom CRM, website, or automation tool is built to last."
        />
        <div className="group relative [perspective:1600px]">
          <Image
            src="/images/process-diagram.webp"
            alt="Ve sits at the center of your stack: it collects, normalizes, enriches and routes data from your existing apps into reporting, AI search, insights and third-party tools."
            width={1120}
            height={692}
            className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] transition-transform duration-700 ease-out group-hover:[transform:rotateX(6deg)]"
          />
          {/* Pulsing ring over the Ve hub */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-brand-bright/40 [animation-duration:3s]"
          />
        </div>
      </div>
    </section>
  );
}
