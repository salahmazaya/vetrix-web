import fs from "fs";

const s = fs.readFileSync("src/migrations/20261019_190500_localized_fields.ts", "utf8");
const re = /CREATE TABLE \\"([^\\"]+_locales)\\" \(([\s\S]*?)\);/g;
for (const m of s.matchAll(re)) {
  const cols = [...m[2].matchAll(/\\"([a-z_]+)\\" varchar/g)]
    .map((c) => c[1])
    .filter((c) => c !== "id");
  const parent = m[1].replace(/_locales$/, "");
  console.log(JSON.stringify({ parent, locales: m[1], cols }));
}
