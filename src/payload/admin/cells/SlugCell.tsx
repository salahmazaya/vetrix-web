"use client";

/** List column: plain slug text (no link to edit). */
export function SlugCell({ cellData }: { cellData?: string | null }) {
  const slug = typeof cellData === "string" && cellData.trim() ? cellData : "—";
  return <span className="vx-slug-cell">{slug}</span>;
}
