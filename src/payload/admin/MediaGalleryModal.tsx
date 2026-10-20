"use client";

import { Button, useConfig, useModal, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import * as qs from "qs-esm";
import { useCallback, useEffect, useState } from "react";

export type MediaPick = {
  id: number | string;
  filename?: string | null;
  alt?: string | null;
  alt_en?: string | null;
  alt_ar?: string | null;
  url?: string | null;
  thumbnailURL?: string | null;
  mimeType?: string | null;
};

type Props = {
  modalSlug: string;
  onSelect: (doc: MediaPick) => void;
};

function mediaSrc(doc: MediaPick, serverURL: string) {
  const raw = doc.thumbnailURL || doc.url;
  if (raw) {
    try {
      return new URL(raw, serverURL).toString();
    } catch {
      return `${serverURL}${raw}`;
    }
  }
  if (doc.filename) return `/media/${doc.filename}`;
  return null;
}

function labelFor(doc: MediaPick, ar: boolean) {
  const arAlt = doc.alt_ar?.trim();
  const enAlt = doc.alt_en?.trim() || doc.alt?.trim();
  if (ar && arAlt) return arAlt;
  if (enAlt) return enAlt;
  return doc.filename || `#${doc.id}`;
}

/** Full-screen grid picker for existing media. */
export function MediaGalleryModal({ modalSlug, onSelect }: Props) {
  const { config } = useConfig();
  const { closeModal, isModalOpen } = useModal();
  const { i18n } = useTranslation();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const open = isModalOpen(modalSlug);

  const [docs, setDocs] = useState<MediaPick[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const debouncedQuery = useDebounced(query, 280);

  const load = useCallback(
    async (nextPage: number, search: string, replace: boolean) => {
      setLoading(true);
      try {
        const where: Record<string, unknown> = {
          and: [{ enabled: { equals: true } }],
        };
        const q = search.trim();
        if (q) {
          where.and = [
            ...(where.and as object[]),
            {
              or: [
                { filename: { contains: q } },
                { alt_en: { contains: q } },
                { alt_ar: { contains: q } },
                { alt: { contains: q } },
              ],
            },
          ];
        }

        const body = qs.stringify({
          depth: 0,
          limit: 24,
          page: nextPage,
          sort: "-updatedAt",
          where,
        });

        const res = await fetch(
          formatAdminURL({ apiRoute: config.routes.api, path: "/media" }),
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Accept-Language": i18n.language,
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Payload-HTTP-Method-Override": "GET",
            },
            body,
          },
        );

        if (!res.ok) {
          if (replace) setDocs([]);
          setHasNext(false);
          return;
        }

        const data = (await res.json()) as {
          docs: MediaPick[];
          hasNextPage?: boolean;
          nextPage?: number | null;
        };

        setDocs((prev) => (replace ? data.docs : [...prev, ...data.docs]));
        setHasNext(Boolean(data.hasNextPage && data.nextPage));
        if (replace) setPage(nextPage);
      } finally {
        setLoading(false);
      }
    },
    [config.routes.api, i18n.language],
  );

  useEffect(() => {
    if (!open) return;
    setPage(1);
    void load(1, debouncedQuery, true);
  }, [open, debouncedQuery, load]);

  const title = ar ? "اختر صورة من المكتبة" : "Choose from media library";
  const searchPh = ar ? "ابحث بالاسم أو النص البديل…" : "Search by filename or alt text…";
  const empty = ar ? "لا توجد صور مطابقة" : "No matching images";
  const loadMore = ar ? "تحميل المزيد" : "Load more";

  if (!open) return null;

  return (
    <div className="vx-gallery-root" role="presentation">
      <button type="button" className="vx-gallery-backdrop" aria-label={ar ? "إغلاق" : "Close"} onClick={() => closeModal(modalSlug)} />
      <div className="vx-gallery" role="dialog" aria-modal="true" aria-labelledby={`${modalSlug}-title`}>
        <header className="vx-gallery__head">
          <div>
            <p className="vx-gallery__kicker">{ar ? "الوسائط" : "Media"}</p>
            <h2 id={`${modalSlug}-title`}>{title}</h2>
          </div>
          <button type="button" className="vx-gallery__close" onClick={() => closeModal(modalSlug)} aria-label={ar ? "إغلاق" : "Close"}>
            ×
          </button>
        </header>

        <div className="vx-gallery__search">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPh}
            autoFocus
          />
        </div>

        <div className="vx-gallery__body">
          {loading && docs.length === 0 ? (
            <div className="vx-gallery__loading">{ar ? "جاري التحميل…" : "Loading…"}</div>
          ) : docs.length === 0 ? (
            <p className="vx-gallery__empty">{empty}</p>
          ) : (
            <ul className="vx-gallery__grid">
              {docs.map((doc) => {
                const src = mediaSrc(doc, config.serverURL);
                return (
                  <li key={String(doc.id)}>
                    <button
                      type="button"
                      className="vx-gallery__tile"
                      onClick={() => {
                        onSelect(doc);
                        closeModal(modalSlug);
                      }}
                    >
                      <span className="vx-gallery__thumb">{src ? <img src={src} alt="" loading="lazy" /> : <span className="vx-gallery__ph" />}</span>
                      <span className="vx-gallery__meta">
                        <strong>{labelFor(doc, ar)}</strong>
                        {doc.filename ? <small>{doc.filename}</small> : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="vx-gallery__foot">
          {hasNext ? (
            <Button
              buttonStyle="secondary"
              disabled={loading}
              onClick={() => {
                const next = page + 1;
                setPage(next);
                void load(next, debouncedQuery, false);
              }}
            >
              {loadMore}
            </Button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}

function useDebounced(value: string, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return debounced;
}
