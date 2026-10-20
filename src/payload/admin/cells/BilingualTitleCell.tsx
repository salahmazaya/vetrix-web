"use client";

import { useTranslation } from "@payloadcms/ui";

type Row = {
  title_en?: string | null;
  title_ar?: string | null;
};

/** List column: show Arabic or English title to match dashboard UI language. */
export function BilingualTitleCell({ rowData }: { rowData: Row }) {
  const { i18n } = useTranslation();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const primary = ar ? rowData.title_ar : rowData.title_en;
  const fallback = ar ? rowData.title_en : rowData.title_ar;
  const title = (typeof primary === "string" && primary.trim() ? primary : fallback) || "—";
  return <span>{title}</span>;
}
