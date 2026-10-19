import { revalidateTag } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

/** Cache tag used by the site for each editable global */
export const globalTag = (slug: string) => `global_${slug}`;

/** After an edit in the admin, drop the cached copy so the site shows the change on the next visit. */
export const revalidateGlobal: GlobalAfterChangeHook = ({ global, doc, req }) => {
  if (req.context?.skipRevalidate) return doc;
  try {
    revalidateTag(globalTag(global.slug), { expire: 0 });
  } catch {
    // Outside a request (e.g. seeding from a script) there is no cache to clear
  }
  return doc;
};
