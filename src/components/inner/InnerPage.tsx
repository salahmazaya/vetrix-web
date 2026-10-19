import { CtaSection } from "../layout/CtaSection";
import { Footer } from "../layout/Footer";
import { Navbar } from "../layout/Navbar";
import { FaqSection } from "./FaqSection";
import { getGlobal } from "@/lib/cms";

/** Navigation, then the page's own sections, then the shared FAQ, call-to-action and footer. */
export async function InnerPage({ children }: { children: React.ReactNode }) {
  const [header, faq, cta, footer] = await Promise.all([
    getGlobal("header"),
    getGlobal("faq"),
    getGlobal("cta"),
    getGlobal("footer"),
  ]);
  return (
    <>
      <Navbar links={header.links ?? []} button={header.button} />
      <main>
        {children}
        <FaqSection content={faq} />
        <CtaSection content={cta} />
      </main>
      <Footer content={footer} />
    </>
  );
}
