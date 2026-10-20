"use client";

import { useTranslation } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scanPasswordFields } from "./passwordToggle";

function isAuthSurface(pathname: string) {
  const path = pathname.replace(/\?.*$/, "");
  return (
    /\/admin\/login\/?$/.test(path) ||
    /\/admin\/create-first-user\/?$/.test(path) ||
    /\/admin\/forgot\/?$/.test(path) ||
    /\/admin\/reset\/?$/.test(path) ||
    /\/admin\/collections\/users\//.test(path)
  );
}

/** Show/hide eye on admin password fields (auth screens + user password fields). */
export function PasswordFieldToggle() {
  const pathname = usePathname() || "";
  const { i18n } = useTranslation();
  const ar = Boolean(i18n.language?.startsWith("ar"));
  const showLabel = ar ? "إظهار كلمة المرور" : "Show password";
  const hideLabel = ar ? "إخفاء كلمة المرور" : "Hide password";

  useEffect(() => {
    if (!isAuthSurface(pathname)) return;

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => scanPasswordFields(showLabel, hideLabel), 0);
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [hideLabel, pathname, showLabel]);

  return null;
}
