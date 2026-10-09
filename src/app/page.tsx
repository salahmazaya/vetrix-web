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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MeetVe />
        <AboutIntro />
        <VetrixEdge />
        <OurProcess />
        <ProvenImpact />
        <ScaleSmarter />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
