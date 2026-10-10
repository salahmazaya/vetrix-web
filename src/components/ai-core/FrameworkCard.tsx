import Image from "next/image";
import { Reveal } from "../motion/Reveal";
import { Orb } from "../three/Orb";
import { BinaryPattern } from "../ui/BinaryPattern";
import type { AiCore } from "@/payload-types";
import { mediaSrc } from "@/lib/cms";

/** Dark card with the Ve phone rising out of it; a live orb glows on the phone screen. */
export function FrameworkCard({ content }: { content: AiCore["framework"] }) {
  const img = mediaSrc(content.image);
  return (
    <section className="px-4 pt-[150px] pb-20 md:px-8 md:pt-[218px] md:pb-[86px] xl:px-[160px]">
      <Reveal className="relative mx-auto max-w-[1120px] rounded-[24px] bg-[radial-gradient(120%_140%_at_80%_0%,#16307a_0%,#0b1850_45%,#060d33_100%)] shadow-[0_30px_80px_-30px_rgba(0,20,80,0.6)] md:min-h-[335px]">
        <BinaryPattern tone="dark" className="absolute top-4 right-6 w-40 opacity-70" />
        <BinaryPattern tone="dark" className="absolute bottom-0 left-[42%] w-32 opacity-50" />
        <div className="grid md:grid-cols-[528px_1fr]">
          <div className="relative mx-auto -mt-[150px] w-[260px] md:absolute md:-top-[158px] md:left-[88px] md:mt-0 md:w-[357px]">
            {img && (
              <div className="phone-float relative">
                <Image src={img.src} alt={img.alt} width={img.width || 357} height={img.height || 494} sizes="357px" className="h-auto w-full" />
                {/* The live orb sits over the one drawn on the screen */}
                <Orb className="absolute top-[49%] left-[38.5%] aspect-square w-[23%]" />
              </div>
            )}
          </div>
          <div className="hidden md:block" />
          <div className="relative flex flex-col gap-3 px-6 pt-8 pb-10 md:max-w-[480px] md:py-[100px] md:pr-10 md:pl-0">
            <p className="eyebrow-shine text-sm font-medium text-brand-bright">{content.eyebrow}</p>
            <h2 className="text-xl font-medium text-white md:text-[22px]">{content.title}</h2>
            {content.description && <p className="text-[13px] leading-[1.7] text-white/70">{content.description}</p>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
