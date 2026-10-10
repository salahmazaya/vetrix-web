// The site's content as designed; the seed copies it into the admin on first start.

const tile = (name: string, logo: string, highlighted = false) => ({ name, logo, highlighted });

export const content = {
  header: {
    links: [
      { label: "Home", href: "/" },
      { label: "AI Core", href: "/ai-core" },
      { label: "About", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Contact", href: "/contact" },
    ],
    button: { label: "Start Your Project", href: "/contact" },
  },

  cta: {
    eyebrow: "Ready to Scale?",
    title: "Let’s Build Your\nIntelligent Software.",
    description:
      "Schedule a brief discovery call to see how Vetrix can automate your workflows, build your custom systems, and accelerate your growth.",
    button: { label: "Book a Free Consultation", href: "/contact" },
  },

  footer: {
    tagline: "Building the intelligent systems that scale your business.",
    socials: [
      { platform: "facebook" as const, url: "#" },
      { platform: "instagram" as const, url: "#" },
      { platform: "x" as const, url: "#" },
      { platform: "linkedin" as const, url: "#" },
    ],
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Home", href: "/" },
          { label: "AI Core", href: "/ai-core" },
          { label: "About", href: "/about" },
          { label: "Solutions", href: "/solutions" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "/contact" },
          { label: "Contact Us", href: "/contact" },
          { label: "FAQs", href: "/ai-core#faq" },
          { label: "Live Chat", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Copyright Notice", href: "#" },
          { label: "Cookie Policy", href: "#" },
        ],
      },
    ],
  },

  home: {
    hero: {
      title: "The Core of Smart Digital Transformation.",
      description:
        "Vetrix builds reliable websites, CRM systems, automation tools, and intelligent software solutions that help businesses operate smarter, scale faster, and innovate with confidence.",
      primaryButton: { label: "Start Your Project", href: "/contact" },
      secondaryButton: { label: "Explore Solutions", href: "/solutions" },
    },

    meetVe: {
      eyebrow: "Meet Ve",
      title: "Complex Operations, Simple Prompts",
      description:
        "An intelligent digital assistant designed to help businesses discover the right software solution faster. From websites and CRM systems to custom dashboards and internal management platforms.",
      introCard: {
        title: "Zero Effort.",
        highlight: "Pure Intelligence",
        caption: "Where complex code meets autonomous execution.",
      },
      trustedCard: { label: "Trusted by", value: "12K", caption: "Innovators" },
      generateLabel: "Generate",
      statCard: { value: "20M", label: "Smart Operations" },
      chipsTitle: "Custom Software Solutions",
      heart: {
        title: "The Intelligent Heart of Your Business.",
        features: [
          {
            title: "Smart Workflows",
            body: "Explore multiple operational paths and automated decision-making",
          },
          {
            title: "Predictive Insights",
            body: "Extract key data points and boost precision with deep analysis.",
          },
        ],
      },
    },

    about: {
      eyebrow: "About Vetrix",
      intro: [
        { text: "We're a passionate team of ", highlight: false },
        { text: "innovators obsessed with", highlight: true },
        { text: " using AI to streamline business operations. ", highlight: false },
        { text: "We believe", highlight: true },
        { text: " intelligent software can revolutionize how enterprises scale, ", highlight: false },
        { text: "making", highlight: true },
        { text: " custom automation and reliable systems ", highlight: false },
        { text: "faster and", highlight: true },
        { text: " more ", highlight: false },
        { text: "accessible", highlight: true },
      ],
      button: { label: "More About Us", href: "/about" },
      pills: [
        { label: "Custom CRMs", color: "#f97316" },
        { label: "Smart Automation", color: "#8b5cf6" },
        { label: "Scalable Code", color: "#22c55e" },
        { label: "Data Insights", color: "#3b82f6" },
        { label: "Increased Output", color: "#ef4444" },
        { label: "Super-Brain", color: "#eab308" },
        { label: "Style Variations", color: "#d946ef" },
      ],
      accessLabel: "You will access",
    },

    edge: {
      eyebrow: "The Vetrix Edge",
      title: "Complex Operations, Elegant Solutions",
      description:
        "We combine powerful code, custom architecture, and built-in AI to transform how modern businesses operate, scale, and automate their daily workflows.",
      cards: [
        {
          title: "Scalable Web Solutions",
          body: "We design and build high-performance, responsive websites and enterprise platforms tailored to deliver flawless user experiences and drive conversions.",
        },
        {
          title: "Tailored CRM Systems",
          body: "Take full control of your business data. We build custom management tools and CRMs that centralize your operations, sales, and customer relations.",
        },
        {
          title: "Intelligent Automation",
          body: "Eliminate repetitive tasks. Our smart automation tools streamline your workflows, allowing your team to focus on high-value growth.",
        },
        {
          title: "Proprietary AI Engines",
          body: "Future-proof your software. We embed custom AI models directly into your systems to analyze data, predict trends.",
        },
      ],
    },

    process: {
      eyebrow: "Our Process",
      title: "From Logic to Launch",
      description:
        "We don't just write code; we build the future of your operations. Our step-by-step process ensures your custom CRM, website, or automation tool is built to last.",
      stages: ["COLLECT", "NORMALIZE", "DENOISE", "TRANSFORM", "ROUTE", "ENRICH", "GOVERN"].map((label) => ({ label })),
      categories: ["Security", "Application", "IoT/OT", "Observability"].map((label) => ({ label })),
      sources: [
        tile("Oracle", "oracle"),
        tile("Mailchimp", "mailchimp", true),
        tile("Actuators", "actuators"),
        tile("Linux", "linux", true),
        tile("Apache", "feather"),
        tile("Sumo Logic", "sumo"),
        tile("Cisco", "cisco"),
        tile("Wiz", "wiz"),
        tile("SAP", "sap", true),
        tile("Workday", "workday", true),
        tile("Kubernetes", "kubernetes"),
        tile("MySQL", "mysql", true),
        tile("QuickBooks", "quickbooks"),
        tile("AWS", "aws"),
        tile("CrowdStrike", "crowdstrike"),
        tile("Sensors", "sensors"),
        tile("Palo Alto Networks", "paloalto"),
        tile("Zscaler", "zscaler"),
        tile("Wireshark", "wireshark"),
        tile("Google", "google", true),
        tile("Dropbox", "dropbox", true),
        tile("Monitoring", "sunburst"),
        tile("Salesforce", "salesforce"),
        tile("Cloudflare", "cloudflare"),
        tile("Custom apps", "custom-apps", true),
        tile("IBM", "ibm", true),
        tile("Integrations", "hex"),
      ],
      reef: {
        title: "Reef",
        chips: ["Visualization", "Reporting", "Ai Search", "Insights"].map((label) => ({ label })),
      },
      toolsTitle: "Third Party Tools",
      groups: [
        { label: "SIEM", tiles: [tile("SIEM", "siem-1"), tile("QRadar", "siem-2"), tile("Splunk", "splunk")] },
        {
          label: "Observability",
          tiles: [tile("Datadog", "obs-1"), tile("Monte Carlo", "obs-mc"), tile("Observability", "obs-3", true)],
        },
        {
          label: "Storage",
          tiles: [tile("Azure", "storage-1"), tile("S3", "storage-2"), tile("Google Cloud", "gcloud", true)],
        },
        {
          label: "Datalakes",
          tiles: [tile("Databricks", "databricks", true), tile("Snowflake", "snowflake"), tile("Database", "db")],
        },
      ],
    },

    impact: {
      eyebrow: "Proven Impact",
      title: "Results That Speak for Themselves",
      description:
        "Numbers speak louder than words. Discover the measurable difference our intelligent systems and scalable architectures make for modern businesses.",
      stats: [
        { value: "85%", label: "Workflows Automated" },
        { value: "4x", label: "Operational Speedup" },
        { value: "99.9%", label: "System Reliability" },
        { value: "150+", label: "Custom Systems Delivered" },
      ],
    },

    scale: {
      eyebrow: "Your Next Big Leap",
      title: "Scale Smarter, Not Harder",
      description:
        "Ready to leave manual tasks behind? Let’s design the custom CRM, smart automations, and AI tools your team needs to move faster and grow seamlessly.",
      cards: [
        {
          title: "Automated workflows that feel like magic.",
          body: "Every custom system we build comes with an intelligent AI assistant. From automating tasks to analyzing CRM data, V-Core is your on-demand digital partner.",
          image: "card-assistant.webp",
          alt: "The Ve assistant waving next to an Ask Ve prompt bar.",
        },
        {
          title: "Let Ve\nrun your operations.",
          body: "Every custom system we build comes with an intelligent AI assistant. From automating tasks to analyzing CRM data, V-Core is your on-demand digital partner.",
          image: "card-phone.webp",
          alt: "Phone showing the Ve assistant asking how it can help.",
        },
        {
          title: "Enterprise-grade security and reliability.",
          body: "Every custom system we build comes with an intelligent AI assistant. From automating tasks to analyzing CRM data, V-Core is your on-demand digital partner.",
          image: "card-integrations.webp",
          alt: "Ve connected to design and automation tools.",
        },
      ],
    },
  },
};
