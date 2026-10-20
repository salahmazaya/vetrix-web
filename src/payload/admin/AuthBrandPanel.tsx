"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mountAuthBrandArt } from "./authBrandArt";
import { Logo } from "./Logo";

const NATIVE_BRAND_SELECTOR =
  ".template-minimal.login .login__brand, .template-minimal.create-first-user .create-first-user__brand";

/** Brand column on forgot-password; decorates Payload's native brand column on login. */
export function AuthBrandPanel() {
  const pathname = usePathname() || "";
  const panelRef = useRef<HTMLDivElement>(null);
  const [forgotWrap, setForgotWrap] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const sync = () => {
      document.querySelectorAll<HTMLElement>(NATIVE_BRAND_SELECTOR).forEach(mountAuthBrandArt);
      const wrap = document.querySelector(".template-minimal.forgot-password .template-minimal__wrap");
      setForgotWrap(wrap instanceof HTMLElement ? wrap : null);
      if (panelRef.current) mountAuthBrandArt(panelRef.current);
    };

    sync();
    const id = window.requestAnimationFrame(sync);
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  const panel = (
    <div ref={panelRef} data-vx-brand-panel="true" className="login__brand vx-auth-brand-side">
      <Logo />
    </div>
  );

  if (forgotWrap) return createPortal(panel, forgotWrap);

  return (
    <div className="vx-auth-brand-home" aria-hidden="true" hidden>
      {panel}
    </div>
  );
}
