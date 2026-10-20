"use client";

import { toast, useAuth, useTranslation } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

type Props = {
  cellData?: boolean | null;
  collectionSlug: string;
  rowData: { id?: number | string };
};

/** Bare blue / gray switch — no label text. */
export function StatusToggle({ cellData, collectionSlug, rowData }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const [on, setOn] = useState(cellData !== false);
  const [busy, setBusy] = useState(false);
  const id = rowData?.id;

  useEffect(() => {
    setOn(cellData !== false);
  }, [cellData]);

  const toggle = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!id || busy) return;

    if (collectionSlug === "users" && on && String(id) === String(user?.id)) {
      toast.error(ar ? "لا يمكنك تعطيل حسابك الحالي" : "You cannot disable your own account");
      return;
    }

    const next = !on;
    setOn(next);
    setBusy(true);
    try {
      const res = await fetch(`/api/${collectionSlug}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(ar ? (next ? "تم التفعيل" : "تم التعطيل") : next ? "Enabled" : "Disabled");
      router.refresh();
    } catch {
      setOn(!next);
      toast.error(ar ? "تعذّر تحديث الحالة" : "Could not update status");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`vx-toggle${on ? " is-on" : ""}${busy ? " is-busy" : ""}`}
      onClick={toggle}
      disabled={busy || id == null}
      aria-pressed={on}
      aria-label={ar ? (on ? "مفعّل" : "معطّل") : on ? "Enabled" : "Disabled"}
      title={ar ? (on ? "مفعّل" : "معطّل") : on ? "Enabled" : "Disabled"}
    >
      <span className="vx-toggle__thumb" />
    </button>
  );
}
