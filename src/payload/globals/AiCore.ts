import type { GlobalConfig } from "payload";
import { cardsField, headingFields, highlightTitleField, imageField, pageHeaderField, statsField } from "../fields";
import { revalidateGlobal } from "../revalidate";

/** Every AI Core section's content, one tab per section, in page order. */
export const AiCore: GlobalConfig = {
  slug: "aiCore",
  label: "AI Core Page",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Page header", fields: [pageHeaderField] },
        {
          name: "brain",
          label: "Meet the brain",
          fields: [highlightTitleField(), { name: "body", type: "textarea", required: true }, imageField("image")],
        },
        { name: "numbers", label: "Numbers", fields: [statsField()] },
        {
          name: "features",
          label: "Built for scale",
          fields: [
            { name: "eyebrow", type: "text", required: true },
            highlightTitleField(),
            cardsField("cards", 4),
          ],
        },
        {
          name: "framework",
          label: "Framework",
          fields: [...headingFields, imageField("image", "Phone image")],
        },
        {
          name: "steps",
          label: "How it works",
          fields: [...headingFields, cardsField("items", 4)],
        },
      ],
    },
  ],
};
