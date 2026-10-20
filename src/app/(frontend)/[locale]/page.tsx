import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/AboutIntro";
import { Hero } from "@/components/home/Hero";
import { MeetVe } from "@/components/home/MeetVe";
import { OurProcess } from "@/components/home/OurProcess";
import { ProvenImpact } from "@/components/home/ProvenImpact";
import { ScaleSmarter } from "@/components/home/ScaleSmarter";
import { VetrixEdge } from "@/components/home/VetrixEdge";
import { CtaSection } from "@/components/layout/CtaSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getGlobal } from "@/lib/cms";
import { languageAlternates } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params);
  const home = await getGlobal("home", locale);
  const title = home.hero.title.replace(/\.$/, "");
  return {
    title: { absolute: `Vetrix | ${title}` },
    description: home.hero.description,
    alternates: languageAlternates("/"),
  };
}

export default async function Home({ params }: Props) {
  const locale = await requireLocale(params);
  const [header, home, cta, footer] = await Promise.all([
    getGlobal("header", locale),
    getGlobal("home", locale),
    getGlobal("cta", locale),
    getGlobal("footer", locale),
  ]);

  return (
    <>
      <Navbar links={header.links ?? []} button={header.button} />
      <main>
        <Hero content={home.hero} />
        <MeetVe content={home.meetVe} />
        <AboutIntro content={home.about} />
        <VetrixEdge content={home.edge} />
        <OurProcess content={home.process} />
        <ProvenImpact content={home.impact} />
        <ScaleSmarter content={home.scale} />
        <CtaSection content={cta} />
      </main>
      <Footer content={footer} />
    </>
  );
}
