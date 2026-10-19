import path from "path";
import type { Payload } from "payload";

export const seedContext = { skipRevalidate: true };

/** Uploads images from public/images once per seed run and hands back their media ids. */
export function mediaUploader(payload: Payload) {
  const ids = new Map<string, number>();
  return async (file: string, alt: string) => {
    const known = ids.get(file);
    if (known) return known;
    // Reuse an earlier upload of the same file (e.g. when another global was seeded before)
    const filename = path.basename(file);
    const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
    const id =
      existing.docs[0]?.id ??
      (
        await payload.create({
          collection: "media",
          data: { alt },
          filePath: path.resolve(process.cwd(), "public/images", file),
          context: seedContext,
        })
      ).id;
    ids.set(file, id);
    return id;
  };
}

export type Upload = ReturnType<typeof mediaUploader>;
