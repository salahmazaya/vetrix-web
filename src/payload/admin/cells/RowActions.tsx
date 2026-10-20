"use client";

import { ConfirmationModal, Link, toast, useAuth, useConfig, useModal, useTranslation } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { formatAdminURL } from "payload/shared";
import { useMemo, type MouseEvent, type ReactNode } from "react";

type Props = {
  collectionSlug: string;
  rowData: {
    id?: number | string;
    filename?: string | null;
    url?: string | null;
    slug?: string | null;
  };
};

function can(value: unknown) {
  if (value === true) return true;
  if (value && typeof value === "object" && "permission" in value) {
    return Boolean((value as { permission?: boolean }).permission);
  }
  return false;
}

/** Empty edit-view placeholder — actions only appear in the list. */
export function ActionsField() {
  return null;
}

/** View / edit / delete icons — no chrome wrapper. */
export function RowActions({ collectionSlug, rowData }: Props) {
  const router = useRouter();
  const { config } = useConfig();
  const { permissions, user } = useAuth();
  const { i18n } = useTranslation();
  const { openModal } = useModal();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const id = rowData?.id;
  const modalSlug = `vx-delete-${collectionSlug}-${id}`;

  const editHref = useMemo(() => {
    if (id == null) return "#";
    return formatAdminURL({
      adminRoute: config.routes.admin,
      path: `/collections/${collectionSlug}/${id}`,
    });
  }, [collectionSlug, config.routes.admin, id]);

  const mediaUrl = useMemo(() => {
    if (collectionSlug !== "media") return null;
    const file = rowData.filename || rowData.url?.split("?")[0]?.split("/").pop();
    return file ? `/media/${file}` : null;
  }, [collectionSlug, rowData.filename, rowData.url]);

  const perms = permissions?.collections?.[collectionSlug];
  const canRead = Boolean(user) && (can(perms?.read) || !perms);
  const canUpdate = Boolean(user) && (can(perms?.update) || !perms);
  const canDelete = Boolean(user) && (can(perms?.delete) || !perms);

  const stopBubble = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const onDelete = async () => {
    if (id == null) return;
    const res = await fetch(`/api/${collectionSlug}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      toast.error(ar ? "تعذّر الحذف" : "Could not delete");
      return;
    }
    toast.success(ar ? "تم الحذف" : "Deleted");
    router.refresh();
  };

  if (id == null) return null;

  const items: ReactNode[] = [];

  if (collectionSlug === "site-pages") {
    const slug = typeof rowData.slug === "string" ? rowData.slug.trim() : "";
    const locale = ar ? "ar" : "en";
    const publicHref = slug ? `/${locale}/${slug}` : null;

    if (canRead && publicHref) {
      items.push(
        <a
          key="view"
          className="vx-act"
          href={publicHref}
          target="_blank"
          rel="noopener noreferrer"
          title={ar ? "عرض" : "View"}
          aria-label={ar ? "عرض" : "View"}
          onClick={stopBubble}
        >
          <EyeIcon />
        </a>,
      );
    }
    if (canUpdate) {
      items.push(
        <Link key="edit" className="vx-act" href={editHref} prefetch={false} title={ar ? "تعديل" : "Edit"} aria-label={ar ? "تعديل" : "Edit"} onClick={stopBubble}>
          <EditIcon />
        </Link>,
      );
    }
    if (canDelete) {
      items.push(
        <button
          key="delete"
          type="button"
          className="vx-act is-danger"
          title={ar ? "حذف" : "Delete"}
          aria-label={ar ? "حذف" : "Delete"}
          onClick={(event) => {
            stopBubble(event);
            openModal(modalSlug);
          }}
        >
          <TrashIcon />
        </button>,
        <ConfirmationModal
          key="confirm"
          modalSlug={modalSlug}
          heading={ar ? "تأكيد الحذف" : "Confirm deletion"}
          body={ar ? "هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع." : "Are you sure you want to delete this item? This cannot be undone."}
          confirmLabel={ar ? "حذف" : "Delete"}
          onConfirm={onDelete}
        />,
      );
    }
    if (items.length === 0) return null;
    return <span className="vx-acts">{items}</span>;
  }

  const viewOnly = collectionSlug === "messages" || !canUpdate;

  if (canRead && collectionSlug === "media" && mediaUrl) {
    items.push(
      <a key="view" className="vx-act" href={mediaUrl} target="_blank" rel="noopener noreferrer" title={ar ? "عرض" : "View"} aria-label={ar ? "عرض" : "View"} onClick={stopBubble}>
        <EyeIcon />
      </a>,
    );
  } else if (canRead && viewOnly) {
    items.push(
      <Link key="view" className="vx-act" href={editHref} prefetch={false} title={ar ? "عرض" : "View"} aria-label={ar ? "عرض" : "View"} onClick={stopBubble}>
        <EyeIcon />
      </Link>,
    );
  }

  if (canUpdate && collectionSlug !== "messages") {
    items.push(
      <Link key="edit" className="vx-act" href={editHref} prefetch={false} title={ar ? "تعديل" : "Edit"} aria-label={ar ? "تعديل" : "Edit"} onClick={stopBubble}>
        <EditIcon />
      </Link>,
    );
  }

  if (canDelete) {
    items.push(
      <button
        key="delete"
        type="button"
        className="vx-act is-danger"
        title={ar ? "حذف" : "Delete"}
        aria-label={ar ? "حذف" : "Delete"}
        onClick={(event) => {
          stopBubble(event);
          openModal(modalSlug);
        }}
      >
        <TrashIcon />
      </button>,
      <ConfirmationModal
        key="confirm"
        modalSlug={modalSlug}
        heading={ar ? "تأكيد الحذف" : "Confirm deletion"}
        body={ar ? "هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع." : "Are you sure you want to delete this item? This cannot be undone."}
        confirmLabel={ar ? "حذف" : "Delete"}
        onConfirm={onDelete}
      />,
    );
  }

  if (items.length === 0) return null;

  return <span className="vx-acts">{items}</span>;
}

const stroke = {
  width: 1.75,
  linecap: "round" as const,
  linejoin: "round" as const,
};

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={stroke.width} strokeLinecap={stroke.linecap} strokeLinejoin={stroke.linejoin}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={stroke.width} strokeLinecap={stroke.linecap} strokeLinejoin={stroke.linejoin}>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth={stroke.width} strokeLinecap={stroke.linecap} strokeLinejoin={stroke.linejoin}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
