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

export const metadata: Metadata = {
  title: "AI Core | Vetrix",
  description: "Ve Core, the AI engine built into every Vetrix system.",
};

export default async function AiCorePage() {
  const page = await getGlobal("aiCore");
  return (
    <InnerPage>
      <PageHeader content={page.header}>
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
