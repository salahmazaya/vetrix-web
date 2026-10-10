import { VeMark } from "../ui/VeMark";

const Sparkles = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M10 3c.6 4 2.9 6.4 7 7-4.1.6-6.4 3-7 7-.6-4-2.9-6.4-7-7 4.1-.6 6.4-3 7-7Z" />
    <path d="M18.5 2c.3 1.7 1.2 2.6 2.9 2.9-1.7.3-2.6 1.2-2.9 2.9-.3-1.7-1.2-2.6-2.9-2.9 1.7-.3 2.6-1.2 2.9-2.9ZM18 15.5c.2 1.2.9 1.9 2.1 2.1-1.2.2-1.9.9-2.1 2.1-.2-1.2-.9-1.9-2.1-2.1 1.2-.2 1.9-.9 2.1-2.1Z" />
  </svg>
);

/** AI switch that flips itself on and off. */
export function AiToggle() {
  return (
    <div
      className="ai-toggle relative h-[72px] w-[132px] rounded-full border border-navy/40 bg-white/40 p-[7px]"
      aria-hidden="true"
    >
      <span className="ai-toggle-fill absolute inset-[7px] rounded-full bg-gradient-to-r from-brand-bright/0 to-brand-bright/60" />
      <span className="ai-toggle-knob relative grid size-[58px] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#2a3a8f,#070c3f_70%)] text-white shadow-[0_8px_18px_rgba(5,10,60,0.35)]">
        <Sparkles className="ai-twinkle w-7" />
      </span>
    </div>
  );
}

/** Glassy "Generate" button with a light sweeping across it and a cursor that clicks it. */
export function GenerateButton() {
  return (
    <div className="relative rounded-full bg-white/60 p-[7px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9),0_10px_30px_-10px_rgba(0,141,210,0.5)]">
      <span className="generate-btn relative flex h-[50px] items-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-[#2aa9ef] to-[#0a7cd0] px-7 text-[26px] text-white">
        <svg viewBox="0 0 24 24" className="w-7" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="5" width="15" height="15" rx="3" />
          <path d="m3 16 4-4 4 4 3-3 4 4" strokeLinejoin="round" />
          <path
            d="M20 1.5c.2 1.3.9 2 2.2 2.2-1.3.2-2 .9-2.2 2.2-.2-1.3-.9-2-2.2-2.2 1.3-.2 2-.9 2.2-2.2Z"
            fill="white"
            stroke="none"
          />
        </svg>
        Generate
        <span className="generate-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/35 blur-[2px]" />
      </span>
      <svg
        viewBox="0 0 24 24"
        className="generate-cursor absolute -right-3 -bottom-4 w-6 drop-shadow"
        aria-hidden="true"
      >
        <path d="M4 2l15 9-6.5 1.6L16 20l-3 1.4-3.4-7.4L4 18z" fill="#0a0f2c" stroke="white" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

type Chip = {
  x: number;
  y: number;
  rotate?: number;
  delay: number;
  children: React.ReactNode;
  className: string;
};

// Positions follow the cluster in the artwork (206 x 282 box)
const chips: Chip[] = [
  {
    x: 55,
    y: 56,
    delay: 0,
    className: "size-[38px] rounded-full bg-gradient-to-br from-[#2aa4ec] to-[#0a5fb0] grid place-items-center",
    children: <VeMark className="w-[22px] text-white" />,
  },
  {
    x: 140,
    y: 70,
    rotate: -20,
    delay: 0.4,
    className: "h-[38px] w-[124px] rounded-full bg-[#dfe7ef] grid place-items-center text-[17px] text-navy",
    children: "14 days trial",
  },
  {
    x: 48,
    y: 152,
    rotate: -55,
    delay: 0.8,
    className:
      "h-[38px] w-[74px] rounded-full bg-[#dfe7ef] flex items-center justify-center gap-2 text-[17px] text-navy",
    children: (
      <>
        <span className="size-2 rounded-full bg-brand-bright" />
        Run
      </>
    ),
  },
  {
    x: 122,
    y: 170,
    delay: 1.2,
    className: "size-[56px] rounded-full bg-gradient-to-br from-[#3fb0f0] to-[#0a6cc0] grid place-items-center",
    children: (
      <svg viewBox="0 0 24 24" className="w-6" fill="white" aria-hidden="true">
        <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM3 7h18v3H3zM11 7h2v14h-2zM12 7c-1-3-5-4-5-1.5S10.5 7 12 7Zm0 0c1-3 5-4 5-1.5S13.5 7 12 7Z" />
      </svg>
    ),
  },
  {
    x: 182,
    y: 180,
    delay: 0.2,
    className:
      "h-[198px] w-[46px] rounded-full bg-[#dfe7ef] flex flex-col-reverse items-center justify-center gap-2 text-[15px] text-navy [writing-mode:vertical-rl] rotate-180",
    children: (
      <>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-navy" />
          CRM
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#f5a35c]" />
          API
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-sky" />
          WEB
        </span>
      </>
    ),
  },
  {
    x: 104,
    y: 232,
    rotate: 40,
    delay: 1,
    className: "h-[40px] w-[76px] rounded-full bg-[#dfe7ef] flex items-center justify-around px-2",
    children: (
      <>
        <span className="size-4 rounded-full bg-sky/80" />
        <span className="grid size-5 place-items-center rounded-full bg-[#ff7a45] text-[10px] text-white">⚡</span>
      </>
    ),
  },
  {
    x: 36,
    y: 251,
    delay: 0.6,
    className:
      "size-[56px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#2a3a8f,#070c3f_70%)] grid place-items-center",
    children: (
      <svg viewBox="0 0 24 24" className="w-6" fill="white" aria-hidden="true">
        <path d="M8 4h8l1.5 2H20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2.5z" />
        <circle cx="12" cy="13" r="3.6" fill="#0b1250" />
      </svg>
    ),
  },
];

/** The floating cluster of chips (Run, 14 days trial, CRM / API / WEB...), each drifting on its own. */
export function ChipCluster() {
  return (
    <div className="relative h-[282px] w-[206px]" aria-hidden="true">
      {chips.map((c, i) => (
        <div
          key={i}
          className="chip-float absolute"
          style={
            {
              left: c.x,
              top: c.y,
              "--r": `${c.rotate ?? 0}deg`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${5 + (i % 3)}s`,
            } as React.CSSProperties
          }
        >
          <div
            className={`-translate-x-1/2 -translate-y-1/2 shadow-[0_6px_14px_-6px_rgba(10,30,80,0.35)] ${c.className}`}
          >
            {c.children}
          </div>
        </div>
      ))}
    </div>
  );
}
