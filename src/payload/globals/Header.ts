import type { GlobalConfig } from "payload";
import { linkField } from "../fields";
import { revalidateGlobal } from "../revalidate";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Navigation",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
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
    linkField("button", "Button"),
  ],
};
