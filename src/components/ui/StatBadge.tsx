import { CountUp } from "../motion/CountUp";

type StatBadgeProps = {
  value: string;
  label: string;
  className?: string;
};

/** Gradient number with the bracketed label underneath (Proven Impact, AI Core stats, bento). */
export function StatBadge({ value, label, className = "" }: StatBadgeProps) {
  return (
    <div className={`glass-card flex flex-col items-center justify-center gap-5 px-6 pt-7 pb-6 ${className}`}>
      <p className="text-gradient-brand text-[40px] font-semibold leading-[56px] tracking-[-0.02em]">
        <CountUp value={value} />
      </p>
      <BracketLabel>{label}</BracketLabel>
    </div>
  );
}

export function BracketLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex h-10 items-center bg-gradient-to-r from-brand-bright/10 to-brand-bright/20 px-3 text-[18px] leading-7 whitespace-nowrap text-navy">
      <Bracket className="absolute top-0 -left-[5px]" />
      {children}
      <Bracket className="absolute top-0 -right-[5px] -scale-x-100" />
    </span>
  );
}

function Bracket({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="40" viewBox="0 0 10 40" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="2" height="34" fill="#008dd2" />
      <rect x="0" y="0" width="10" height="3" rx="1.5" fill="#008dd2" />
      <rect x="0" y="37" width="10" height="3" rx="1.5" fill="#008dd2" />
    </svg>
  );
}
