import type { Payload } from "payload";
import { seedContext as context, type Upload } from "./media";

export async function seedSolutions(payload: Payload, upload: Upload) {
  const card = async (title: string, body: string, label: string, image: string, alt: string) => ({
    title,
    body,
    link: { label, href: "/contact" },
    image: await upload(`solutions/${image}.webp`, alt),
  });
  await payload.updateGlobal({
    slug: "solutions",
    context,
    data: {
      header: {
        title: "Vetrix Solutions",
        headline: "Engineering Systems Built For *Growth*.",
        intro:
          "From intelligent AI agents to high-performance dashboards, we build scalable software solutions designed to resolve operational bottlenecks and drive enterprise efficiency.",
      },
      deliver: {
        title: "What We *Deliver*",
        body: "Explore our specialized solutions engineered for modern enterprises. Whether you are automating intricate workflows, unifying fragmented databases, or deploying dedicated AI assistants, each system is architected to scale seamlessly with your organization.",
        button: { label: "Discover The Solutions", href: "#core-solutions" },
        image: await upload("solutions/cube.webp", "Glass cube holding a glowing circuit sphere."),
      },
      core: {
        eyebrow: "Our Core Solutions",
        title: "High-Throughput Solutions For Complex Workflows",
        description:
          "Tailored software platforms engineered to eliminate operational friction and unify your business operations into one connected environment.",
        cards: [
          await card(
            "Unified CRM & Client Portals",
            "Custom platforms built to centralize client interactions, automate sales pipelines, and eliminate generic software bottlenecks across your teams.",
            "Explore CRM Solutions",
            "crm",
            "A core sphere linked to orbiting client panels.",
          ),
          await card(
            "Real-Time Decision Command Centers",
            "High-speed control panels that convert complex operational metrics into clear, visual interfaces for confident executive decision-making.",
            "View Dashboard Architecture",
            "command-center",
            "Glowing control dial with glass rings.",
          ),
          await card(
            "Intelligent Task Automation Agents",
            "Context-aware AI assistants embedded into internal systems to resolve repetitive inquiries, audit operational data, and execute daily tasks.",
            "Discover AI Assistants",
            "automation-agents",
            "Glass sphere filled with glowing circuits.",
          ),
          await card(
            "Resilient Enterprise Web Portals",
            "Scalable, high-throughput web architecture designed to handle heavy traffic loads while delivering smooth and intuitive user experiences.",
            "Learn About Web Systems",
            "web-portals",
            "Ve holding an orb linked to dashboard panels.",
          ),
          await card(
            "Self-Executing Business Logic",
            "End-to-end automation pipelines that replace manual handoffs, reduce administrative friction, and streamline cross-team workflows.",
            "Explore Automation Workflows",
            "business-logic",
            "Ve at a console sending data streams to connected devices.",
          ),
          await card(
            "Ecosystem Data Synchronization",
            "Seamlessly connecting legacy databases, internal software, and third-party APIs into one synchronous digital backbone.",
            "Review Integration Protocols",
            "data-sync",
            "Energy sphere circled by chrome rings.",
          ),
        ],
      },
      methodology: {
        eyebrow: "Engineering Methodology",
        title: "From Architecture Design To Global Deployment",
        description:
          "We deconstruct your operational bottlenecks, existing data flows, and infrastructure limits to design a purpose-built system blueprint.",
        steps: [
          {
            title: "System Discovery & Logic Mapping",
            body: "We deconstruct your operational bottlenecks, existing data flows, and infrastructure limits to design a purpose-built system blueprint.",
          },
          {
            title: "Bespoke Implementation & UI Synthesis",
            body: "Engineering clean, performant backends combined with human-centered, responsive interfaces that reduce user error.",
          },
          {
            title: "Enterprise Rollout & Continuous Monitoring",
            body: "Zero-downtime deployment into high-security cloud environments with end-to-end logging and automated failover protocols.",
          },
        ],
      },
    },
  });
}
