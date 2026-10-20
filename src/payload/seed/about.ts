import type { Payload } from "payload";
import { seedContext as context, type Upload } from "./media";
import { seedEn } from "./seedEn";

export async function seedAbout(payload: Payload, upload: Upload) {
  const badges = [
    ["ISO 9001", "iso-9001"],
    ["ISO 14001", "iso-14001"],
    ["ISO 20000-1", "iso-20000"],
    ["ISO 42001", "iso-42001"],
    ["ISO 45001", "iso-45001"],
    ["ISO 27001", "iso-27001"],
    ["ISO 22301", "iso-22301"],
  ];
  await payload.updateGlobal({
    slug: "about",
    context,
    data: seedEn({
      header: {
        title: "About Vetrix",
        headline: "Architecting The *Future* Of Operations.",
        intro:
          "Built on a single premise: complex business logic demands flawless digital execution. By fusing advanced software engineering with intelligent automation, static operations are transformed into self-sustaining ecosystems.",
      },
      identity: {
        eyebrow: "The Core Identity",
        title: "Architecting Flawless Infrastructure",
        image: await upload("about/core-identity.webp", "Digital globe surrounded by data and network icons."),
        stats: [
          { value: "85%", label: "Workflows Automated" },
          { value: "4x", label: "Operational Speedup" },
          { value: "150+", label: "Custom Systems Delivered" },
          { value: "99.9%", label: "System Reliability" },
        ],
      },
      mission: {
        eyebrow: "The Mission",
        title: "Simplifying Complex Operations.",
        body: "Transforming fragmented workflows into integrated, high-performance digital ecosystems that scale effortlessly.",
        points: [
          { text: "Automating repetitive business logic" },
          { text: "Unifying CRM data and analytics" },
          { text: "Delivering intuitive user experiences" },
          { text: "Eliminating operational bottlenecks" },
        ],
      },
      vision: {
        eyebrow: "The Vision",
        title: "Shaping Smarter Enterprise Environments",
        body: "Leading the evolution of business technology where intelligent automation and humans collaborate seamlessly.",
        points: [
          { text: "Integrating proactive AI assistants" },
          { text: "Setting benchmarks for system reliability" },
          { text: "Powering data-driven decision making" },
          { text: "Future-proofing modern digital products" },
        ],
      },
      whatWeDo: {
        eyebrow: "What We Do",
        title: "Building Reliable Digital Systems",
        description:
          "We are a software provider specializing in advanced tech solutions. We combine precise software engineering with intuitive UI design to deliver websites, CRM dashboards, and smart assistants that drive business growth.",
        items: [
          {
            title: "Reliable Websites",
            body: "Developing scalable, high-performance web platforms designed specifically to handle complex business environments.",
          },
          {
            title: "Intelligent AI",
            body: "Integrating AI assistants to automate daily tasks, reduce errors, and provide a fast, interactive user experience.",
          },
          {
            title: "Data Dashboards",
            body: "Designing smart control panels that transform massive, complex data into clear visual interfaces, streamlining management decisions.",
          },
          {
            title: "Seamless Integrations",
            body: "Connecting different systems and APIs to unify your digital workspace efficiently.",
          },
        ],
        button: { label: "See Case Studies", href: "/solutions" },
      },
      standard: {
        eyebrow: "The Vetrix Standard",
        title: "Engineered for the Enterprise.",
        description:
          "Delivering bespoke digital infrastructure. Every platform is architected to eliminate operational friction, secure core data, and accelerate business growth.",
        cards: [
          {
            title: "AI-Powered Interfaces",
            body: "Build custom intelligent assistants to automate daily enterprise interactions.",
            image: await upload("about/chat.webp", "Chat between a customer and the Ve assistant."),
          },
          {
            title: "Intelligent Workflows",
            body: "Convert simple text instructions into fully executed operational tasks.",
            image: await upload("about/workflow.webp", "A prompt flowing through to a processed task."),
          },
          {
            title: "System Integration",
            body: "Unify fragmented legacy software and third-party APIs into a single operational hub.",
            image: await upload("about/integrations.webp", "Logos of connected apps like Gmail, Slack and Notion."),
          },
          {
            title: "Custom Dashboards",
            body: "Transform massive operational data into clear, strategic visual metrics for executive control.",
            image: await upload("about/dashboards.webp", "Layered glass dashboard panels with charts."),
          },
          {
            title: "Enterprise Scalability",
            body: "Deploy resilient cloud infrastructure engineered to support massive data loads and global expansion.",
            image: await upload("about/globe.webp", "Glass globe filled with binary data."),
          },
        ],
      },
      technologies: {
        eyebrow: "Our Technologies",
        title: "Powered By Modern Infrastructure",
        description: "Battle-tested frameworks and cloud architecture powering our systems",
        badges: await Promise.all(
          badges.map(async ([name, file]) => ({ name, logo: await upload(`about/${file}.webp`, `${name} certified`) })),
        ),
      },
    }),
  });
}
