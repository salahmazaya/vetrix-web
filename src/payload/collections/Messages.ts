import type { CollectionConfig } from "payload";
import { actionsField } from "../fields/listExtras";

/** Messages sent from the Contact page form. Only signed-in admins can read them. */
export const Messages: CollectionConfig = {
  slug: "messages",
  labels: { singular: "Message", plural: "Messages" },
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["id", "name", "email", "subject", "createdAt", "actions"],
    description: "Sent from the Contact page",
  },
  access: {
    // The site's form saves through the server, never through the public API
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
      ],
    },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    actionsField,
  ],
};
