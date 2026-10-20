"use client";

import { useTranslation } from "@payloadcms/ui";

/** Dashboard UI language (labels/buttons) — independent of content locale EN/AR. */
export function UiLanguageSwitch() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("ar") ? "ar" : "en";

  const setLang = (lang: "en" | "ar") => {
    if (lang === current) return;
    document.cookie = `payload-lng=${lang};path=/;max-age=31536000;samesite=lax`;
    sessionStorage.removeItem("vx-lng-fix");
    window.location.reload();
  };

  return (
    <div className="vx-ui-lang" role="group" aria-label="Dashboard language">
      <button
        type="button"
        className={current === "en" ? "is-active" : undefined}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={current === "ar" ? "is-active" : undefined}
        onClick={() => setLang("ar")}
      >
        AR
      </button>
    </div>
  );
}
