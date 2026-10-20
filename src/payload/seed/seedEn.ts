const SHARED_KEYS = new Set([
  "href",
  "url",
  "color",
  "enabled",
  "highlighted",
  "platform",
  "numberLeft",
  "bodyWidth",
  "n",
  "kind",
  "left",
  "mimeType",
  "filename",
]);

function isCopyKey(key: string): boolean {
  return !SHARED_KEYS.has(key) && !key.endsWith("_en") && !key.endsWith("_ar") && !key.endsWith("__ui");
}

/** Maps seed objects that use logical keys (`title`) to Payload `title_en` fields. */
export function seedEn(value: unknown): Record<string, unknown> {
  return mapSeed(value) as Record<string, unknown>;
}

function mapSeed(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(mapSeed);
  if (!value || typeof value !== "object") return value;

  const out: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (typeof raw === "string" && isCopyKey(key)) {
      out[`${key}_en`] = raw;
      continue;
    }
    out[key] = mapSeed(raw);
  }
  return out;
}
