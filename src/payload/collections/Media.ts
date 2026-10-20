import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { listExtraFields } from "../fields/listExtras";
import { globalTag } from "../revalidate";

const GLOBAL_SLUGS = ["header", "home", "aiCore", "about", "solutions", "contact", "faq", "cta", "footer"] as const;

function bustSiteCache() {
  try {
    for (const slug of GLOBAL_SLUGS) revalidateTag(globalTag(slug), { expire: 0 });
  } catch {
    // Seed / scripts have no Next cache
  }
}

/** Disabled media must drop out of every cached page that embeds it. */
const revalidateMediaPages: CollectionAfterChangeHook = ({ doc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  bustSiteCache();
  return doc;
};

const revalidateMediaDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  bustSiteCache();
  return doc;
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { enabled: { equals: true } };
    },
  },
  admin: {
    useAsTitle: "alt_en",
    defaultColumns: ["id", "filename", "alt_en", "alt_ar", "updatedAt", "enabled", "actions"],
  },
  hooks: {
    afterChange: [revalidateMediaPages],
    afterDelete: [revalidateMediaDelete],
  },
  fields: [{ name: "alt", label: "Alt text", type: "text" }, ...listExtraFields],
  upload: { mimeTypes: ["image/*"] },
};
