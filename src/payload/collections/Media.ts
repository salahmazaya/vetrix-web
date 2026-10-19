import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  admin: { useAsTitle: "alt" },
  fields: [{ name: "alt", label: "Alt text", type: "text" }],
  upload: { mimeTypes: ["image/*"] },
};
