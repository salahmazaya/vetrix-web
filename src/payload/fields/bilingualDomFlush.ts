import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type LocalePatcher = (locale: Locale, value: string) => Promise<void>;

const patchersByPath = new Map<string, LocalePatcher>();

export function registerBilingualPathPatcher(path: string, patcher: LocalePatcher | null) {
  if (patcher) patchersByPath.set(path, patcher);
  else patchersByPath.delete(path);
}

/** PATCH every EN/AR input (Payload: same field name `alt`, different `?locale=`). */
export async function flushBilingualFieldsFromDom() {
  if (typeof document === "undefined") return false;

  let found = false;
  const roots = document.querySelectorAll<HTMLElement>("[data-vx-bilingual-path]");
  for (const root of roots) {
    const path = root.dataset.vxBilingualPath;
    if (!path) continue;

    const patcher = patchersByPath.get(path);
    if (!patcher) continue;

    found = true;
    for (const code of locales) {
      const control = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[data-vx-locale="${code}"]`,
      );
      if (!control) continue;

      const value = control.value;
      await patcher(code, value);
      control.dataset.vxPersisted = value;
    }
  }

  return found;
}
