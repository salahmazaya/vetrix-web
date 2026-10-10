import type { GlobalConfig } from "payload";
import { pageHeaderField } from "../fields";
import { revalidateGlobal } from "../revalidate";

/** The Contact page's header and form wording. Sent messages land in Messages. */
export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact Page",
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Page header", fields: [pageHeaderField] },
        {
          name: "form",
          label: "Form",
          fields: [
            { name: "title", type: "text", required: true },
            {
              type: "row",
              fields: [
                { name: "nameLabel", label: "Name label", type: "text", required: true },
                { name: "emailLabel", label: "Email label", type: "text", required: true },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "subjectLabel", label: "Subject label", type: "text", required: true },
                { name: "messageLabel", label: "Message label", type: "text", required: true },
              ],
            },
            { name: "submitLabel", label: "Button text", type: "text", required: true },
            { name: "successTitle", label: "Thank-you title", type: "text", required: true },
            { name: "successMessage", label: "Thank-you message", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};
