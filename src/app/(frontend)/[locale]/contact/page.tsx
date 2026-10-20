import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { getGlobal } from "@/lib/cms";
import { languageAlternates } from "@/lib/i18n";
import { requireLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params);
  const page = await getGlobal("contact", locale);
  return {
    title: page.header.title,
    description: page.header.intro,
    alternates: languageAlternates("/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const locale = await requireLocale(params);
  const page = await getGlobal("contact", locale);
  return (
    <InnerPage locale={locale}>
      <PageHeader locale={locale} content={page.header}>
        <Reveal>
          <ContactForm locale={locale} content={page.form} />
        </Reveal>
      </PageHeader>
    </InnerPage>
  );
}
