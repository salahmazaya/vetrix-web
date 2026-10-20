"use client";

import { useTranslation } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const FORM_SELECTOR = ".login__form, .create-first-user__form, .forgot-password form";

/** Soft heading above auth form fields (prepended inside the form). */
export function LoginIntro() {
  const pathname = usePathname() || "";
  const { i18n } = useTranslation();
  const ar = i18n.language?.startsWith("ar");
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const forgot = /\/admin\/forgot\/?$/.test(pathname);
  const createFirst = /\/admin\/create-first-user\/?$/.test(pathname);

  useEffect(() => {
    const find = () => {
      const el = document.querySelector(FORM_SELECTOR);
      return el instanceof HTMLElement ? el : null;
    };

    let mount: HTMLDivElement | null = null;

    const attach = (form: HTMLElement) => {
      if (mount?.isConnected && mount.parentElement === form) {
        if (form.firstChild !== mount) form.insertBefore(mount, form.firstChild);
        setAnchor(mount);
        return;
      }
      mount?.remove();
      mount = document.createElement("div");
      mount.className = "vx-login-intro-mount";
      form.insertBefore(mount, form.firstChild);
      setAnchor(mount);
    };

    const found = find();
    if (found) {
      attach(found);
    }

    const observer = new MutationObserver(() => {
      const el = find();
      if (el) attach(el);
      else {
        mount?.remove();
        mount = null;
        setAnchor(null);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mount?.remove();
      mount = null;
    };
  }, [pathname]);

  let title: string;
  let subtitle: string;
  if (forgot) {
    title = ar ? "نسيت كلمة المرور؟" : "Forgot your password?";
    subtitle = ar
      ? "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين."
      : "Enter your email and we will send you a reset link.";
  } else if (createFirst) {
    title = ar ? "إنشاء أول مستخدم" : "Create your first user";
    subtitle = ar ? "أنشئ حساب المدير للبدء في استخدام لوحة التحكم." : "Set up the admin account to access the dashboard.";
  } else {
    title = ar ? "مرحبًا بعودتك" : "Welcome back";
    subtitle = ar ? "سجّل الدخول ببريدك الإلكتروني وكلمة المرور." : "Sign in with your email and password.";
  }

  const intro = (
    <div className="vx-login-intro">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );

  if (!anchor) return null;
  return createPortal(intro, anchor);
}
