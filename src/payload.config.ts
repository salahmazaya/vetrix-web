import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { Cta } from "./payload/globals/Cta";
import { Footer } from "./payload/globals/Footer";
import { Header } from "./payload/globals/Header";
import { Home } from "./payload/globals/Home";
import { seed } from "./payload/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | Vetrix Admin" },
  },
  collections: [Users, Media],
  globals: [Header, Home, Cta, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || "" } }),
  sharp,
  // First start fills the admin with the site's current content
  onInit: seed,
});
