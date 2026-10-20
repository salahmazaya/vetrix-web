import Image from "next/image";
import { LocaleLink } from "../ui/LocaleLink";
import { Highlight } from "../inner/Highlight";
import { Reveal } from "../motion/Reveal";
import { ArrowIcon } from "../ui/ArrowIcon";
import { PointerTilt } from "./PointerTilt";
import type { SiteSolution } from "@/lib/site-content";
import { mediaSrc } from "@/lib/cms";

/** Frosted card with the glass cube floating out of its left side; the cube turns toward the pointer. */
export function DeliverCard({ content }: { content: SiteSolution["deliver"] }) {
  const img = mediaSrc(content.image);
  return (
    <Reveal className="relative mt-[150px] rounded-[24px] border border-white bg-gradient-to-br from-white via-white/95 to-[#e9f5fd] shadow-[0_24px_60px_-28px_rgba(0,64,140,0.35)] md:mt-0">
      <div className="relative mx-auto -mt-[170px] w-[300px] md:absolute md:-top-[96px] md:-start-[34px] md:z-10 md:mt-0 md:w-[420px]">
        {img && (
          <PointerTilt className="cube-float">
            <Image src={img.src} alt={img.alt} width={img.width || 565} height={img.height || 566} priority sizes="420px" className="h-auto w-full" />
            <span aria-hidden="true" className="cube-glint absolute inset-[22%] rounded-full" />
          </PointerTilt>
        )}
      </div>
      <div className="grid items-center md:min-h-[287px] md:grid-cols-[500px_1fr]">
        <div className="hidden md:block" aria-hidden="true" />
        <div className="flex flex-col items-start gap-4 px-6 pb-8 md:py-10 md:pe-[42px] md:ps-0">
          <h2 className="text-[26px] font-medium tracking-[-0.01em] text-black md:text-[28px]">
            <Highlight text={content.title} />
          </h2>
          <p className="text-[13px] leading-[1.75] text-muted">{content.body}</p>
          <LocaleLink
            href={content.button.href}
            className="group mt-2 inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-brand/[0.06] px-5 py-3 text-sm text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {content.button.label}
            <ArrowIcon className="size-3 transition-transform duration-300 group-hover:rotate-45 rtl:group-hover:-rotate-45" />
          </LocaleLink>
        </div>
      </div>
    </Reveal>
  );
}
