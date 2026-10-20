import type { Metadata } from "next";
import { IdentityCard } from "@/components/about/IdentityCard";
import { StandardBento } from "@/components/about/StandardBento";
import { Technologies } from "@/components/about/Technologies";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { getGlobal } from "@/lib/cms";
import { languageAlternates } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params);
  const page = await getGlobal("about", locale);
  return {
    title: page.header.title,
    description: page.header.intro,
    alternates: languageAlternates("/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const locale = await requireLocale(params);
  const page = await getGlobal("about", locale);
  return (
    <InnerPage locale={locale}>
      <PageHeader locale={locale} content={page.header}>
        <IdentityCard content={page} />
      </PageHeader>
      <div className="h-20 md:h-[86px]" />
      <WhatWeDo content={page.whatWeDo} />
      <StandardBento content={page.standard} />
      <Technologies content={page.technologies} />
    </InnerPage>
  );
}
