import Image from "next/image";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { SectionHeading } from "../ui/SectionHeading";
import type { SiteAbout } from "@/lib/site-content";
import { mediaSrc } from "@/lib/cms";

type Card = NonNullable<SiteAbout["standard"]["cards"]>[number];

/** "The Vetrix Standard": three illustrated cards, then the dashboards and global-scale cards. */
export function StandardBento({ content }: { content: SiteAbout["standard"] }) {
  const cards = content.cards ?? [];
  const top = cards.slice(0, 3);
  const [dashboards, scale] = cards.slice(3);
  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-[86px] xl:px-[160px]">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description ?? undefined} />
      <div className="mx-auto mt-14 flex max-w-[1120px] flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-3">
          {top.map((card, i) => (
            <Reveal key={card.id ?? i} delay={i * 100}>
              <TiltCard max={6} className="bento-std glass-card relative flex h-full flex-col gap-4 overflow-hidden p-6">
                <div className="relative aspect-[312/225] overflow-hidden rounded-2xl bg-white/80">
                  <Illustration card={card} className="bento-std-art object-contain" sizes="312px" />
                </div>
                <Text card={card} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-[491fr_609fr]">
          {dashboards && (
            <Reveal>
              <TiltCard max={5} className="bento-std glass-card relative flex h-full flex-col overflow-hidden">
                <div className="p-6">
                  <Text card={dashboards} />
                </div>
                <div className="relative mt-auto aspect-[491/302] overflow-hidden rounded-[24px]">
                  <Illustration card={dashboards} className="bento-std-art object-cover" sizes="491px" />
                </div>
              </TiltCard>
            </Reveal>
          )}
          {scale && (
            <Reveal delay={120}>
              <TiltCard max={5} className="bento-std glass-card relative flex h-full min-h-[420px] flex-col overflow-hidden md:min-h-[458px]">
                <div className="relative z-10 max-w-[420px] p-6">
                  <Text card={scale} />
                </div>
                <div className="absolute end-0 bottom-0 aspect-[482/382] w-[85%] max-w-[482px]">
                  <Illustration card={scale} className="bento-globe object-contain object-right-bottom rtl:object-left-bottom" sizes="482px" />
                </div>
              </TiltCard>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function Text({ card }: { card: Card }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium text-black">{card.title}</h3>
      <p className="text-[13px] leading-[1.7] text-[#6b7480]">{card.body}</p>
    </div>
  );
}

function Illustration({ card, className, sizes }: { card: Card; className: string; sizes: string }) {
  const img = mediaSrc(card.image);
  if (!img) return null;
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} className={className} />;
}
