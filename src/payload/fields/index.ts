import type { Field } from "payload";

/** Button text plus where it goes */
export const linkField = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", label: "Link", type: "text", required: true },
      ],
    },
  ],
});

/** Eyebrow, title and supporting line shown at the top of most sections */
export const headingFields: Field[] = [
  { name: "eyebrow", type: "text", required: true },
  { name: "title", type: "text", required: true },
  { name: "description", type: "textarea" },
];

export const imageField = (name: string, label?: string, required = true): Field => ({
  name,
  label,
  type: "upload",
  relationTo: "media",
  required,
});

/** The blue band at the top of every inner page: page name, breadcrumb, headline and intro */
export const pageHeaderField: Field = {
  name: "header",
  label: "Page header",
  type: "group",
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "Page name, also used in the breadcrumb" } },
    {
      name: "headline",
      type: "text",
      required: true,
      admin: { description: "Wrap the word to colour in *stars*, e.g. Where *Deep* Tech Meets Business Logic" },
    },
    { name: "intro", type: "textarea", required: true },
  ],
};

/** Headline that can colour one word: the admin hint explains the *stars* */
export const highlightTitleField = (name = "title"): Field => ({
  name,
  type: "text",
  required: true,
  admin: { description: "Wrap the word to colour in *stars*" },
});

/** Count-up numbers with a label, e.g. 85% Workflows Automated */
export const statsField = (count = 4): Field => ({
  name: "stats",
  type: "array",
  minRows: count,
  maxRows: count,
  fields: [
    {
      type: "row",
      fields: [
        { name: "value", type: "text", required: true, admin: { description: "e.g. 85%, counts up" } },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
});

/** Title + body cards */
export const cardsField = (name: string, count: number, extra: Field[] = []): Field => ({
  name,
  type: "array",
  minRows: count,
  maxRows: count,
  fields: [{ name: "title", type: "text", required: true }, { name: "body", type: "textarea", required: true }, ...extra],
});
