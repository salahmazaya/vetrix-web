"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeFromPath } from "@/lib/i18n";
import { copyFor } from "@/lib/ui-copy";
import {
  LOGO_E_DOT,
  LOGO_E_SWOOSH,
  LOGO_I_DOT,
  LOGO_LETTERS,
  LOGO_TAGLINE,
  LOGO_TM,
} from "../ui/logo-paths";

const MIN_SHOW_MS = 2600; // long enough for the logo to finish drawing
const MAX_WAIT_MS = 6000; // on a slow connection, open anyway; the page keeps loading behind
const EXIT_MS = 1100;

type Phase = "loading" | "leaving" | "done";

/**
 * Opening screen: the Vetrix logo draws itself, the blue dots drop into place, and once the page has
 * loaded the screen opens outward from the dot over the i to reveal the site.
 */
export function SiteLoader() {
  const copy = copyFor(localeFromPath(usePathname() || "/en"));
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<SVGPathElement>(null);

  useEffect(() => {
    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);
    document.documentElement.style.overflow = "hidden";

    // Creep towards 90% while the page loads, then finish
    let raf = 0;
    let shown = 0;
    let leaveTimer = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= MAX_WAIT_MS) loaded = true;
      const target = loaded ? 100 : Math.min(90, (elapsed / MIN_SHOW_MS) * 90);
      shown += (target - shown) * 0.08;
      setProgress(Math.round(shown));
      if (loaded && elapsed >= MIN_SHOW_MS && shown > 99) {
        // Open the screen from the dot over the i
        const r = dot.current?.getBoundingClientRect();
        if (r && root.current) {
          root.current.style.setProperty("--ox", `${r.left + r.width / 2}px`);
          root.current.style.setProperty("--oy", `${r.top + r.height / 2}px`);
        }
        setPhase("leaving");
        document.documentElement.style.overflow = "";
        leaveTimer = window.setTimeout(() => setPhase("done"), EXIT_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leaveTimer);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div ref={root} className="site-loader" data-phase={phase} role="status" aria-label={copy.loading}>
      <div aria-hidden="true" className="site-loader-glow" />

      <div className="site-loader-stage" aria-hidden="true">
        {/* Orbit rings echoing the Ve hub */}
        <svg viewBox="0 0 400 400" className="site-loader-rings">
          <circle cx="200" cy="200" r="190" className="site-loader-ring site-loader-ring-a" pathLength={100} />
          <circle cx="200" cy="200" r="160" className="site-loader-ring site-loader-ring-b" pathLength={100} />
          <circle cx="200" cy="200" r="190" className="site-loader-comet" pathLength={100} />
        </svg>

        <svg viewBox="0 0 157 57" className="site-loader-logo" overflow="visible">
          {LOGO_LETTERS.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              className="site-loader-letter"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
          <path d={LOGO_E_SWOOSH} pathLength={1} className="site-loader-swoosh" />
          <path d={LOGO_E_DOT} className="site-loader-edot" />
          <circle cx="110.3" cy="4.9" r="2.8" className="site-loader-ripple" />
          <path ref={dot} d={LOGO_I_DOT} className="site-loader-idot" />
          <path d={LOGO_TM} className="site-loader-tm" />
          {LOGO_TAGLINE.map((d, i) => (
            <path key={i} d={d} className="site-loader-glyph" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </svg>

        <div className="site-loader-bar">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="site-loader-count">{String(progress).padStart(2, "0")}%</p>
      </div>
    </div>
  );
}
