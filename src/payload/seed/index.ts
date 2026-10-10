import path from "path";
import type { Payload } from "payload";
import { content } from "./content";

const ctx = { skipRevalidate: true };

/**
 * Fills the admin with the site's current content the first time it starts, so the site looks the
 * same before anyone edits anything. Does nothing once the Home page has content.
 */
export async function seed(payload: Payload) {
  const home = await payload.findGlobal({ slug: "home", depth: 0 });
  if (home.hero?.title) return;

  payload.logger.info("Seeding the admin with the current site content...");

  // Upload each image once and remember its id
  const ids = new Map<string, number>();
  const media = async (file: string, alt: string) => {
    const known = ids.get(file);
    if (known) return known;
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.resolve(process.cwd(), "public/images", file),
      context: ctx,
    });
    ids.set(file, doc.id);
    return doc.id;
  };

  const c = content;
  const logoTile = async (t: { name: string; logo: string; highlighted?: boolean }) => ({
    name: t.name,
    highlighted: t.highlighted ?? false,
    logo: await media(`process/${t.logo}.webp`, t.name),
  });

  await payload.updateGlobal({ slug: "header", data: c.header, context: ctx });
  await payload.updateGlobal({ slug: "cta", data: c.cta, context: ctx });
  await payload.updateGlobal({ slug: "footer", data: c.footer, context: ctx });

  const sources = [];
  for (const t of c.home.process.sources) sources.push(await logoTile(t));
  const groups = [];
  for (const g of c.home.process.groups) {
    const tiles = [];
    for (const t of g.tiles) tiles.push(await logoTile(t));
    groups.push({ label: g.label, tiles });
  }
  const scaleCards = [];
  for (const card of c.home.scale.cards) {
    scaleCards.push({ title: card.title, body: card.body, image: await media(card.image, card.alt) });
  }

  await payload.updateGlobal({
    slug: "home",
    context: ctx,
    data: {
      ...c.home,
      meetVe: {
        ...c.home.meetVe,
        trustedCard: {
          ...c.home.meetVe.trustedCard,
          avatars: await media("bento-avatars.webp", "Smiling team members"),
        },
      },
      process: { ...c.home.process, sources, groups },
      scale: { ...c.home.scale, cards: scaleCards },
    },
  });

  payload.logger.info("Seeding done.");
}
