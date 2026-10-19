import type { Metadata } from "next";
import { IdentityCard } from "@/components/about/IdentityCard";
import { StandardBento } from "@/components/about/StandardBento";
import { Technologies } from "@/components/about/Technologies";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { getGlobal } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About | Vetrix",
  description: "Who Vetrix is, what we build and the standard we hold every system to.",
};

export default async function AboutPage() {
  const page = await getGlobal("about");
  return (
    <InnerPage>
      <PageHeader content={page.header}>
        <IdentityCard content={page} />
      </PageHeader>
      <div className="h-20 md:h-[86px]" />
      <WhatWeDo content={page.whatWeDo} />
      <StandardBento content={page.standard} />
      <Technologies content={page.technologies} />
    </InnerPage>
  );
}
