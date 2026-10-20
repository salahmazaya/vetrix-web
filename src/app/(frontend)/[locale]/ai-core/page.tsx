import type { Metadata } from "next";
import { BrainCard } from "@/components/ai-core/BrainCard";
import { FrameworkCard } from "@/components/ai-core/FrameworkCard";
import { GridBand } from "@/components/ai-core/GridBand";
import { HowItWorks } from "@/components/ai-core/HowItWorks";
import { ScaleFeatures } from "@/components/ai-core/ScaleFeatures";
import { StatsRow } from "@/components/ai-core/StatsRow";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { getGlobal } from "@/lib/cms";
import { languageAlternates } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params);
  const page = await getGlobal("aiCore", locale);
  return {
    title: page.header.title,
    description: page.header.intro,
    alternates: languageAlternates("/ai-core"),
  };
}

export default async function AiCorePage({ params }: Props) {
  const locale = await requireLocale(params);
  const page = await getGlobal("aiCore", locale);
  return (
    <InnerPage locale={locale}>
      <PageHeader locale={locale} content={page.header}>
        <BrainCard content={page.brain} />
      </PageHeader>
      <StatsRow stats={page.numbers?.stats ?? []} />
      <ScaleFeatures content={page.features} />
      <GridBand />
      <FrameworkCard content={page.framework} />
      <HowItWorks content={page.steps} />
    </InnerPage>
  );
}
