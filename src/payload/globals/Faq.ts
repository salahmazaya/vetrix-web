import type { GlobalConfig } from "payload";
import { headingFields } from "../fields";
import { revalidateGlobal } from "../revalidate";

/** Questions and answers shown above the call-to-action on the inner pages */
export const Faq: GlobalConfig = {
  slug: "faq",
  label: "FAQ",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    ...headingFields,
    {
      name: "items",
      label: "Questions",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
