"use client";

import { Link, useConfig, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";

/** Sidebar sign-out, aligned like the home link. */
export function LogoutButton() {
  const { config } = useConfig();
  const { i18n } = useTranslation();
  const ar = i18n.language?.startsWith("ar");
  const href = formatAdminURL({
    adminRoute: config.routes.admin,
    path: config.admin.routes.logout,
  });

  return (
    <Link className="nav__link vx-nav-logout" href={href} id="nav-logout" prefetch={false}>
      <span className="nav__link-label">{ar ? "تسجيل الخروج" : "Log out"}</span>
    </Link>
  );
}
