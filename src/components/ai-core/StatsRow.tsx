import { Reveal } from "../motion/Reveal";
import { StatBadge } from "../ui/StatBadge";

type Stat = { value: string; label: string; id?: string | null };

/** Four count-up numbers in frosted cards. */
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-auto mt-10 grid max-w-[1120px] grid-cols-2 gap-4 px-4 md:mt-[42px] md:px-8 lg:grid-cols-4 lg:gap-6 xl:px-0">
      {stats.map((s, i) => (
        <Reveal key={s.id ?? i} delay={i * 90}>
          <StatBadge value={s.value} label={s.label} className="stat-lift h-full max-sm:px-3 [&>span]:max-sm:h-auto [&>span]:max-sm:min-h-10 [&>span]:max-sm:py-1 [&>span]:max-sm:text-center [&>span]:max-sm:text-[13px] [&>span]:max-sm:leading-snug [&>span]:max-sm:whitespace-normal" />
        </Reveal>
      ))}
    </div>
  );
}
