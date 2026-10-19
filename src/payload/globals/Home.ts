import type { Field, GlobalConfig } from "payload";
import { headingFields, imageField, linkField } from "../fields";
import { revalidateGlobal } from "../revalidate";

const logoTile: Field[] = [
  {
    type: "row",
    fields: [
      { name: "name", type: "text", required: true },
      imageField("logo"),
      {
        name: "highlighted",
        type: "checkbox",
        defaultValue: false,
        admin: { description: "Shown lit up in the diagram" },
      },
    ],
  },
];

/** Every Home section's content, one tab per section, in page order. */
export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
          label: "Hero",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            linkField("primaryButton", "Main button"),
            linkField("secondaryButton", "Second button"),
          ],
        },
        {
          name: "meetVe",
          label: "Meet Ve",
          fields: [
            ...headingFields,
            {
              name: "introCard",
              label: "Intro card",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "highlight", type: "text", admin: { description: "Shown in the blue gradient after the title" } },
                { name: "caption", type: "text" },
              ],
            },
            {
              name: "trustedCard",
              label: "Trusted by card",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "value", type: "text", required: true, admin: { description: "e.g. 12K, counts up" } },
                    { name: "caption", type: "text", required: true },
                  ],
                },
                imageField("avatars", "Avatars image"),
              ],
            },
            { name: "generateLabel", label: "Generate button text", type: "text", required: true },
            {
              name: "statCard",
              label: "Number card",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
            { name: "chipsTitle", label: "Chips card title", type: "text", required: true },
            {
              name: "heart",
              label: "Centre card",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                {
                  name: "features",
                  type: "array",
                  minRows: 2,
                  maxRows: 2,
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "body", type: "textarea", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "about",
          label: "About",
          fields: [
            { name: "eyebrow", type: "text", required: true },
            {
              name: "intro",
              label: "Intro paragraph",
              type: "array",
              admin: { description: "The paragraph in parts; highlighted parts light up in blue as you scroll" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "text", type: "text", required: true },
                    { name: "highlight", type: "checkbox", defaultValue: false },
                  ],
                },
              ],
            },
            linkField("button", "Button"),
            {
              name: "pills",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "color", type: "text", required: true, admin: { description: "Spark colour, e.g. #f97316" } },
                  ],
                },
              ],
            },
            { name: "accessLabel", label: "Cursor label", type: "text", required: true },
          ],
        },
        {
          name: "edge",
          label: "Vetrix Edge",
          fields: [
            ...headingFields,
            {
              name: "cards",
              type: "array",
              minRows: 4,
              maxRows: 4,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          name: "process",
          label: "Our Process",
          fields: [
            ...headingFields,
            {
              name: "stages",
              label: "Hub stages",
              type: "array",
              minRows: 3,
              maxRows: 10,
              fields: [{ name: "label", type: "text", required: true }],
            },
            {
              name: "categories",
              label: "Left side labels",
              type: "array",
              minRows: 4,
              maxRows: 4,
              fields: [{ name: "label", type: "text", required: true }],
            },
            {
              name: "sources",
              label: "Source apps (left)",
              type: "array",
              minRows: 27,
              maxRows: 27,
              admin: { description: "27 tiles, filled row by row, 3 per row" },
              fields: logoTile,
            },
            {
              name: "reef",
              label: "Top right panel",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                {
                  name: "chips",
                  type: "array",
                  minRows: 4,
                  maxRows: 4,
                  fields: [{ name: "label", type: "text", required: true }],
                },
              ],
            },
            { name: "toolsTitle", label: "Bottom right panel title", type: "text", required: true },
            {
              name: "groups",
              label: "Tool groups",
              type: "array",
              minRows: 4,
              maxRows: 4,
              fields: [
                { name: "label", type: "text", required: true },
                { name: "tiles", type: "array", minRows: 3, maxRows: 3, fields: logoTile },
              ],
            },
          ],
        },
        {
          name: "impact",
          label: "Proven Impact",
          fields: [
            ...headingFields,
            {
              name: "stats",
              type: "array",
              minRows: 4,
              maxRows: 4,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true, admin: { description: "e.g. 85%, counts up" } },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "scale",
          label: "Scale Smarter",
          fields: [
            ...headingFields,
            {
              name: "cards",
              type: "array",
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: "title", type: "textarea", required: true, admin: { description: "New lines are kept" } },
                { name: "body", type: "textarea", required: true },
                imageField("image"),
              ],
            },
          ],
        },
      ],
    },
  ],
};
