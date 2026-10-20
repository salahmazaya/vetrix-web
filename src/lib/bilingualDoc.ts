import type { Locale } from "@/lib/i18n";

/** Payload admin/API shape → visitor-facing shape (pairs `title_en`/`title_ar` → `title`). */
export type CollapsedCopy<T> = T extends (infer U)[]
  ? CollapsedCopy<U>[]
  : T extends object
    ? { [K in CollapsedKeys<T>]: CollapsedField<T, K> }
    : T;

type CollapsedKeys<T> = {
  [K in keyof T & string]: K extends `${string}_ar` | `${string}__ui`
    ? never
    : K extends `${infer _Base}_en`
      ? _Base
      : K;
}[keyof T & string];

type CollapsedField<T, K extends string> = `${K}_en` extends keyof T
  ? CollapsedCopy<T[`${K}_en` & keyof T]>
  : K extends keyof T
    ? CollapsedCopy<T[K]>
    : never;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Collapse `title_en` / `title_ar` pairs into `title` for the visitor locale.
 * Skips `*__ui` admin-only fields.
 */
export function collapseBilingualDoc<T>(doc: T, locale: Locale): T {
  if (Array.isArray(doc)) {
    return doc.map((item) => collapseBilingualDoc(item, locale)) as T;
  }
  if (!isPlainObject(doc)) return doc;

  const out: Record<string, unknown> = {};
  const consumed = new Set<string>();

  for (const key of Object.keys(doc)) {
    if (consumed.has(key)) continue;
    if (key.endsWith("__ui")) continue;

    if (key.endsWith("_en")) {
      const base = key.slice(0, -3);
      const arKey = `${base}_ar`;
      const enVal = doc[key];
      const arVal = doc[arKey];
      const pick =
        locale === "ar"
          ? (typeof arVal === "string" && arVal.trim() ? arVal : enVal)
          : enVal;
      out[base] = typeof pick === "string" || isPlainObject(pick) || Array.isArray(pick)
        ? collapseBilingualDoc(pick, locale)
        : pick;
      consumed.add(key);
      consumed.add(arKey);
      continue;
    }

    if (key.endsWith("_ar")) continue;

    out[key] = collapseBilingualDoc(doc[key], locale);
  }

  return out as T;
}
