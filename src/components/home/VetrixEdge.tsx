import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { EdgeCards } from "./EdgeCards";
import type { Home } from "@/payload-types";

export function VetrixEdge({ content }: { content: Home["edge"] }) {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-16 pb-24 md:px-8">
      <BinaryPattern className="absolute -top-2 right-[-30px] w-44" />
      <BinaryPattern className="absolute bottom-0 -left-10 w-44" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-[42px]">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
        <EdgeCards cards={content.cards ?? []} />
      </div>
    </section>
  );
}
