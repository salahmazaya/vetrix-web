import type { GlobalConfig } from "payload";
import { cardsField, headingFields, highlightTitleField, imageField, linkField, pageHeaderField } from "../fields";
import { revalidateGlobal } from "../revalidate";

/** Every Solutions section's content, one tab per section, in page order. */
export const Solutions: GlobalConfig = {
  slug: "solutions",
  label: "Solutions Page",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Page header", fields: [pageHeaderField] },
        {
          name: "deliver",
          label: "What we deliver",
          fields: [
            highlightTitleField(),
            { name: "body", type: "textarea", required: true },
            linkField("button", "Button"),
            imageField("image"),
          ],
        },
        {
          name: "core",
          label: "Core solutions",
          fields: [
            ...headingFields,
            {
              name: "cards",
              type: "array",
              minRows: 1,
              maxRows: 12,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                imageField("image"),
                linkField("link", "Link"),
              ],
            },
          ],
        },
        {
          name: "methodology",
          label: "Methodology",
          fields: [...headingFields, cardsField("steps", 3)],
        },
      ],
    },
  ],
};
