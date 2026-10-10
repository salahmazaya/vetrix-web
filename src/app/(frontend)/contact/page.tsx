import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { InnerPage } from "@/components/inner/InnerPage";
import { PageHeader } from "@/components/inner/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { getGlobal } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact | Vetrix",
  description: "Request a technical consultation with the Vetrix team.",
};

export default async function ContactPage() {
  const page = await getGlobal("contact");
  return (
    <InnerPage>
      <PageHeader content={page.header}>
        <Reveal>
          <ContactForm content={page.form} />
        </Reveal>
      </PageHeader>
    </InnerPage>
  );
}
