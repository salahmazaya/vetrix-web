import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";

const cards = [
  {
    n: "01",
    title: "Scalable Web Solutions",
    body: "We design and build high-performance, responsive websites and enterprise platforms tailored to deliver flawless user experiences and drive conversions.",
    dark: true,
    numberLeft: true,
    bodyWidth: "sm:max-w-[272px]",
  },
  {
    n: "02",
    title: "Tailored CRM Systems",
    body: "Take full control of your business data. We build custom management tools and CRMs that centralize your operations, sales, and customer relations.",
    numberLeft: true,
    bodyWidth: "sm:max-w-[228px]",
  },
  {
    n: "03",
    title: "Intelligent Automation",
    body: "Eliminate repetitive tasks. Our smart automation tools streamline your workflows, allowing your team to focus on high-value growth.",
  },
  {
    n: "04",
    title: "Proprietary AI Engines",
    body: "Future-proof your software. We embed custom AI models directly into your systems to analyze data, predict trends.",
  },
];

export function VetrixEdge() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-16 pb-24 md:px-8">
      <BinaryPattern className="absolute -top-2 right-[-30px] w-44" />
      <BinaryPattern className="absolute bottom-0 -left-10 w-44" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-[42px]">
        <SectionHeading
          eyebrow="The Vetrix Edge"
          title="Complex Operations, Elegant Solutions"
          description="We combine powerful code, custom architecture, and built-in AI to transform how modern businesses operate, scale, and automate their daily workflows."
        />
        <div className="grid gap-[18px] md:grid-cols-2">
          {cards.map((c) => (
            <article
              key={c.n}
              className={`group relative min-h-[270px] overflow-hidden rounded-3xl p-[30px] transition-transform duration-300 hover:-translate-y-1 ${
                c.dark ? "bg-[#050c16] text-white" : "bg-mist text-ink"
              }`}
            >
              {c.dark && <BinaryPattern tone="dark" className="absolute -top-6 right-2 w-48 opacity-80" />}
              <h3 className="relative text-2xl leading-[30px] font-medium">{c.title}</h3>
              <div
                className={`relative z-10 mt-6 flex flex-col gap-4 sm:mt-0 ${
                  c.numberLeft ? `sm:ml-auto ${c.bodyWidth} sm:pt-[60px]` : "sm:max-w-[269px] sm:pt-[90px]"
                }`}
              >
                <p className={`text-sm leading-[30px] ${c.dark ? "text-[#ddd]" : "text-[#464646]"}`}>{c.body}</p>
              </div>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-[101px] text-[150px] leading-none font-normal sm:text-[190px] ${
                  c.numberLeft ? "left-[18px] max-sm:hidden" : "left-[293px] max-sm:hidden"
                }`}
                style={{
                  backgroundImage: c.dark
                    ? "linear-gradient(183deg, #008dd2 36%, rgba(0,141,210,0) 82%)"
                    : "linear-gradient(183deg, #000547 36%, rgba(1,71,255,0) 82%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {c.n}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
