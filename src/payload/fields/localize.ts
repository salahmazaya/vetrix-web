import type { Field } from "payload";

/** Shared across languages: links, colours, and anything that is not copy. */
const sharedText = new Set(["href", "url", "color", "slug"]);

function isCopyField(field: Field): field is Field & { name: string; type: "text" | "textarea" } {
  return (
    (field.type === "text" || field.type === "textarea") &&
    "name" in field &&
    !sharedText.has(field.name) &&
    !field.name.endsWith("_en") &&
    !field.name.endsWith("_ar") &&
    !field.name.endsWith("__ui")
  );
}

/**
 * Visitor copy → explicit `name_en` + `name_ar` in DB (normal form save).
 * Admin shows one bilingual control per logical field.
 */
export function localizeFields(fields: Field[]): Field[] {
  return fields.flatMap(localizeField);
}

function localizeField(field: Field): Field | Field[] {
  if (field.type === "tabs") {
    return [{ ...field, tabs: field.tabs.map((tab) => ({ ...tab, fields: localizeFields(tab.fields) })) }];
  }
  if (field.type === "row" || field.type === "collapsible") {
    return [{ ...field, fields: localizeFields(field.fields) }];
  }
  if ((field.type === "group" || field.type === "array") && "fields" in field) {
    return [{ ...field, fields: localizeFields(field.fields) }];
  }

  if (!isCopyField(field)) {
    return [field];
  }

  const Field =
    field.type === "textarea"
      ? "@/payload/fields/BilingualText#BilingualTextarea"
      : "@/payload/fields/BilingualText#BilingualText";

  const hiddenField = (name: string): Field =>
    ({
      type: field.type,
      name,
      label: field.label,
      required: field.required,
      localized: false,
      admin: { hidden: true, placeholder: field.admin?.placeholder },
    }) as Field;

  return [
    hiddenField(`${field.name}_en`),
    hiddenField(`${field.name}_ar`),
    {
      name: `${field.name}__ui`,
      type: "ui",
      label: field.label === false ? undefined : (field.label as string | Record<string, string> | undefined),
      admin: {
        ...(field.admin ?? {}),
        components: { Field },
      },
    } as Field,
  ];
}
