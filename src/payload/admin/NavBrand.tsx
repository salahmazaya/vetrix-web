"use client";

import { Link, useConfig } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";

/** Sticky brand mark. Opens the dashboard home. */
export function NavBrand() {
  const { config } = useConfig();
  const href = formatAdminURL({ adminRoute: config.routes.admin, path: "/" });

  return (
    <Link className="vx-nav-brand" href={href} prefetch={false}>
      <img src="/images/logo.svg" alt="Vetrix" className="vx-logo" />
    </Link>
  );
}
