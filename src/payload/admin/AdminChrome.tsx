"use client";

import { getTranslation } from "@payloadcms/translations";
import { useConfig, useNav, usePreferences, useTranslation } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AuthBrandPanel } from "./AuthBrandPanel";
import { LoginIntro } from "./LoginIntro";
import { PasswordFieldToggle } from "./PasswordFieldToggle";

/** Run after React finishes hydrating the current tree (parent effects can fire too early). */
function afterHydration(fn: () => void) {
  let cancelled = false;
  const id = window.setTimeout(() => {
    if (!cancelled) fn();
  }, 0);
  return () => {
    cancelled = true;
    window.clearTimeout(id);
  };
}

function readLngCookie() {
  return document.cookie.match(/(?:^|; )payload-lng=([^;]*)/)?.[1] ?? "";
}

function writeLngCookie(lang: "en" | "ar") {
  document.cookie = `payload-lng=${lang};path=/;max-age=31536000;samesite=lax`;
}

/**
 * Keep the rendered UI language in sync with the payload-lng cookie.
 * Content locale (EN/AR fields) stays independent via the Localizer.
 */
function useAdminFavicon() {
  useEffect(() => {
    const href = "/favicon.svg";
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.append(link);
    }
    link.type = "image/svg+xml";
    link.href = href;
  }, []);
}

function useEnforceAdminLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const cookie = readLngCookie();
    const uiLang = i18n.language?.startsWith("ar") ? "ar" : "en";
    const htmlLang = (document.documentElement.lang || "").startsWith("ar") ? "ar" : "en";

    if (!cookie || (cookie !== "en" && cookie !== "ar")) {
      writeLngCookie("en");
      if (uiLang === "ar" || htmlLang === "ar") {
        if (sessionStorage.getItem("vx-lng-fix") !== "1") {
          sessionStorage.setItem("vx-lng-fix", "1");
          window.location.reload();
        }
      }
      return;
    }

    if (cookie === uiLang && cookie === htmlLang) {
      sessionStorage.removeItem("vx-lng-fix");
      return;
    }

    if (cookie !== uiLang || cookie !== htmlLang) {
      if (sessionStorage.getItem("vx-lng-fix") === "1") return;
      sessionStorage.setItem("vx-lng-fix", "1");
      writeLngCookie(cookie as "en" | "ar");
      window.location.reload();
    }
  }, [i18n.language]);
}

/** True while the viewport is wider than a tablet. */
function useDesktopWidth() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktop;
}

/** Keep the sidebar open from tablet width up; Payload closes it below 1440px. */
function useDesktopNav() {
  const { setNavOpen } = useNav();
  const desktop = useDesktopWidth();

  useEffect(() => {
    if (!desktop) return;

    setNavOpen(true);
    const tick = window.setInterval(() => setNavOpen(true), 40);
    const stop = window.setTimeout(() => window.clearInterval(tick), 500);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(stop);
    };
  }, [desktop, setNavOpen]);
}

/** Fix Payload's Arabic typo in text nodes only — never rewrite element trees. */
function useArabicCreateSpelling() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!i18n.language?.startsWith("ar")) return;

    const fixText = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes("أنشاء")) {
        node.textContent = node.textContent.replaceAll("أنشاء", "إنشاء");
        return;
      }
      node.childNodes.forEach(fixText);
    };

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fixText(document.body), 50);
    };

    const stopDelay = afterHydration(schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      stopDelay();
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [i18n.language]);
}

/**
 * Create screens: title beside Save inside .doc-controls.
 * Does not touch step-nav / app-header (that caused hydration mismatches).
 */
function useCreateTitle() {
  const pathname = usePathname() || "";
  const { config } = useConfig();
  const { i18n } = useTranslation();

  useEffect(() => {
    const match = pathname.match(/\/collections\/([^/]+)\/create\/?$/);
    if (!match) {
      document.documentElement.classList.remove("vx-create-doc");
      return;
    }

    document.documentElement.classList.add("vx-create-doc");

    const collection = config.collections.find((item) => item.slug === match[1]);
    if (!collection) return;

    const singular = String(getTranslation(collection.labels.singular, i18n) || "");
    const ar = Boolean(i18n.language?.startsWith("ar"));
    const label = ar ? `إنشاء ${singular} جديد` : `Create new ${singular}`;

    const apply = () => {
      const content = document.querySelector(".doc-controls__content");
      if (!(content instanceof HTMLElement)) return;

      const value = content.querySelector(".doc-controls__value");
      if (value) {
        const text = [...value.childNodes].find((n) => n.nodeType === Node.TEXT_NODE);
        if (text) {
          if (text.textContent !== label) text.textContent = label;
        } else if (value.childElementCount === 0 && value.textContent !== label) {
          value.textContent = label;
        }
        value.classList.add("vx-create-title");
      } else if (!content.querySelector(".vx-create-title")) {
        const title = document.createElement("span");
        title.className = "vx-create-title";
        title.textContent = label;
        content.prepend(title);
      }

      content.querySelectorAll(".doc-controls__label").forEach((node) => {
        const text = node.textContent?.trim() ?? "";
        if (/^جاري إنشاء/.test(text) || /^Creating(\s|…|\.|$)/i.test(text)) {
          (node as HTMLElement).hidden = true;
          (node as HTMLElement).style.setProperty("display", "none", "important");
        }
      });
    };

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 50);
    };

    const stopDelay = afterHydration(schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.documentElement.classList.remove("vx-create-doc");
      stopDelay();
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname, config.collections, i18n]);
}

/** Label the id column "#". */
function useIdColumnLabel() {
  useEffect(() => {
    const renameLeaves = (node: Element) => {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const value = child.textContent?.trim() ?? "";
          if (value === "ID" || value === "Id" || value === "id" || value === "معرف" || value === "المعرّف") {
            child.textContent = "#";
          }
        }
      });
    };

    let timer = 0;
    const apply = () => {
      document.querySelectorAll(".table thead th").forEach((th) => {
        const text = th.textContent?.trim() ?? "";
        const isId =
          text === "ID" ||
          text === "Id" ||
          text === "id" ||
          text === "#" ||
          text === "معرف" ||
          text === "المعرّف" ||
          Boolean(th.querySelector("[href*='sort=id'], [href*='sort=-id']"));
        if (!isId) return;
        renameLeaves(th);
        th.querySelectorAll("span, a, button").forEach(renameLeaves);
      });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 50);
    };

    const stopDelay = afterHydration(schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      stopDelay();
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

/**
 * Globals use Payload tab preferences, which survive client-side navigation.
 * When you leave a global and open it again, start on the first section tab (Hero, etc.).
 */
function useResetGlobalTabsOnVisit() {
  const pathname = usePathname() || "";
  const prevPathRef = useRef<string | null>(null);
  const { getPreference, setPreference } = usePreferences();

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    const pathOnly = pathname.replace(/\?.*$/, "");
    const match = pathOnly.match(/\/globals\/([^/]+)\/?$/);
    if (!match) return;

    const prevOnly = prev?.replace(/\?.*$/, "") ?? "";
    if (prevOnly === pathOnly) return;

    const slug = match[1];
    const prefKey = `global-${slug}`;
    const tabsPrefKey = "tabs-";

    void (async () => {
      const existing = (await getPreference(prefKey)) as {
        fields?: Record<string, { tabIndex?: number }>;
      } | null;
      await setPreference(prefKey, {
        ...(existing ?? {}),
        fields: {
          ...(existing?.fields ?? {}),
          [tabsPrefKey]: {
            ...(existing?.fields?.[tabsPrefKey] ?? {}),
            tabIndex: 0,
          },
        },
      });
    })();

    const activateFirstTab = () => {
      const root = document.querySelector(".document-fields__main > .tabs-field");
      if (!(root instanceof HTMLElement)) return false;

      const buttons = [...root.querySelectorAll<HTMLButtonElement>(".tabs-field__tab-button")].filter(
        (btn) => !btn.classList.contains("tabs-field__tab-button--hidden"),
      );
      const first = buttons[0];
      if (!first) return false;

      if (first.classList.contains("tabs-field__tab-button--active")) return true;

      first.click();
      return first.classList.contains("tabs-field__tab-button--active");
    };

    let timer = 0;
    let tries = 0;
    const maxTries = 24;

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        tries += 1;
        const done = activateFirstTab();
        if (!done && tries < maxTries) schedule();
      }, 50);
    };

    const stopDelay = afterHydration(schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      stopDelay();
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname, getPreference, setPreference]);
}

/** Users list: sync column prefs only — DOM reorder broke row clicks and shoved checkboxes to the end. */
function useUsersColumnOrder() {
  const pathname = usePathname() || "";

  useEffect(() => {
    if (!/\/collections\/users\/?$/.test(pathname.replace(/\?.*$/, ""))) return;

    const desired = ["id", "email", "createdAt", "updatedAt", "enabled", "actions"];

    void fetch("/api/payload-preferences/collection-users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: {
          columns: desired.map((accessor) => ({ accessor, active: true })),
        },
      }),
    }).catch(() => undefined);
  }, [pathname]);
}

/** Shared admin polish that needs the live browser. */
export function AdminChrome({ children }: { children: ReactNode }) {
  useAdminFavicon();
  useEnforceAdminLanguage();
  useDesktopNav();
  useArabicCreateSpelling();
  useCreateTitle();
  useIdColumnLabel();
  useResetGlobalTabsOnVisit();
  useUsersColumnOrder();

  useEffect(() => {
    document.documentElement.classList.add("vx-admin");
  }, []);

  return (
    <>
      <AuthBrandPanel />
      <LoginIntro />
      <PasswordFieldToggle />
      {children}
    </>
  );
}
