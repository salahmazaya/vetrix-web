import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { ProcessDiagram } from "./ProcessDiagram";

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
        <ProcessDiagram />
      </div>
    </section>
  );
}
