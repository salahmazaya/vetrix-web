import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { CoreSolutions } from "@/components/solutions/CoreSolutions";
import { DeliverCard } from "@/components/solutions/DeliverCard";
import { Methodology } from "@/components/solutions/Methodology";
import { getGlobal } from "@/lib/cms";
import { languageAlternates } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params);
  const page = await getGlobal("solutions", locale);
  return {
    title: page.header.title,
    description: page.header.intro,
    alternates: languageAlternates("/solutions"),
  };
}

export default async function SolutionsPage({ params }: Props) {
  const locale = await requireLocale(params);
  const page = await getGlobal("solutions", locale);
  return (
    <InnerPage locale={locale}>
      <PageHeader locale={locale} content={page.header}>
        <DeliverCard content={page.deliver} />
      </PageHeader>
      <CoreSolutions content={page.core} />
      <Methodology content={page.methodology} />
    </InnerPage>
  );
}
