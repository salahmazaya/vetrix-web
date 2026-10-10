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
