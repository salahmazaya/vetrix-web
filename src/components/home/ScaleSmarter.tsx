import Image from "next/image";
import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { mediaSrc } from "@/lib/cms";
import type { SiteHome } from "@/lib/site-content";

const sideCard = "linear-gradient(180deg, #0c1226 0%, #14161f 45%, #121622 100%)";
const middleCard = "linear-gradient(180deg, #132a49 0%, #181c27 100%)";

/** Keeps the line breaks typed in the admin */
function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

export function ScaleSmarter({ content }: { content: SiteHome["scale"] }) {
  return (
    <section className="bg-night-gradient relative overflow-hidden px-4 pt-[103px] pb-24 md:px-8">
      <BinaryPattern tone="dark" className="absolute top-0 -left-2 w-40" />
      <BinaryPattern tone="dark" className="absolute -top-10 right-[-50px] w-56 opacity-70" />
      <BinaryPattern tone="dark" className="absolute bottom-0 right-[400px] w-40 opacity-50" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-8">
        <SectionHeading
          tone="dark"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description ?? undefined}
        />

        <div className="grid justify-items-center gap-6 md:grid-cols-3 md:gap-[33px]">
          {content.cards?.map((card, i) => {
            const image = mediaSrc(card.image);
            // The middle card flips the layout: picture on top, text at the bottom
            const middle = i === 1;
            return (
              <Reveal key={card.id ?? i} delay={i * 150} className="w-full max-w-[351px]">
                <TiltCard
                  className={`scale-card relative flex h-[650px] flex-col overflow-hidden rounded-[34px] border border-white/10 text-center ${
                    middle ? "justify-end px-5 pb-10" : "px-[30px] pt-10"
                  }`}
                  style={{ background: middle ? middleCard : sideCard }}
                >
                  {image && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width || 351}
                      height={image.height || 380}
                      className={`scale-art absolute inset-x-0 h-auto w-full ${
                        middle
                          ? "top-0 [mask-image:linear-gradient(to_top,transparent,black_10%)]"
                          : "bottom-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%)]"
                      }`}
                    />
                  )}
                  <h3
                    className={`relative leading-[34.5px] text-white ${
                      middle ? "text-[23px]" : "text-2xl font-medium"
                    }`}
                  >
                    <Lines text={card.title} />
                  </h3>
                  <p className={`relative text-sm text-[#e1e1e1] ${middle ? "mt-6 leading-6" : "mt-4 leading-[1.6]"}`}>
                    {card.body}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
