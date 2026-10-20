"use client";

import { Link, useConfig, useTranslation } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import { formatAdminURL } from "payload/shared";

/** First sidebar item: the statistics home. */
export function DashboardLink() {
  const pathname = usePathname() || "";
  const { config } = useConfig();
  const { i18n } = useTranslation();
  const href = formatAdminURL({ adminRoute: config.routes.admin, path: "/" });
  const bare = href.replace(/\/$/, "");
  const active = pathname === href || pathname === bare || pathname === `${bare}/`;
  const ar = i18n.language?.startsWith("ar");
  const className = `nav__link vx-nav-overview${active ? " active" : ""}`;
  const label = <span className="nav__link-label">{ar ? "الرئيسية" : "Home"}</span>;

  if (active) {
    return (
      <div className={className} id="nav-overview">
        {label}
      </div>
    );
  }

  return (
    <Link className={className} href={href} id="nav-overview" prefetch={false}>
      {label}
    </Link>
  );
}
