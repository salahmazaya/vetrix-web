import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { ProcessDiagram, type ProcessTile } from "./ProcessDiagram";
import { mediaSrc } from "@/lib/cms";
import type { Media } from "@/payload-types";
import type { SiteHome } from "@/lib/site-content";

type Tile = { name: string; logo: number | Media; highlighted?: boolean | null };

const toTile = (t: Tile): ProcessTile => ({ name: t.name, src: mediaSrc(t.logo)?.src ?? "", on: t.highlighted ?? false });

export function OurProcess({ content }: { content: SiteHome["process"] }) {
  return (
    <section className="bg-night-gradient relative overflow-hidden px-4 pt-[54px] pb-24 md:px-8 lg:min-h-[1018px]">
      <BinaryPattern tone="dark" className="absolute top-0 -left-2 w-40" />
      <BinaryPattern tone="dark" className="absolute -top-10 left-[286px] w-56 opacity-50" />
      <BinaryPattern tone="dark" className="absolute -top-10 right-[-50px] w-56 opacity-70" />
      <BinaryPattern tone="dark" className="absolute bottom-10 -left-16 w-56 opacity-60" />
      <div className="relative mx-auto flex w-full min-w-0 max-w-[1120px] flex-col gap-[27px]">
        <SectionHeading
          tone="dark"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description ?? undefined}
        />
        <ProcessDiagram
          content={{
            stages: content.stages?.map((s) => s.label) ?? [],
            categories: content.categories?.map((c) => c.label) ?? [],
            sources: content.sources?.map(toTile) ?? [],
            reef: { title: content.reef.title, chips: content.reef.chips?.map((c) => c.label) ?? [] },
            toolsTitle: content.toolsTitle,
            groups: content.groups?.map((g) => ({ label: g.label, tiles: g.tiles?.map(toTile) ?? [] })) ?? [],
          }}
        />
      </div>
    </section>
  );
}
