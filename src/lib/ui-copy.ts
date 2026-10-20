import type { Locale } from "./i18n";

/** Chrome strings that are not edited in the dashboard. Page copy lives in the CMS. */
export const uiCopy = {
  en: {
    language: "Language",
    homeAria: "Vetrix home",
    navLabel: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Home",
    breadcrumb: "Breadcrumb",
    loading: "Loading Vetrix",
    sending: "Sending",
    form: {
      missing: "Please fill in every field.",
      email: "Please enter a valid email address.",
      long: "One of the fields is too long.",
      failed: "Something went wrong. Please try again in a moment.",
    },
    process:
      "Ve sits at the center of your stack: it collects, normalizes, enriches and routes data from your existing apps into reporting, AI search, insights and third-party tools.",
  },
  ar: {
    language: "اللغة",
    homeAria: "الصفحة الرئيسية لفيتريكس",
    navLabel: "الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    home: "الرئيسية",
    breadcrumb: "مسار التنقل",
    loading: "جارٍ تحميل فيتريكس",
    sending: "جارٍ الإرسال",
    form: {
      missing: "من فضلك املأ كل الحقول.",
      email: "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.",
      long: "أحد الحقول أطول من المسموح.",
      failed: "حصل خطأ. حاول مرة أخرى بعد لحظات.",
    },
    process:
      "في يقف في قلب منظومتك: يجمع البيانات ويوحّدها وينقّيها ويوجّهها من تطبيقاتك الحالية إلى التقارير والبحث الذكي والرؤى وأدوات الطرف الثالث.",
  },
} as const;

export function copyFor(locale: Locale) {
  return uiCopy[locale];
}
