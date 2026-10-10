import { Globe } from "../three/Globe";
import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { StatBadge } from "../ui/StatBadge";
import { Reveal } from "../motion/Reveal";
import type { Home } from "@/payload-types";

// Where each stat floats around the globe on desktop
const positions = [
  "lg:top-[200px] lg:left-0",
  "lg:top-[60px] lg:left-[277px]",
  "lg:top-[60px] lg:right-[277px]",
  "lg:top-[200px] lg:right-0",
];

export function ProvenImpact({ content }: { content: Home["impact"] }) {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-11 md:px-8">
      <BinaryPattern className="absolute -top-4 right-[-30px] w-48" />
      <BinaryPattern className="absolute top-[187px] -left-14 w-48" />
      <div className="relative mx-auto max-w-[1120px]">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />

        {/* Stats: scattered around the globe on desktop, a simple grid on small screens */}
        <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block lg:h-[300px]">
          {content.stats?.map((s, i) => (
            <Reveal key={s.id ?? s.label} delay={i * 120} className={`lg:absolute lg:w-[262px] ${positions[i % 4]}`}>
              <div className="stat-bob" style={{ animationDelay: `${i * -1.3}s` }}>
                <StatBadge value={s.value} label={s.label} className="stat-card" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Globe className="mx-auto -mt-6 max-w-[1430px] lg:-mt-[40px]" />
    </section>
  );
}
