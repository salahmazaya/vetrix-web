import type { Metadata } from "next";
import { Cairo, Poppins, Sora } from "next/font/google";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { locales } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";
import "../globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins-raw",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await requireLocale(params);
  return {
    title: {
      default: locale === "ar" ? "فيتريكس | جوهر التحول الرقمي الذكي" : "Vetrix | The Core of Smart Digital Transformation",
      template: "%s | Vetrix",
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    description:
      locale === "ar"
        ? "تبني فيتريكس مواقع وأنظمة إدارة وأدوات أتمتة وحلول برمجية ذكية تساعد الشركات على العمل بذكاء والتوسع بثقة."
        : "Vetrix builds reliable websites, CRM systems, automation tools, and intelligent software solutions that help businesses operate smarter, scale faster, and innovate with confidence.",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await requireLocale(params);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sora.variable} ${poppins.variable}${locale === "ar" ? ` ${cairo.variable}` : ""}`}
      suppressHydrationWarning
    >
      <body>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
