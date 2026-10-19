import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./payload/collections/Media";
import { Messages } from "./payload/collections/Messages";
import { Users } from "./payload/collections/Users";
import { About } from "./payload/globals/About";
import { AiCore } from "./payload/globals/AiCore";
import { Contact } from "./payload/globals/Contact";
import { Cta } from "./payload/globals/Cta";
import { Faq } from "./payload/globals/Faq";
import { Footer } from "./payload/globals/Footer";
import { Header } from "./payload/globals/Header";
import { Home } from "./payload/globals/Home";
import { Solutions } from "./payload/globals/Solutions";
import { migrations } from "./migrations";
import { seed } from "./payload/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | Vetrix Admin" },
  },
  collections: [Users, Media, Messages],
  globals: [Header, Home, AiCore, About, Solutions, Contact, Faq, Cta, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // In production the tables are created and updated by these migrations when the server starts
    prodMigrations: migrations,
  }),
  sharp,
  // First start fills the admin with the site's current content
  onInit: seed,
});
