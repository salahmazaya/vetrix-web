import type { Payload } from "payload";
import { seedAbout } from "./about";
import { seedAiCore } from "./aiCore";
import { seedContact } from "./contact";
import { seedFaq } from "./faq";
import { seedHome, seedSiteGlobals } from "./home";
import { mediaUploader, type Upload } from "./media";
import { seedSolutions } from "./solutions";

type Seeder = {
  slug: "header" | "home" | "faq" | "aiCore" | "about" | "solutions" | "contact";
  /** True when the global already has content, so it is left alone */
  filled: (doc: Record<string, unknown>) => boolean;
  run: (payload: Payload, upload: Upload) => Promise<void>;
};

/** True when the named tab has its first field filled in */
const has = (tab: string, field: string) => (doc: Record<string, unknown>) =>
  Boolean((doc[tab] as Record<string, unknown> | undefined)?.[field]);

const seeders: Seeder[] = [
  { slug: "header", filled: (d) => Array.isArray(d.links) && d.links.length > 0, run: seedSiteGlobals },
  { slug: "home", filled: (d) => Boolean((d.hero as { title?: string } | undefined)?.title), run: seedHome },
  { slug: "faq", filled: (d) => Array.isArray(d.items) && d.items.length > 0, run: seedFaq },
  { slug: "aiCore", filled: has("brain", "title"), run: seedAiCore },
  { slug: "about", filled: has("identity", "title"), run: seedAbout },
  { slug: "solutions", filled: has("deliver", "title"), run: seedSolutions },
  { slug: "contact", filled: has("form", "title"), run: seedContact },
];

/**
 * Fills each part of the admin with the site's designed content the first time it is empty, so the
 * site looks right before anyone edits anything. Content that already exists is never touched.
 */
export async function seed(payload: Payload) {
  const upload = mediaUploader(payload);
  for (const s of seeders) {
    const doc = (await payload.findGlobal({ slug: s.slug, depth: 0 })) as unknown as Record<string, unknown>;
    if (s.filled(doc)) continue;
    payload.logger.info(`Seeding ${s.slug}...`);
    await s.run(payload, upload);
  }
}
