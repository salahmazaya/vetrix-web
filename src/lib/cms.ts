import config from "@payload-config";
import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import type { Config, Media } from "@/payload-types";
import { globalTag } from "@/payload/revalidate";

type GlobalSlug = keyof Config["globals"];

/** Reads one editable global from the admin. Cached until it is edited there. */
export async function getGlobal<S extends GlobalSlug>(slug: S): Promise<Config["globals"][S]> {
  "use cache";
  cacheTag(globalTag(slug));
  cacheLife("max");
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug, depth: 1 }) as Promise<Config["globals"][S]>;
}

/** Image fields come back as the full media document; this pulls out what <Image> needs. */
export function mediaSrc(m: number | Media | null | undefined) {
  if (!m || typeof m === "number" || !m.url) return null;
  return { src: m.url, alt: m.alt ?? "", width: m.width ?? 0, height: m.height ?? 0 };
}
