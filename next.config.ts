import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/media/**" },
      { pathname: "/api/media/file/**" },
    ],
  },
  // Uploaded files live in /media. Serve them as static files so a busy dashboard
  // cannot block the pictures already on the page.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/api/media/file/:path*", destination: "/media/:path*" }],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
