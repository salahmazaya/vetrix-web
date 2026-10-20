"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useInView } from "../three/useInView";
import { localeFromPath } from "@/lib/i18n";
import { copyFor } from "@/lib/ui-copy";

// Everything is laid out in the original artwork's pixel space (1120 x 692) and scaled as one piece
const W = 1120;
const H = 692;
const HUB = { x: 558, y: 345 };
const STAGE_STEP = 1.6; // seconds each stage stays lit

const x = (v: number) => `${(v / W) * 100}%`;
const y = (v: number) => `${(v / H) * 100}%`;

// Source apps on the left: 9 rows x 3 columns
const TILE_COLUMNS = [41, 128, 215];
const TILE_ROWS = Array.from({ length: 9 }, (_, i) => 74 + Math.round(i * 61.75));
const CATEGORY_Y = [140, 275, 408, 535];

// Destination groups inside the tools panel
const GROUP_Y = [270, 371, 473, 575];
const GROUP_TILE_X = [853, 936, 1018];

export type ProcessTile = { name: string; src: string; on: boolean };
export type ProcessContent = {
  stages: string[];
  categories: string[];
  /** 27 tiles, row by row */
  sources: ProcessTile[];
  reef: { title: string; chips: string[] };
  toolsTitle: string;
  groups: { label: string; tiles: ProcessTile[] }[];
};

// Streams: one per source row into the hub, one per destination out of it
const INPUT_ROWS = TILE_ROWS.map((t) => t + 26);
const OUTPUTS = [102, ...GROUP_Y];

// Rounded so server and browser render identical numbers
const round = (n: number) => Math.round(n * 100) / 100;

const inputPath = (y: number) => `M296 ${y} C ${370} ${y}, ${360} ${HUB.y}, ${428} ${HUB.y}`;
const outputPath = (y: number) => `M688 ${HUB.y} C ${770} ${HUB.y}, ${750} ${y}, ${832} ${y}`;

function Logo({ src, name }: ProcessTile) {
  return (
    <Image
      src={src}
      alt={name}
      width={64}
      height={40}
      className="process-logo h-auto max-h-[62%] w-auto max-w-[74%] object-contain"
    />
  );
}

/** The Ve hub diagram, built from real elements: data streams in from your apps, through Ve, and out to your tools. */
export function ProcessDiagram({ content }: { content: ProcessContent }) {
  const { stages, groups } = content;
  const copy = copyFor(localeFromPath(usePathname()));
  const { ref, inView } = useInView<HTMLDivElement>();
  const stage = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 6}deg`);
  };
  const onLeave = () => {
    stage.current?.style.setProperty("--rx", "0deg");
    stage.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div dir="ltr" className="process-diagram w-full min-w-0">
      <div ref={ref} className="w-full min-w-0 [perspective:1600px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div
          ref={stage}
          data-visible={inView}
          role="img"
          aria-label={copy.process}
          className="process-stage @container relative aspect-[1120/692] w-full [transform-style:preserve-3d]"
        >
          {/* Backdrop: soft glow and faint orbit rings behind the hub */}
          <div aria-hidden="true" className="process-backdrop absolute inset-0 rounded-[3cqw]" />

          {/* Source categories */}
          {content.categories.map((label, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[0.95cqw] font-medium tracking-[0.28em] whitespace-nowrap text-[#41557c] uppercase"
              style={{ left: x(17), top: y(CATEGORY_Y[i % 4]) }}
            >
              {label}
            </span>
          ))}

          {/* Source app tiles */}
          {TILE_ROWS.flatMap((ty, row) =>
            TILE_COLUMNS.map((tx, col) => {
              const t = content.sources[row * 3 + col];
              if (!t) return null;
              return (
                <div
                  key={`${row}-${col}`}
                  data-on={t.on}
                  className="process-tile-live group/tile absolute grid place-items-center rounded-[0.6cqw]"
                  style={
                    {
                      left: x(tx),
                      top: y(ty),
                      width: x(78),
                      height: y(52),
                      "--delay": `${((row * 7 + col * 11) % 26) * 0.2}s`,
                      "--appear": `${row * 60 + col * 40}ms`,
                    } as React.CSSProperties
                  }
                >
                  <span className="process-tile-dot absolute top-[0.35cqw] left-1/2 size-[0.32cqw] -translate-x-1/2 rounded-full" />
                  <Logo {...t} />
                </div>
              );
            }),
          )}

          {/* Data streams */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 h-full w-full [transform:translateZ(20px)]"
          >
            {INPUT_ROWS.map((y, i) => (
              <g key={`in-${y}`}>
                <path d={inputPath(y)} className="process-flow-base" />
                <path
                  d={inputPath(y)}
                  pathLength={1000}
                  className="process-flow-pulse"
                  style={{ animationDelay: `${(i * 0.37) % 2.6}s` }}
                />
                <circle
                  cx="296"
                  cy={y}
                  r="2.2"
                  className="process-node"
                  style={{ animationDelay: `${(i * 0.37) % 2.6}s` }}
                />
              </g>
            ))}
            {OUTPUTS.map((y, i) => (
              <g key={`out-${y}`}>
                <path d={outputPath(y)} className="process-flow-base" />
                <path
                  d={outputPath(y)}
                  pathLength={1000}
                  className="process-flow-pulse process-flow-out"
                  style={{ animationDelay: `${1.3 + i * 0.45}s` }}
                />
                <circle
                  cx="832"
                  cy={y}
                  r="2.6"
                  className="process-node"
                  style={{ animationDelay: `${1.3 + i * 0.45 + 2.2}s` }}
                />
              </g>
            ))}
          </svg>

          {/* The Ve hub, rebuilt so its rings can turn and its stages light up in order */}
          <svg
            aria-hidden="true"
            viewBox="-160 -160 320 320"
            className="pointer-events-none absolute [transform:translateZ(60px)]"
            style={{
              left: `${((HUB.x - 160) / 1120) * 100}%`,
              top: `${((HUB.y - 160) / 692) * 100}%`,
              width: `${(320 / 1120) * 100}%`,
              height: `${(320 / 692) * 100}%`,
            }}
          >
            <defs>
              <radialGradient id="hub-cover">
                <stop offset="0.8" stopColor="#0a1528" stopOpacity="1" />
                <stop offset="1" stopColor="#0a1528" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hub-band">
                <stop offset="0.55" stopColor="#0d2547" />
                <stop offset="0.85" stopColor="#123766" />
                <stop offset="1" stopColor="#0b1e3a" />
              </radialGradient>
              <linearGradient id="comet" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5fd0ff" stopOpacity="0" />
                <stop offset="1" stopColor="#9fe3ff" stopOpacity="1" />
              </linearGradient>
              <path id="stage-path" d="M 0 -112 A 112 112 0 1 1 -0.01 -112" />
              <clipPath id="core-clip">
                <circle r="74" />
              </clipPath>
            </defs>

            {/* Hide the flat ring baked into the artwork */}
            <circle r="158" fill="url(#hub-cover)" />

            {/* Expanding pulse */}
            <circle r="132" className="process-pulse" />

            {/* Stage band with its words, turning slowly */}
            <g className="process-spin-slow">
              <circle r="112" fill="none" stroke="url(#hub-band)" strokeWidth="44" />
              <circle r="134" fill="none" stroke="#3a8ee0" strokeOpacity="0.35" strokeWidth="1" />
              <circle r="90" fill="none" stroke="#3a8ee0" strokeOpacity="0.35" strokeWidth="1" />
              {stages.map((_, i) => {
                const a = ((i / stages.length) * 360 - 90 + 360 / stages.length / 2) * (Math.PI / 180);
                return (
                  <line
                    key={i}
                    x1={round(Math.cos(a) * 91)}
                    y1={round(Math.sin(a) * 91)}
                    x2={round(Math.cos(a) * 133)}
                    y2={round(Math.sin(a) * 133)}
                    stroke="#3a8ee0"
                    strokeOpacity="0.25"
                  />
                );
              })}
              <text className="process-stage-text" fontSize="11" letterSpacing="1.5">
                {stages.map((word, i) => (
                  <textPath
                    key={i}
                    href="#stage-path"
                    startOffset={`${(i / stages.length) * 100 + 100 / stages.length / 2}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="process-stage-word"
                    style={{
                      animationDelay: `${i * STAGE_STEP}s`,
                      animationDuration: `${stages.length * STAGE_STEP}s`,
                    }}
                  >
                    {word}
                  </textPath>
                ))}
              </text>
            </g>

            {/* Outer orbit with a comet of light going the other way */}
            <g className="process-spin-reverse">
              <circle r="146" fill="none" stroke="#5fb8ff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 7" />
              <path
                d="M 146 0 A 146 146 0 0 1 0 146"
                fill="none"
                stroke="url(#comet)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="0" cy="146" r="3" fill="#bdeeff" className="process-glow" />
            </g>

            {/* Ve core from the artwork, breathing */}
            <circle r="80" className="process-core-glow" />
            <image
              href="/images/process-core.webp"
              x="-76"
              y="-76"
              width="152"
              height="152"
              clipPath="url(#core-clip)"
            />
            <circle r="74" fill="none" stroke="#5fb8ff" strokeOpacity="0.5" strokeWidth="1" />
          </svg>

          {/* Reef panel */}
          <div
            className="process-panel-live absolute flex flex-col overflow-hidden rounded-[0.8cqw]"
            style={
              { left: x(834), top: y(31), width: x(279), height: y(140), "--delay": "1.3s" } as React.CSSProperties
            }
          >
            <p className="grid h-[27%] place-items-center border-b border-[#2c5d9c]/60 bg-[#10223f]/80 text-[1.25cqw] text-white/90">
              {content.reef.title}
            </p>
            <div className="grid flex-1 grid-cols-2 gap-[0.8cqw] p-[0.8cqw]">
              {content.reef.chips.map((label, i) => (
                <span
                  key={i}
                  className={`process-chip grid place-items-center rounded-[0.5cqw] border border-white/8 bg-[#0d1628] text-[1.05cqw] ${
                    i % 2 ? "text-white/70" : "text-white"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          {[907, 1040].map((lx) => (
            <span
              key={lx}
              className="process-link absolute w-[0.2cqw] -translate-x-1/2"
              style={{ left: x(lx), top: y(172), height: y(28) }}
            />
          ))}

          {/* Third party tools panel */}
          <div
            className="process-panel-live absolute rounded-[0.8cqw]"
            style={
              { left: x(834), top: y(200), width: x(279), height: y(461), "--delay": "1.75s" } as React.CSSProperties
            }
          >
            <p className="grid h-[8.5%] place-items-center rounded-t-[0.8cqw] border-b border-[#2c5d9c]/60 bg-[#10223f]/80 text-[1.25cqw] text-white/90">
              {content.toolsTitle}
            </p>
          </div>
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {GROUP_Y.slice(0, groups.length).map((gy) => (
              <path
                key={gy}
                d={`M891 ${gy + 21} V${gy} H1056 V${gy + 21} M974 ${gy} V${gy + 21}`}
                fill="none"
                stroke="#2b3b58"
                strokeWidth="1.2"
              />
            ))}
          </svg>
          {groups.map((g, gi) => (
            <div key={gi}>
              <span
                className="process-group-label absolute -translate-x-1/2 -translate-y-1/2 rounded-[0.4cqw] border border-[#5a7fae]/70 bg-[#0c1526] px-[0.8cqw] py-[0.15cqw] text-[1.05cqw] whitespace-nowrap text-white"
                style={{ left: x(974), top: y(GROUP_Y[gi]), "--delay": `${2.2 + gi * 0.45}s` } as React.CSSProperties}
              >
                {g.label}
              </span>
              {g.tiles.map((t, ti) => (
                <div
                  key={ti}
                  data-on={t.on}
                  className="process-tile-live absolute grid place-items-center rounded-[0.6cqw]"
                  style={
                    {
                      left: x(GROUP_TILE_X[ti]),
                      top: y(GROUP_Y[gi] + 21),
                      width: x(76),
                      height: y(45),
                      "--delay": `${2.2 + gi * 0.45 + ti * 0.15}s`,
                      "--appear": `${600 + gi * 90 + ti * 40}ms`,
                    } as React.CSSProperties
                  }
                >
                  <Logo {...t} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
