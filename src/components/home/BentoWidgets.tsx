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
  /** Centre and size in the 220 x 266 artwork box */
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
  delay: number;
  children: React.ReactNode;
  className: string;
};

/** Artwork pixels to container units, so the cluster shrinks with its card */
const u = (n: number) => `${((n / 220) * 100).toFixed(3)}cqw`;

const pill = "rounded-full bg-[#e4ecf4] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_-8px_rgba(10,30,80,0.35)]";
const dot = { width: u(8), height: u(8) };

// Positions follow the cluster in the Figma card
const chips: Chip[] = [
  {
    x: 60,
    y: 27,
    w: 38,
    h: 38,
    delay: 0,
    className:
      "rounded-full bg-[radial-gradient(circle_at_35%_30%,#3fb6f2,#0a5fb0_75%)] grid place-items-center shadow-[0_6px_14px_-6px_rgba(10,60,140,0.6)]",
    children: <VeMark className="w-[58%] text-white" />,
  },
  {
    x: 158,
    y: 40,
    w: 108,
    h: 40,
    rotate: -22,
    delay: 0.4,
    className: `${pill} grid place-items-center text-navy`,
    children: <span style={{ fontSize: u(16) }}>14 days trial</span>,
  },
  {
    x: 52,
    y: 133,
    w: 78,
    h: 38,
    rotate: -60,
    delay: 0.8,
    className: `${pill} flex items-center justify-center text-navy`,
    children: (
      <span className="flex items-center" style={{ gap: u(8), fontSize: u(16) }}>
        <span className="rounded-full bg-brand-bright" style={dot} />
        Run
      </span>
    ),
  },
  {
    x: 125,
    y: 146,
    w: 56,
    h: 56,
    delay: 1.2,
    className:
      "rounded-full bg-[radial-gradient(circle_at_35%_30%,#4cc0f5,#0a6cc0_75%)] grid place-items-center shadow-[0_8px_18px_-6px_rgba(10,90,180,0.6)]",
    children: (
      <svg viewBox="0 0 24 24" className="w-[44%]" fill="white" aria-hidden="true">
        <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM3 7h18v3H3zM11 7h2v14h-2zM12 7c-1-3-5-4-5-1.5S10.5 7 12 7Zm0 0c1-3 5-4 5-1.5S13.5 7 12 7Z" />
      </svg>
    ),
  },
  {
    // Drawn as a horizontal pill and turned upright, so CRM sits at the bottom
    x: 192,
    y: 160,
    w: 204,
    h: 48,
    rotate: -90,
    delay: 0.2,
    className: `${pill} flex items-center justify-center text-navy`,
    children: (
      <span className="flex items-center" style={{ gap: u(14), fontSize: u(15) }}>
        {[
          ["CRM", "bg-navy"],
          ["API", "bg-[#f5a35c]"],
          ["WEB", "bg-sky"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center" style={{ gap: u(6) }}>
            <span className={`rounded-full ${color}`} style={dot} />
            {label}
          </span>
        ))}
      </span>
    ),
  },
  {
    x: 106,
    y: 211,
    w: 70,
    h: 36,
    rotate: 45,
    delay: 1,
    className: `${pill} flex items-center justify-between`,
    children: (
      <>
        <span
          className="ml-[14%] rounded-full bg-sky/80 shadow-[0_0_0_3px_rgba(110,190,240,0.3)]"
          style={{ width: u(12), height: u(12) }}
        />
        <span
          className="mr-[10%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb08a,#ff6a3d_70%)] text-white"
          style={{ width: u(22), height: u(22), fontSize: u(11) }}
        >
          ⚡
        </span>
      </>
    ),
  },
  {
    x: 38,
    y: 226,
    w: 56,
    h: 56,
    delay: 0.6,
    className:
      "rounded-full bg-[radial-gradient(circle_at_35%_30%,#2a3a8f,#070c3f_70%)] grid place-items-center shadow-[0_0_0_4px_rgba(255,255,255,0.6),0_10px_20px_-6px_rgba(5,10,60,0.5)]",
    children: (
      <svg viewBox="0 0 24 24" className="w-[42%]" fill="white" aria-hidden="true">
        <path d="M8 4h8l1.5 2H20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2.5z" />
        <circle cx="12" cy="13" r="3.6" fill="#0b1250" />
      </svg>
    ),
  },
];

/** The floating cluster of chips (Run, 14 days trial, CRM / API / WEB...), each drifting on its own. */
export function ChipCluster() {
  return (
    <div className="@container relative aspect-[220/266] w-full max-w-[220px]" aria-hidden="true">
      {chips.map((c, i) => (
        <div
          key={i}
          className="chip-float absolute"
          style={{
            left: `${(c.x / 220) * 100}%`,
            top: `${(c.y / 266) * 100}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        >
          <div
            className={c.className}
            style={{
              width: u(c.w),
              height: u(c.h),
              transform: `translate(-50%, -50%) rotate(${c.rotate ?? 0}deg)`,
            }}
          >
            {c.children}
          </div>
        </div>
      ))}
    </div>
  );
}
