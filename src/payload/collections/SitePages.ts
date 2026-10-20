import type { CollectionConfig, Field } from "payload";
import { revalidateTag } from "next/cache";
import { highlightTitleField } from "../fields";
import { actionsField, enabledField } from "../fields/listExtras";
import { SITE_PAGES_TAG } from "@/lib/site-pages";

/** Visitor-facing pages created from the dashboard (slug + bilingual copy). */
export const SitePages: CollectionConfig = {
  slug: "site-pages",
  labels: {
    singular: { en: "Page", ar: "صفحة" },
    plural: { en: "Pages", ar: "الصفحات" },
  },
  admin: {
    group: { en: "Page settings", ar: "إعدادات الصفحات" },
    useAsTitle: "slug",
    defaultColumns: ["slug", "title_en", "enabled", "updatedAt", "actions"],
    description: {
      en: "Creates a new URL on the public site with the standard page header and content area.",
      ar: "تُنشئ رابطًا جديدًا على الموقع مع هيدر الصفحة ومنطقة المحتوى.",
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (typeof data?.slug === "string") {
          data.slug = data.slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        }
        return data;
      },
    ],
    afterChange: [
      ({ doc, req }) => {
        if (!req.context?.skipRevalidate) {
          try {
            revalidateTag(SITE_PAGES_TAG, { expire: 0 });
          } catch {
            /* seed / scripts */
          }
        }
        return doc;
      },
    ],
    afterDelete: [
      ({ doc, req }) => {
        if (!req.context?.skipRevalidate) {
          try {
            revalidateTag(SITE_PAGES_TAG, { expire: 0 });
          } catch {
            /* seed / scripts */
          }
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: {
          en: "URL path without slashes, e.g. privacy-policy → /en/privacy-policy",
          ar: "مسار الرابط بدون شرطات، مثل: privacy-policy",
        },
      },
    },
    { name: "title", type: "text", required: true },
    {
      ...highlightTitleField("headline"),
      required: false,
      admin: {
        description: {
          en: "Large headline in the blue band. Leave empty to use the page title.",
          ar: "العنوان الكبير في الشريط الأزرق. اتركه فارغًا لاستخدام عنوان الصفحة.",
        },
      },
    } as Field,
    {
      name: "intro",
      type: "textarea",
      required: false,
      admin: {
        description: {
          en: "Short intro under the headline in the blue band.",
          ar: "مقدمة قصيرة تحت العنوان في الشريط الأزرق.",
        },
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      label: { en: "Content", ar: "المحتوى" },
      admin: {
        description: {
          en: "Main page body shown below the header section.",
          ar: "محتوى الصفحة الرئيسي أسفل قسم الهيدر.",
        },
      },
    },
    enabledField,
    actionsField,
  ],
};
