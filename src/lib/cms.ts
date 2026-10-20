import { cacheLife, cacheTag } from "next/cache";
import { buildConfig, getPayload } from "payload";
import type { Config, Media } from "@/payload-types";
import { collapseBilingualDoc, type CollapsedCopy } from "@/lib/bilingualDoc";
import { type Locale } from "@/lib/i18n";
import { createPayloadConfig } from "@/payload.config";
import { globalTag } from "@/payload/revalidate";

type GlobalSlug = keyof Config["globals"];

/**
 * One cached read for every global (`*_en` / `*_ar` rows from Payload).
 * Locale is applied in `getGlobal` — not inside `"use cache"` (request-safe + faster prerender).
 */
async function loadGlobalsRaw(): Promise<{ [S in GlobalSlug]: Config["globals"][S] }> {
  "use cache";
  cacheLife("max");

  const payload = await getPayload({
    config: buildConfig(createPayloadConfig()),
    key: "frontend",
  });

  const slugs = payload.config.globals.map((global) => global.slug) as GlobalSlug[];
  for (const slug of slugs) cacheTag(globalTag(slug));

  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const doc = await payload.findGlobal({
        slug,
        depth: 1,
      });
      return [slug, doc] as const;
    }),
  );

  return Object.fromEntries(entries) as { [S in GlobalSlug]: Config["globals"][S] };
}

/**
 * Reads one editable global in the visitor's language.
 * A missing translation falls back to English. Cached until the dashboard saves.
 */
export async function getGlobal<S extends GlobalSlug>(
  slug: S,
  locale: Locale,
): Promise<CollapsedCopy<Config["globals"][S]>> {
  const globals = await loadGlobalsRaw();
  return collapseBilingualDoc(globals[slug], locale) as CollapsedCopy<Config["globals"][S]>;
}

/** Image fields come back as the full media document; this pulls out what <Image> needs. */
export function mediaSrc(m: number | Media | null | undefined, locale: Locale = "en") {
  if (!m || typeof m === "number") return null;
  // Disabled uploads stay in the CMS but drop out of the public site
  if (m.enabled === false) return null;
  const file = m.filename || m.url?.split("?")[0]?.split("/").pop();
  if (!file) return null;
  const collapsed = collapseBilingualDoc(m, locale) as Media & { alt?: string };
  const alt = typeof collapsed.alt === "string" ? collapsed.alt : "";
  return { src: `/media/${file}`, alt, width: m.width ?? 0, height: m.height ?? 0 };
}
