import type { Field, GlobalConfig } from "payload";
import { cardsField, headingFields, imageField, linkField, pageHeaderField, statsField } from "../fields";
import { revalidateGlobal } from "../revalidate";

const statement: Field[] = [
  { name: "eyebrow", type: "text", required: true },
  { name: "title", type: "text", required: true },
  { name: "body", type: "textarea", required: true },
  {
    name: "points",
    type: "array",
    maxRows: 6,
    fields: [{ name: "text", type: "text", required: true }],
  },
];

/** Every About section's content, one tab per section, in page order. */
export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Page header", fields: [pageHeaderField] },
        {
          name: "identity",
          label: "Core identity",
          fields: [
            { name: "eyebrow", type: "text", required: true },
            { name: "title", type: "text", required: true },
            imageField("image"),
            statsField(),
          ],
        },
        { name: "mission", label: "Mission", fields: statement },
        { name: "vision", label: "Vision", fields: statement },
        {
          name: "whatWeDo",
          label: "What we do",
          fields: [...headingFields, cardsField("items", 4), linkField("button", "Button")],
        },
        {
          name: "standard",
          label: "Vetrix standard",
          fields: [
            ...headingFields,
            cardsField("cards", 5, [imageField("image", "Illustration")]),
          ],
        },
        {
          name: "technologies",
          label: "Technologies",
          fields: [
            ...headingFields,
            {
              name: "badges",
              type: "array",
              admin: { description: "Logos scroll along in a loop" },
              fields: [
                {
                  type: "row",
                  fields: [{ name: "name", type: "text", required: true }, imageField("logo")],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
