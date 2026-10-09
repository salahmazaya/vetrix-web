"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "../three/useInView";

// Everything below is drawn in the diagram image's own pixel space (1120 x 692)
const HUB = { x: 558, y: 345 };
const STAGES = ["COLLECT", "NORMALIZE", "DENOISE", "TRANSFORM", "ROUTE", "ENRICH", "GOVERN"];
const STAGE_STEP = 1.6; // seconds each stage stays lit

// One stream per row of source tiles on the left, flowing into the hub
const INPUT_ROWS = [103, 164, 226, 287, 349, 411, 473, 535, 598];
// One stream per destination group on the right, flowing out of the hub
const OUTPUTS = [102, 270, 371, 473, 575];

// Rounded so server and browser render identical numbers
const round = (n: number) => Math.round(n * 100) / 100;

const inputPath = (y: number) => `M296 ${y} C ${370} ${y}, ${360} ${HUB.y}, ${428} ${HUB.y}`;
const outputPath = (y: number) => `M688 ${HUB.y} C ${770} ${HUB.y}, ${750} ${y}, ${832} ${y}`;

/** The Ve hub diagram, brought to life: data streams in from your apps, through Ve's stages, and out to your tools. */
export function ProcessDiagram() {
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
    <div ref={ref} className="[perspective:1600px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={stage}
        data-visible={inView}
        className="process-stage relative [transform-style:preserve-3d]"
      >
        <Image
          src="/images/process-diagram.webp"
          alt="Ve sits at the center of your stack: it collects, normalizes, enriches and routes data from your existing apps into reporting, AI search, insights and third-party tools."
          width={1120}
          height={692}
          className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]"
        />

        {/* Data streams and the light scanning the source apps */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1120 692"
          className="pointer-events-none absolute inset-0 h-full w-full [transform:translateZ(20px)]"
        >
          <defs>
            <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3fb4ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#3fb4ff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#3fb4ff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="sources">
              <rect x="40" y="72" width="254" height="550" rx="10" />
            </clipPath>
          </defs>

          <g clipPath="url(#sources)">
            <rect className="process-scan" x="40" y="-60" width="254" height="120" fill="url(#scan)" />
          </g>

          {INPUT_ROWS.map((y, i) => (
            <g key={`in-${y}`}>
              <path d={inputPath(y)} className="process-flow-base" />
              <path
                d={inputPath(y)}
                pathLength={1000}
                className="process-flow-pulse"
                style={{ animationDelay: `${(i * 0.37) % 2.6}s` }}
              />
              <circle cx="296" cy={y} r="2.2" className="process-node" style={{ animationDelay: `${(i * 0.37) % 2.6}s` }} />
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
              <circle cx="832" cy={y} r="2.6" className="process-node" style={{ animationDelay: `${1.3 + i * 0.45 + 2.2}s` }} />
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
            {STAGES.map((_, i) => {
              const a = ((i / STAGES.length) * 360 - 90 + 360 / STAGES.length / 2) * (Math.PI / 180);
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
              {STAGES.map((word, i) => (
                <textPath
                  key={word}
                  href="#stage-path"
                  startOffset={`${(i / STAGES.length) * 100 + 100 / STAGES.length / 2}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="process-stage-word"
                  style={{ animationDelay: `${i * STAGE_STEP}s`, animationDuration: `${STAGES.length * STAGE_STEP}s` }}
                >
                  {word}
                </textPath>
              ))}
            </text>
          </g>

          {/* Outer orbit with a comet of light going the other way */}
          <g className="process-spin-reverse">
            <circle r="146" fill="none" stroke="#5fb8ff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 7" />
            <path d="M 146 0 A 146 146 0 0 1 0 146" fill="none" stroke="url(#comet)" strokeWidth="2" strokeLinecap="round" />
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
      </div>
    </div>
  );
}
