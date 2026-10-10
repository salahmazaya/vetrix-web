import type { GlobalConfig } from "payload";
import { linkField } from "../fields";
import { revalidateGlobal } from "../revalidate";

/** "Ready to Scale?" band shown above the footer on every page */
export const Cta: GlobalConfig = {
  slug: "cta",
  label: "Call to Action",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "textarea", required: true, admin: { description: "New lines are kept on large screens" } },
    { name: "description", type: "textarea" },
    linkField("button", "Button"),
  ],
};
