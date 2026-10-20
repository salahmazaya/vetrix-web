import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { getSitePageBySlug, listSitePageSlugs, RESERVED_SITE_SLUGS } from "@/lib/site-pages";
import { languageAlternates, locales } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await listSitePageSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await requireLocale(params);
  const page = await getSitePageBySlug(slug, locale);
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro || page.content.slice(0, 160),
    alternates: languageAlternates(`/${slug}`),
  };
}

export default async function CustomSitePage({ params }: Props) {
  const { slug } = await params;
  if (RESERVED_SITE_SLUGS.has(slug)) notFound();

  const locale = await requireLocale(params);
  const page = await getSitePageBySlug(slug, locale);
  if (!page) notFound();

  return (
    <InnerPage locale={locale}>
      <PageHeader
        locale={locale}
        compact
        content={{ title: page.title, headline: page.headline, intro: page.intro || page.title }}
      />
      <section className="page-px py-14 md:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="custom-page-body text-base leading-8 text-navy/85 whitespace-pre-wrap md:text-[17px] md:leading-9">
            {page.content}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
