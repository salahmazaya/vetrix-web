import type { FormState } from "payload";
import { formatAdminURL } from "payload/shared";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

/** Build a nested PATCH body for a dotted field path. */
export function patchBodyForPath(path: string, value: string): Record<string, unknown> {
  const parts = path.split(".");
  if (parts.length === 1) return { [path]: value };

  const root: Record<string, unknown> = {};
  let cursor: Record<string, unknown> | unknown[] = root;

  for (let i = 0; i < parts.length; i++) {
    const key = parts[i]!;
    const isLast = i === parts.length - 1;
    const nextKey = parts[i + 1];
    const nextIsIndex = nextKey != null && /^\d+$/.test(nextKey);

    if (isLast) {
      if (Array.isArray(cursor)) cursor[Number(key)] = value;
      else (cursor as Record<string, unknown>)[key] = value;
      break;
    }

    if (Array.isArray(cursor)) {
      const index = Number(key);
      if (cursor[index] == null) cursor[index] = nextIsIndex ? [] : {};
      cursor = cursor[index] as Record<string, unknown> | unknown[];
    } else {
      if (cursor[key] == null) cursor[key] = nextIsIndex ? [] : {};
      cursor = cursor[key] as Record<string, unknown> | unknown[];
    }
  }

  return root;
}

export function readPathValue(data: unknown, path: string): string {
  if (!path || !data || typeof data !== "object") return "";
  let current: unknown = data;
  for (const part of path.split(".")) {
    if (!part) continue;
    if (current == null || typeof current !== "object") return "";
    if (Array.isArray(current)) {
      current = current[Number(part)];
    } else {
      current = (current as Record<string, unknown>)[part];
    }
  }
  return typeof current === "string" ? current : "";
}

export function apiUrlForDoc(args: {
  apiRoute: string;
  collectionSlug?: string | null;
  globalSlug?: string | null;
  id?: number | string | null;
  locale: Locale;
}) {
  const { apiRoute, collectionSlug, globalSlug, id, locale } = args;
  const docPath =
    collectionSlug && id != null
      ? `/${collectionSlug}/${id}`
      : globalSlug
        ? `/globals/${globalSlug}`
        : null;
  if (!docPath) return null;

  const base = formatAdminURL({
    apiRoute,
    path: docPath as `/${string}`,
  });
  return `${base}?locale=${locale}&depth=0&fallback-locale=null`;
}

/** Same URL shape Payload uses on document save, with an explicit locale. */
export function apiUrlForLocaleFromAction(documentAction: string, locale: Locale): string {
  const url = new URL(documentAction, "http://localhost");
  url.searchParams.set("locale", locale);
  url.searchParams.set("fallback-locale", "null");
  url.searchParams.set("depth", "0");
  return `${url.pathname}${url.search}`;
}

/** Resolve PATCH URL for a locale (action URL, doc ids, or admin pathname). */
export function buildLocalePatchUrl(args: {
  apiRoute: string;
  locale: Locale;
  documentAction?: string | null;
  collectionSlug?: string | null;
  globalSlug?: string | null;
  id?: number | string | null;
  dataId?: unknown;
  adminPathname?: string | null;
}): string | null {
  const {
    apiRoute,
    locale,
    documentAction,
    collectionSlug,
    globalSlug,
    id,
    dataId,
    adminPathname,
  } = args;

  if (typeof documentAction === "string" && documentAction.length > 0) {
    return apiUrlForLocaleFromAction(documentAction, locale);
  }

  let slug = collectionSlug ?? null;
  let global = globalSlug ?? null;
  let docId: number | string | null | undefined =
    id ?? (typeof dataId === "number" || typeof dataId === "string" ? dataId : null);

  if (adminPathname) {
    const collectionMatch = adminPathname.match(/\/collections\/([^/]+)\/(\d+)/);
    if (collectionMatch) {
      slug = slug ?? collectionMatch[1] ?? null;
      docId = docId ?? collectionMatch[2] ?? null;
    }
    const globalMatch = adminPathname.match(/\/globals\/([^/]+)/);
    if (globalMatch) {
      global = global ?? globalMatch[1] ?? null;
    }
  }

  return apiUrlForDoc({
    apiRoute,
    collectionSlug: slug,
    globalSlug: global,
    id: docId,
    locale,
  });
}

function stringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Server/default text from form state (`initialValue`). */
export function readFormFieldInitialValue(state: FormState | undefined, path: string): string {
  if (!state || !path) return "";
  const entry = state[path];
  if (!entry || typeof entry !== "object") return "";
  if ("initialValue" in entry && entry.initialValue != null) return stringOrEmpty(entry.initialValue);
  return "";
}

/** Best display text from form state — custom fields may clear `value` while keeping `initialValue`. */
export function readFormFieldValue(state: FormState | undefined, path: string): string {
  if (!state || !path) return "";
  const entry = state[path];
  if (!entry || typeof entry !== "object") return "";
  const current = "value" in entry && entry.value != null ? stringOrEmpty(entry.value) : "";
  const initial = readFormFieldInitialValue(state, path);
  return current.trim() ? current : initial;
}

export function mergeLegacyLocaleValues(
  loaded: Partial<Record<Locale, string>>,
  args: {
    path: string;
    initialData?: Record<string, unknown> | null;
    initialState?: FormState;
    fieldInitialValue?: string;
    activeLocale?: Locale;
  },
): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = { ...loaded };

  for (const code of locales) {
    if (out[code] === undefined) out[code] = "";
  }

  const fromFormInitial = readFormFieldInitialValue(args.initialState, args.path);
  const legacy =
    readPathValue(args.initialData, args.path) ||
    fromFormInitial ||
    readFormFieldValue(args.initialState, args.path) ||
    stringOrEmpty(args.fieldInitialValue);

  if (legacy && !stringOrEmpty(out.en).trim()) {
    out.en = legacy;
  }

  const active = args.activeLocale;
  if (active && fromFormInitial.trim() && !stringOrEmpty(out[active]).trim()) {
    out[active] = fromFormInitial;
  } else if (active && legacy && !stringOrEmpty(out[active]).trim()) {
    out[active] = legacy;
  }

  return out;
}

export async function fetchAllLocaleValues(args: {
  apiRoute: string;
  collectionSlug?: string | null;
  globalSlug?: string | null;
  id?: number | string | null;
  path: string;
  signal?: AbortSignal;
}): Promise<Record<Locale, string>> {
  const { apiRoute, collectionSlug, globalSlug, id, path, signal } = args;
  const loaded: Record<Locale, string> = { en: "", ar: "" };

  await Promise.all(
    locales.map(async (code) => {
      const url = apiUrlForDoc({ apiRoute, collectionSlug, globalSlug, id, locale: code });
      if (!url) return;
      const res = await fetch(url, { credentials: "include", cache: "no-store", signal });
      if (!res.ok) return;
      const data = (await res.json()) as Record<string, unknown>;
      loaded[code] = readPathValue(data, path);
    }),
  );

  return loaded;
}
