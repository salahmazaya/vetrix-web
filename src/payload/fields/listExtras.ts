import type { Field } from "payload";

/** Enable / disable toggle shown in every collection list. */
export const enabledField: Field = {
  name: "enabled",
  type: "checkbox",
  label: { en: "Status", ar: "الحالة" },
  defaultValue: true,
  admin: {
    position: "sidebar",
    components: {
      Cell: "@/payload/admin/cells/StatusToggle#StatusToggle",
    },
  },
};

/** View / edit / delete icons — presentational only, last list column. */
export const actionsField: Field = {
  name: "actions",
  type: "ui",
  label: { en: "Actions", ar: "الإجراءات" },
  admin: {
    components: {
      Cell: "@/payload/admin/cells/RowActions#RowActions",
      Field: "@/payload/admin/cells/RowActions#ActionsField",
    },
  },
};

export const listExtraFields: Field[] = [enabledField, actionsField];
