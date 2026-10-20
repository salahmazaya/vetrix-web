import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { buildConfig, getPayload } from "payload";
import { collapseBilingualDoc } from "@/lib/bilingualDoc";
import { type Locale } from "@/lib/i18n";
import { createPayloadConfig } from "@/payload.config";

export const SITE_PAGES_TAG = "site_pages";

/** Paths that already have dedicated routes — never served by [slug]. */
export const RESERVED_SITE_SLUGS = new Set([
  "about",
  "ai-core",
  "contact",
  "solutions",
  "admin",
  "api",
  "media",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export type SitePageView = {
  slug: string;
  title: string;
  headline: string;
  intro: string;
  content: string;
};

async function loadSitePagesRaw() {
  "use cache";
  cacheLife("max");
  cacheTag(SITE_PAGES_TAG);

  const payload = await getPayload({
    config: buildConfig(createPayloadConfig()),
    key: "frontend",
  });

  return payload.find({
    collection: "site-pages",
    depth: 0,
    limit: 200,
    pagination: false,
    overrideAccess: true,
    where: { enabled: { equals: true } },
  });
}

export async function listSitePageSlugs(): Promise<string[]> {
  const { docs } = await loadSitePagesRaw();
  return docs
    .map((doc) => (typeof doc.slug === "string" ? doc.slug : ""))
    .filter((slug) => slug && !RESERVED_SITE_SLUGS.has(slug));
}

export async function getSitePageBySlug(slug: string, locale: Locale): Promise<SitePageView | null> {
  if (RESERVED_SITE_SLUGS.has(slug)) return null;
  const { docs } = await loadSitePagesRaw();
  const row = docs.find((doc) => doc.slug === slug);
  if (!row) return null;

  const collapsed = collapseBilingualDoc(row, locale) as {
    slug?: string;
    title?: string;
    headline?: string;
    intro?: string;
    content?: string;
  };

  const title = collapsed.title?.trim() || "";
  const content = collapsed.content?.trim() || "";
  if (!title || !content) return null;

  return {
    slug: collapsed.slug || slug,
    title,
    headline: collapsed.headline?.trim() || title,
    intro: collapsed.intro?.trim() || "",
    content,
  };
}

export function revalidateSitePages() {
  try {
    revalidateTag(SITE_PAGES_TAG, { expire: 0 });
  } catch {
    /* outside request */
  }
}
