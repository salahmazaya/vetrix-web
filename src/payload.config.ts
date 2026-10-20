import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ar } from "@payloadcms/translations/languages/ar";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig, type CollectionConfig, type Config, type Field, type GlobalConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { defaultLocale, locales } from "./lib/i18n";
import { translateAdmin } from "./payload/fields/labels";
import { localizeFields } from "./payload/fields/localize";

import { Media } from "./payload/collections/Media";
import { Messages } from "./payload/collections/Messages";
import { SitePages } from "./payload/collections/SitePages";
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

/**
 * `pg` currently treats `prefer`, `require`, and `verify-ca` as `verify-full` and warns on every connect.
 * Spell the current behavior explicitly so the warning does not show up as a console error.
 */
function databaseUrl() {
  const raw = process.env.DATABASE_URL || "";
  if (!raw) return raw;
  try {
    const url = new URL(raw);
    const mode = url.searchParams.get("sslmode");
    if (mode === "prefer" || mode === "require" || mode === "verify-ca") {
      url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
  } catch {
    return raw;
  }
}

const localeLabel = {
  en: { en: "English", ar: "الإنجليزية" },
  ar: { en: "Arabic", ar: "العربية" },
} as const;

function withBilingualCopyFields(config: CollectionConfig): CollectionConfig {
  return { ...config, fields: translateAdmin(localizeFields(config.fields)) };
}

function withBilingualGlobalFields(config: GlobalConfig): GlobalConfig {
  return { ...config, fields: translateAdmin(localizeFields(config.fields)) };
}

function withSitePagesListCell(config: CollectionConfig): CollectionConfig {
  if (config.slug !== "site-pages") return config;
  return {
    ...config,
    fields: config.fields.map((field): Field => {
      if ("name" in field && (field.name === "slug" || field.name === "title_en")) {
        const Cell =
          field.name === "slug"
            ? "@/payload/admin/cells/SlugCell#SlugCell"
            : "@/payload/admin/cells/BilingualTitleCell#BilingualTitleCell";
        return {
          ...field,
          admin: {
            ...field.admin,
            components: {
              ...field.admin?.components,
              Cell,
            },
          },
        } as Field;
      }
      return field;
    }),
  };
}

export function createPayloadConfig(): Config {
  return {
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " | Vetrix",
      icons: [
        { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
        { rel: "apple-touch-icon", url: "/favicon.svg" },
      ],
    },
    theme: "light" as const,
    avatar: {
      Component: "@/payload/admin/AccountChip#AccountChip",
    },
    components: {
      graphics: {
        Logo: "@/payload/admin/Logo#Logo",
        Icon: "@/payload/admin/Icon#Icon",
      },
      providers: ["@/payload/admin/AdminChrome#AdminChrome"],
      beforeNav: ["@/payload/admin/NavBrand#NavBrand"],
      beforeNavLinks: ["@/payload/admin/DashboardLink#DashboardLink"],
      logout: {
        Button: "@/payload/admin/LogoutButton#LogoutButton",
      },
      actions: ["@/payload/admin/UiLanguageSwitch#UiLanguageSwitch"],
      views: {
        dashboard: {
          Component: "@/payload/admin/Dashboard#Dashboard",
        },
      },
    },
  },
  i18n: {
    supportedLanguages: {
      en: {
        ...en,
        translations: {
          ...en.translations,
          general: {
            ...en.translations.general,
            collections: "Management",
            globals: "Page settings",
          },
        },
      },
      ar: {
        ...ar,
        translations: {
          ...ar.translations,
          general: {
            ...ar.translations.general,
            // Upstream typo: "أنشاء" → correct Arabic spelling
            createNew: "إنشاء جديد",
            createNewLabel: "إنشاء {{label}} جديد",
            creatingNewLabel: "جاري إنشاء {{label}} جديد",
            collections: "الإدارة",
            globals: "إعدادات الصفحات",
          },
          upload: {
            ...ar.translations.upload,
            bulkUpload: "رفع عدة ملفات",
          },
        },
      },
    },
    fallbackLanguage: defaultLocale,
  },
  localization: {
    locales: locales.map((code) => ({
      code,
      label: localeLabel[code],
      rtl: code === "ar",
      fallbackLocale: code === defaultLocale ? undefined : defaultLocale,
    })),
    defaultLocale,
    fallback: true,
  },
  collections: [
    {
      ...Users,
      labels: { singular: { en: "User", ar: "مستخدم" }, plural: { en: "Users", ar: "المستخدمون" } },
    },
    {
      ...withBilingualCopyFields(Media),
      labels: { singular: { en: "Media", ar: "ملف" }, plural: { en: "Media", ar: "الوسائط" } },
    },
    {
      ...Messages,
      fields: translateAdmin(Messages.fields),
      labels: { singular: { en: "Message", ar: "رسالة" }, plural: { en: "Messages", ar: "الرسائل" } },
      admin: {
        ...Messages.admin,
        description: { en: "Sent from the Contact page", ar: "وصلت من صفحة التواصل" },
      },
    },
    withSitePagesListCell(withBilingualCopyFields(SitePages)),
  ],
  globals: [Header, Home, AiCore, About, Solutions, Contact, Faq, Cta, Footer].map((global) => ({
    ...withBilingualGlobalFields(global),
    label: (
      {
        header: { en: "Navigation", ar: "الهيدر" },
        home: { en: "Home Page", ar: "الصفحة الرئيسية" },
        aiCore: { en: "AI Core Page", ar: "صفحة الذكاء الاصطناعي" },
        about: { en: "About Page", ar: "صفحة من نحن" },
        solutions: { en: "Solutions Page", ar: "صفحة الحلول" },
        contact: { en: "Contact Page", ar: "صفحة التواصل" },
        faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
        cta: { en: "Call to Action", ar: "دعوة للتواصل" },
        footer: { en: "Footer", ar: "الفوتر" },
      } as const
    )[global.slug],
  })),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl() },
    // In production the tables are created and updated by these migrations when the server starts
    prodMigrations: migrations,
  }),
  sharp,
  // First start fills the admin with the site's current content
  onInit: seed,
  };
}

export default buildConfig(createPayloadConfig());
