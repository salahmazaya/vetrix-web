import type { Payload } from "payload";
import { seedContext as context } from "./media";

export async function seedFaq(payload: Payload) {
  await payload.updateGlobal({
    slug: "faq",
    context,
    data: {
      eyebrow: "FAQ",
      title: "Everything You Need to Know",
      description: "Clear, concise answers addressing the engineering process, system scalability, and AI capabilities.",
      items: [
        {
          question: "How does the V-Core AI Assistant integrate into daily operations?",
          answer:
            "V-Core acts as a conversational and analytical layer embedded directly into the custom software. It learns operational patterns, executes complex tasks via simple prompts, and syncs data seamlessly across platforms.",
        },
        {
          question: "Are the automated workflows and AI systems secure?",
          answer:
            "Yes. Every system is built with role-based access, encrypted data in transit and at rest, and full audit logs, so automations only ever act within the permissions your team sets.",
        },
        {
          question: "What is the typical timeline for deploying a custom system?",
          answer:
            "Most projects move from discovery to launch in 6 to 12 weeks, depending on scope and integrations. You see working software early and at every stage, not only at the end.",
        },
        {
          question: "What happens after the digital ecosystem is deployed?",
          answer:
            "We monitor, maintain and keep improving it. V-Core keeps learning from daily operations, and our team stays on hand for new features, scaling and support.",
        },
        {
          question: "What types of systems does Vetrix engineer?",
          answer:
            "Custom CRMs, enterprise web platforms, real-time dashboards, workflow automation and AI assistants, all built around the way your business already works.",
        },
      ],
    },
  });
}
