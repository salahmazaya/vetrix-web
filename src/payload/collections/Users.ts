import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { listExtraFields } from "../fields/listExtras";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["id", "email", "createdAt", "updatedAt", "enabled", "actions"],
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => {
      const enabled = (user as { enabled?: boolean } | null)?.enabled;
      return Boolean(user && enabled !== false);
    },
  },
  hooks: {
    beforeLogin: [
      async ({ user }) => {
        if ((user as { enabled?: boolean }).enabled === false) {
          throw new APIError("This account is disabled.", 403);
        }
      },
    ],
  },
  fields: [...listExtraFields],
};
