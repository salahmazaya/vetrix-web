import type { Payload } from "payload";
import { seedContext as context, type Upload } from "./media";
import { seedEn } from "./seedEn";

export async function seedAiCore(payload: Payload, upload: Upload) {
  await payload.updateGlobal({
    slug: "aiCore",
    context,
    data: seedEn({
      header: {
        title: "AI Core",
        headline: "Where *Deep* Tech Meets Business Logic",
        intro:
          "Born from a passion for automation and intelligent design, Vetrix bridges the gap between complex engineering and everyday business needs. We design enterprise-grade platforms and integrate smart AI assistants.",
      },
      brain: {
        title: "Meet The *Brain* Behind Your Business",
        body: "Ve Core is our proprietary AI engine designed to seamlessly integrate into your custom software. It doesn't just process data; it learns your workflows, automates complex tasks, and provides real-time insights to help you scale smarter. Ve transforms static software into a dynamic ecosystem. By understanding your unique business logic, it automates daily operations and scales your productivity effortlessly.",
        image: await upload("ai-core/ve-robot.webp", "Ve, the Vetrix AI assistant, waving."),
      },
      numbers: {
        stats: [
          { value: "4x", label: "Operational Speedup" },
          { value: "85%", label: "Workflows Automated" },
          { value: "150+", label: "Custom Systems Delivered" },
          { value: "99.9%", label: "System Reliability" },
        ],
      },
      features: {
        eyebrow: "Meet Ve",
        title: "Built for Scale. Powered by *Ve Core.*",
        cards: [
          {
            title: "Workflow Automation",
            body: "Skip manual data entry. V-Core instantly automates repetitive tasks across your custom systems, freeing your team.",
          },
          {
            title: "Predictive Analytics",
            body: "V-Core learns from your daily operations, analyzing patterns in real-time to provide actionable insights and forecast business trends with absolute precision.",
          },
          {
            title: "Seamless Integration",
            body: "Connect your favorite enterprise tools. V-Core acts as a central hub, syncing data seamlessly between your custom CRM and third-party platforms.",
          },
          {
            title: "Conversational Command",
            body: "Interact with your database using natural language. Just type what you need—from generating sales reports to managing leads.",
          },
        ],
      },
      framework: {
        eyebrow: "The Vetrix Framework",
        title: "From Concept to Deployment.",
        description:
          "Seamless integrations and intelligent AI systems do not happen by chance. Here is the exact roadmap used to engineer operations that scale effortlessly and perform without interruption.",
        image: await upload("ai-core/phone.webp", "Phone showing Ve asking: How can I help you?"),
      },
      steps: {
        eyebrow: "How it Works",
        title: "From Integration to Automation.",
        description:
          "Step into the future of enterprise software. This structured deployment ensures smooth data synchronization, rapid learning, and flawless execution across all operations.",
        items: [
          {
            title: "System Integration",
            body: "Connect V-Core directly to existing infrastructure, custom CRMs, and enterprise databases.",
          },
          {
            title: "Data Processing",
            body: "The AI engine analyzes operational patterns, historical data, and specific business logic.",
          },
          {
            title: "Intelligent Automation",
            body: "Execute complex workflows generate instant reports using conversational commands.",
          },
          {
            title: "Continuous Scaling",
            body: "The system learns and adapts daily, optimizing enterprise operations 24/7.",
          },
        ],
      },
    }),
  });
}
