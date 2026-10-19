import type { Payload } from "payload";
import { content } from "./content";
import { seedContext as context, type Upload } from "./media";

/** Navigation, call-to-action band and footer */
export async function seedSiteGlobals(payload: Payload) {
  await payload.updateGlobal({ slug: "header", data: content.header, context });
  await payload.updateGlobal({ slug: "cta", data: content.cta, context });
  await payload.updateGlobal({ slug: "footer", data: content.footer, context });
}

export async function seedHome(payload: Payload, upload: Upload) {
  const c = content.home;
  const logoTile = async (t: { name: string; logo: string; highlighted?: boolean }) => ({
    name: t.name,
    highlighted: t.highlighted ?? false,
    logo: await upload(`process/${t.logo}.webp`, t.name),
  });

  const sources = [];
  for (const t of c.process.sources) sources.push(await logoTile(t));
  const groups = [];
  for (const g of c.process.groups) {
    const tiles = [];
    for (const t of g.tiles) tiles.push(await logoTile(t));
    groups.push({ label: g.label, tiles });
  }
  const scaleCards = [];
  for (const card of c.scale.cards) {
    scaleCards.push({ title: card.title, body: card.body, image: await upload(card.image, card.alt) });
  }

  await payload.updateGlobal({
    slug: "home",
    context,
    data: {
      ...c,
      meetVe: {
        ...c.meetVe,
        trustedCard: { ...c.meetVe.trustedCard, avatars: await upload("bento-avatars.webp", "Smiling team members") },
      },
      process: { ...c.process, sources, groups },
      scale: { ...c.scale, cards: scaleCards },
    },
  });
}
