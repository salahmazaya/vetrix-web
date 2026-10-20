import { performance } from "node:perf_hooks";

const t0 = performance.now();
const log = (label) => console.log(`${label}: ${Math.round(performance.now() - t0)}ms`);

log("start");
const { getGlobal } = await import("../src/lib/cms.ts");
log("imported cms");

const home = await getGlobal("home", "en");
log("getGlobal home");

console.log("hero title:", home?.hero?.title?.slice?.(0, 60) ?? "(missing)");
