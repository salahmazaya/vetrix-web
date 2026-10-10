import { Globe } from "../three/Globe";
import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { StatBadge } from "../ui/StatBadge";
import { Reveal } from "../motion/Reveal";

const stats = [
  { value: "85%", label: "Workflows Automated", position: "lg:top-[200px] lg:left-0" },
  { value: "4x", label: "Operational Speedup", position: "lg:top-[60px] lg:left-[277px]" },
  { value: "99.9%", label: "System Reliability", position: "lg:top-[60px] lg:right-[277px]" },
  { value: "150+", label: "Custom Systems Delivered", position: "lg:top-[200px] lg:right-0" },
];

export function ProvenImpact() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-11 md:px-8">
      <BinaryPattern className="absolute -top-4 right-[-30px] w-48" />
      <BinaryPattern className="absolute top-[187px] -left-14 w-48" />
      <div className="relative mx-auto max-w-[1120px]">
        <SectionHeading
          eyebrow="Proven Impact"
          title="Results That Speak for Themselves"
          description="Numbers speak louder than words. Discover the measurable difference our intelligent systems and scalable architectures make for modern businesses."
        />

        {/* Stats: scattered around the globe on desktop, a simple grid on small screens */}
        <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block lg:h-[300px]">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className={`lg:absolute lg:w-[262px] ${s.position}`}>
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
