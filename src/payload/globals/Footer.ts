import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: "tagline", type: "textarea", required: true },
    {
      name: "socials",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              options: ["facebook", "instagram", "x", "linkedin"].map((v) => ({
                label: v === "x" ? "X" : v[0].toUpperCase() + v.slice(1),
                value: v,
              })),
            },
            { name: "url", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "columns",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", label: "Link", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
