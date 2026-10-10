import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { EdgeCards } from "./EdgeCards";

export function VetrixEdge() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-16 pb-24 md:px-8">
      <BinaryPattern className="absolute -top-2 right-[-30px] w-44" />
      <BinaryPattern className="absolute bottom-0 -left-10 w-44" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-[42px]">
        <SectionHeading
          eyebrow="The Vetrix Edge"
          title="Complex Operations, Elegant Solutions"
          description="We combine powerful code, custom architecture, and built-in AI to transform how modern businesses operate, scale, and automate their daily workflows."
        />
        <EdgeCards />
      </div>
    </section>
  );
}
