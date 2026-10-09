import Image from "next/image";
import { BinaryPattern } from "../ui/BinaryPattern";
import { SectionHeading } from "../ui/SectionHeading";

const copy =
  "Every custom system we build comes with an intelligent AI assistant. From automating tasks to analyzing CRM data, V-Core is your on-demand digital partner.";

export function ScaleSmarter() {
  return (
    <section className="bg-night-gradient relative overflow-hidden px-4 pt-[103px] pb-24 md:px-8">
      <BinaryPattern tone="dark" className="absolute top-0 -left-2 w-40" />
      <BinaryPattern tone="dark" className="absolute -top-10 right-[-50px] w-56 opacity-70" />
      <BinaryPattern tone="dark" className="absolute bottom-0 right-[400px] w-40 opacity-50" />
      <div className="relative mx-auto flex max-w-[1120px] flex-col gap-8">
        <SectionHeading
          tone="dark"
          eyebrow="Your Next Big Leap"
          title="Scale Smarter, Not Harder"
          description="Ready to leave manual tasks behind? Let’s design the custom CRM, smart automations, and AI tools your team needs to move faster and grow seamlessly."
        />

        <div className="grid justify-items-center gap-6 md:grid-cols-3 md:gap-[33px]">
          <article
            className="relative flex h-[650px] w-full max-w-[351px] flex-col overflow-hidden rounded-[34px] border border-white/10 px-[30px] pt-10 text-center"
            style={{ background: "linear-gradient(180deg, #0c1226 0%, #14161f 45%, #121622 100%)" }}
          >
            <h3 className="text-2xl leading-[34.5px] font-medium text-white">Automated workflows that feel like magic.</h3>
            <p className="mt-4 text-sm leading-[1.6] text-[#e1e1e1]">{copy}</p>
            <Image
              src="/images/card-assistant.webp"
              alt="The Ve assistant waving next to an Ask Ve prompt bar."
              width={351}
              height={380}
              className="absolute inset-x-0 bottom-0 h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_12%)]"
            />
          </article>

          <article
            className="relative flex h-[650px] w-full max-w-[351px] flex-col justify-end overflow-hidden rounded-[34px] border border-white/10 px-5 pb-10 text-center"
            style={{ background: "linear-gradient(180deg, #132a49 0%, #181c27 100%)" }}
          >
            <Image
              src="/images/card-phone.webp"
              alt="Phone showing the Ve assistant asking how it can help."
              width={351}
              height={390}
              className="absolute inset-x-0 top-0 h-auto w-full [mask-image:linear-gradient(to_top,transparent,black_10%)]"
            />
            <h3 className="relative text-[23px] leading-[34.5px] text-white">
              Let Ve
              <br />
              run your operations.
            </h3>
            <p className="relative mt-6 text-sm leading-6 text-[#e1e1e1]">{copy}</p>
          </article>

          <article
            className="relative flex h-[650px] w-full max-w-[351px] flex-col overflow-hidden rounded-[34px] border border-white/10 px-[30px] pt-10 text-center"
            style={{ background: "linear-gradient(180deg, #0c1226 0%, #14161f 45%, #121622 100%)" }}
          >
            <h3 className="text-2xl leading-[34.5px] font-medium text-white">Enterprise-grade security and reliability.</h3>
            <p className="mt-4 text-sm leading-6 text-[#e1e1e1]">{copy}</p>
            <Image
              src="/images/card-integrations.webp"
              alt="Ve connected to design and automation tools."
              width={351}
              height={380}
              className="absolute inset-x-0 bottom-0 h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_12%)]"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
