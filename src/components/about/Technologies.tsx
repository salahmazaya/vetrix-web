import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import type { About } from "@/payload-types";
import { mediaSrc } from "@/lib/cms";

/** Dark band with certification badges gliding past in an endless loop. */
export function Technologies({ content }: { content: About["technologies"] }) {
  const badges = (content.badges ?? []).flatMap((b) => {
    const img = mediaSrc(b.logo);
    return img ? [{ ...img, name: b.name, id: b.id }] : [];
  });
  // Repeat the set so the loop never shows a gap, then twice more for the seamless wrap
  const row = Array.from({ length: Math.max(2, Math.ceil(14 / Math.max(badges.length, 1))) }, () => badges).flat();
  return (
    <section className="bg-night-gradient relative overflow-hidden px-4 py-16 md:py-[60px]">
      <SectionHeading tone="dark" eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
      {badges.length > 0 && (
        <div className="marquee mx-auto mt-10 max-w-[820px]">
          <ul className="marquee-track flex w-max items-center gap-4">
            {[...row, ...row].map((b, i) => (
              <li key={i} aria-hidden={i >= row.length || undefined} className="marquee-item shrink-0">
                <Image src={b.src} alt={i < badges.length ? b.name : ""} width={b.width || 56} height={b.height || 56} className="size-[58px] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
