import { Orb } from "../three/Orb";
import { VeMark } from "../ui/VeMark";

// Everything is laid out in the artwork's own 556 x 820 space so it scales as one piece
const W = 556;
const H = 820;
const C = { x: 278, y: 422 }; // centre of the orb socket
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const BINARY = "1001010110 010 001 10010 1101101 100011 0101 1001011 0111101 10001 1011 01110 0110 1001 ";

function FeatureIcon({ kind }: { kind: "flow" | "insight" }) {
  return (
    <span
      className={`ve-icon relative grid aspect-square w-[18%] place-items-center rounded-full ring-[5px] ring-white/70 ${
        kind === "flow"
          ? "bg-gradient-to-br from-[#2aa4ec] to-[#0a5fb0]"
          : "bg-gradient-to-br from-[#1b2668] to-[#060b33]"
      }`}
    >
      {kind === "flow" ? (
        <svg viewBox="0 0 24 24" className="w-[46%]" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="7" cy="5" r="2" />
          <circle cx="7" cy="19" r="2" />
          <circle cx="17" cy="8" r="2" />
          <path d="M7 7v10M17 10c0 4-10 3-10 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-[46%]" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
          <path
            d="M12 7.5c.4 2.4 1.9 3.9 4.5 4.5-2.6.6-4.1 2.1-4.5 4.5-.4-2.4-1.9-3.9-4.5-4.5 2.6-.6 4.1-2.1 4.5-4.5Z"
            fill="white"
            stroke="none"
          />
        </svg>
      )}
    </span>
  );
}

/** "The Intelligent Heart of Your Business" card, rebuilt from the artwork so every part is live. */
export function BentoHeart() {
  return (
    <div className="@container relative aspect-[556/820] w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="heart-panel" cx="50%" cy="100%" r="85%">
            <stop offset="0" stopColor="#2c3f8f" />
            <stop offset="0.55" stopColor="#0d1660" />
            <stop offset="1" stopColor="#050a45" />
          </radialGradient>
          <linearGradient id="heart-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dcecf8" />
            <stop offset="1" stopColor="#eef6fc" />
          </linearGradient>
          <linearGradient id="heart-band" gradientUnits="userSpaceOnUse" x1="0" y1="236" x2="0" y2="608">
            <stop offset="0" stopColor="#24357c" />
            <stop offset="0.43" stopColor="#24357c" />
            <stop offset="0.47" stopColor="#adbad3" />
            <stop offset="1" stopColor="#adbad3" />
          </linearGradient>
          <radialGradient id="heart-socket">
            <stop offset="0.6" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e3eefa" />
          </radialGradient>
          <path id="heart-ring" d={`M ${C.x} ${C.y - 172} a 172 172 0 1 1 -0.01 0`} />
        </defs>

        <rect x="0" y="0" width={W} height="395" rx="24" fill="url(#heart-panel)" />
        <rect x="0" y="415" width="263" height="405" rx="24" fill="url(#heart-card)" />
        <rect x="293" y="415" width="263" height="405" rx="24" fill="url(#heart-card)" />

        {/* Socket band with the binary ring turning inside it */}
        <circle cx={C.x} cy={C.y} r="187" fill="url(#heart-band)" />
        <g className="ve-binary-spin" style={{ transformOrigin: `${C.x}px ${C.y}px` }}>
          <text
            fontSize="13"
            letterSpacing="2.5"
            fill="#cfe0ff"
            fillOpacity="0.75"
            fontFamily="ui-monospace, monospace"
          >
            <textPath href="#heart-ring">{BINARY.repeat(2)}</textPath>
          </text>
        </g>
        <circle cx={C.x} cy={C.y} r="158" fill="url(#heart-socket)" />
        <circle cx={C.x} cy={C.y} r="150" className="ve-socket-pulse" fill="none" stroke="#7cc4ff" strokeWidth="2" />

        {/* Circuit traces on the two lower cards, with light travelling along them */}
        {[
          "M 0 455 H 22 a 10 10 0 0 1 10 10 V 548 H 64",
          `M ${W} 455 H ${W - 22} a 10 10 0 0 0 -10 10 V 548 H ${W - 64}`,
        ].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="#9fb3c8" strokeWidth="1.5" />
            <path
              d={d}
              pathLength={100}
              className="ve-trace"
              fill="none"
              stroke="#2aa4ec"
              strokeWidth="2.5"
              style={{ animationDelay: `${i * 1.4}s` }}
            />
            <circle cx={i ? W - 64 : 64} cy="548" r="6" fill={i ? "#7d86e8" : "#2aa4ec"} className="ve-node" />
            <circle
              cx={i ? W - 64 : 64}
              cy="455"
              r="5"
              fill="none"
              stroke={i ? "#7d86e8" : "#2aa4ec"}
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>

      {/* Top panel content */}
      <div className="absolute inset-x-0 top-[4.6%] flex flex-col items-center gap-[1.4cqw]">
        <VeMark className="w-[7cqw] text-white" />
        <h3 className="max-w-[80%] text-center text-[6.1cqw] leading-[1.32] font-semibold text-white">
          The Intelligent Heart of Your Business.
        </h3>
      </div>

      {/* Orb in the socket */}
      <div
        aria-hidden="true"
        className="ve-socket-glow pointer-events-none absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,196,255,0.45)_40%,transparent_70%)]"
        style={{ left: pct(C.x, W), top: pct(C.y, H), width: "58%" }}
      />
      {/* Same size and position as the orb in the artwork */}
      <div
        className="pointer-events-none absolute aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{ left: pct(C.x, W), top: pct(C.y, H), width: "44%" }}
      >
        <Orb className="h-full w-full" />
      </div>

      {/* Lower feature cards */}
      {[
        {
          kind: "flow" as const,
          left: 0,
          title: "Smart Workflows",
          body: "Explore multiple operational paths and automated decision-making",
        },
        {
          kind: "insight" as const,
          left: 293,
          title: "Predictive Insights",
          body: "Extract key data points and boost precision with deep analysis.",
        },
      ].map((f) => (
        <div
          key={f.title}
          className="absolute flex flex-col items-start gap-[1.6cqw] px-[5.6cqw]"
          style={{ left: pct(f.left, W), width: pct(263, W), top: pct(622, H) }}
        >
          <FeatureIcon kind={f.kind} />
          <p className="mt-[1cqw] text-[clamp(13px,3.3cqw,18px)] font-medium text-navy">{f.title}</p>
          <p className="text-[clamp(11px,2.55cqw,14px)] leading-[1.7] text-[#6b7590]">{f.body}</p>
        </div>
      ))}
    </div>
  );
}
