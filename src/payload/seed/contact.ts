import type { Payload } from "payload";
import { seedContext as context } from "./media";

export async function seedContact(payload: Payload) {
  await payload.updateGlobal({
    slug: "contact",
    context,
    data: {
      header: {
        title: "Contact Us",
        headline: "Request *Technical* Consultation.",
        intro:
          "Looking to upgrade business operations with custom software and smart automation? Share the project details below to connect with a technical expert.",
      },
      form: {
        title: "Ready To Build Better Systems?",
        nameLabel: "Full Name",
        emailLabel: "Email",
        subjectLabel: "Subject",
        messageLabel: "Message",
        submitLabel: "Submit",
        successTitle: "Message received.",
        successMessage: "Thanks for reaching out. A technical expert will get back to you within one business day.",
      },
    },
  });
}
