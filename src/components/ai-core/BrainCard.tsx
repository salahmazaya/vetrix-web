import Image from "next/image";
import { Highlight } from "../inner/Highlight";
import { Reveal } from "../motion/Reveal";
import type { AiCore } from "@/payload-types";
import { mediaSrc } from "@/lib/cms";

/** Ve waving out of the top of a frosted card, next to the "Meet the brain" copy. */
export function BrainCard({ content }: { content: AiCore["brain"] }) {
  const img = mediaSrc(content.image);
  return (
    <Reveal className="brain-card relative mt-[120px] rounded-[24px] border border-white bg-gradient-to-br from-white via-white/95 to-[#e9f5fd] shadow-[0_24px_60px_-28px_rgba(0,64,140,0.35)] md:mt-0">
      <div className="grid items-center md:min-h-[287px] md:grid-cols-[453px_1fr]">
        <div className="relative -mt-[130px] h-[300px] md:absolute md:-top-[94px] md:left-[30px] md:mt-0 md:h-[464px] md:w-[374px]">
          <div aria-hidden="true" className="brain-halo absolute top-[14%] left-1/2 size-[200px] -translate-x-1/2 rounded-full md:size-[242px]" />
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width || 374}
              height={img.height || 464}
              priority
              sizes="374px"
              className="brain-robot relative mx-auto h-full w-auto object-contain"
            />
          )}
        </div>
        <div className="hidden md:block" />
        <div className="flex flex-col gap-4 px-6 pb-8 md:py-10 md:pr-[42px] md:pl-0">
          <h2 className="text-xl font-medium tracking-[-0.01em] text-black capitalize md:text-[22px]">
            <Highlight text={content.title} />
          </h2>
          <p className="text-[13px] leading-[1.75] text-muted md:text-justify">{content.body}</p>
        </div>
      </div>
    </Reveal>
  );
}
