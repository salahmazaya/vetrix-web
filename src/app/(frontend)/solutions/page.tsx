import type { Metadata } from "next";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { CoreSolutions } from "@/components/solutions/CoreSolutions";
import { DeliverCard } from "@/components/solutions/DeliverCard";
import { Methodology } from "@/components/solutions/Methodology";
import { getGlobal } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Solutions | Vetrix",
  description: "CRMs, command centers, AI agents, web portals and automation engineered for growth.",
};

export default async function SolutionsPage() {
  const page = await getGlobal("solutions");
  return (
    <InnerPage>
      <PageHeader content={page.header}>
        <DeliverCard content={page.deliver} />
      </PageHeader>
      <CoreSolutions content={page.core} />
      <Methodology content={page.methodology} />
    </InnerPage>
  );
}
