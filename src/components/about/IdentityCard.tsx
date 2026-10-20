import Image from "next/image";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { PointIcon } from "./PointIcon";
import type { SiteAbout } from "@/lib/site-content";
import { mediaSrc } from "@/lib/cms";

/** Big white card under the SiteHeader: photo, core identity numbers, then mission and vision. */
export function IdentityCard({ content }: { content: SiteAbout }) {
  const { identity, mission, vision } = content;
  const img = mediaSrc(identity.image);
  return (
    <Reveal className="rounded-[32px] border border-white bg-white p-3 shadow-[0_30px_80px_-40px_rgba(0,60,140,0.45)] md:p-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,515px)_1fr]">
        <div className="identity-photo group relative aspect-[515/437] overflow-hidden rounded-[24px] bg-night">
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 515px"
              className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
            />
          )}
          <span aria-hidden="true" className="identity-scan absolute inset-x-0 h-24" />
        </div>

        <div className="flex flex-col justify-center gap-8 px-3 pb-4 md:px-4">
          <div className="flex flex-col gap-3">
            <p className="eyebrow-shine text-sm font-medium text-brand-bright">{identity.eyebrow}</p>
            <h2 className="text-xl font-medium text-navy md:text-[22px]">{identity.title}</h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {(identity.stats ?? []).map((s, i) => {
              const m = s.value.match(/^([\d.]+)(.*)$/);
              return (
                <div key={s.id ?? i} className="flex flex-col-reverse items-center gap-2 text-center">
                  <dt className="text-[13px] text-navy/80">{s.label}</dt>
                  <dd className="text-gradient-brand text-[30px] leading-none font-semibold">
                    {m ? (
                      <>
                        <CountUp value={m[1]} />
                        <span className="text-[18px]">{m[2]}</span>
                      </>
                    ) : (
                      s.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Statement content={mission} />
        <Statement content={vision} dark />
      </div>
    </Reveal>
  );
}

function Statement({ content, dark = false }: { content: SiteAbout["mission"]; dark?: boolean }) {
  return (
    <div
      className={`statement relative overflow-hidden rounded-[24px] p-7 md:p-8 ${
        dark
          ? "bg-[radial-gradient(120%_120%_at_0%_0%,#13286b_0%,#0a1650_50%,#050c35_100%)] text-white"
          : "glass-card border-[#e2eef8]"
      }`}
    >
      {dark && (
        <svg aria-hidden="true" viewBox="0 0 200 200" className="statement-rings absolute -end-16 -bottom-16 w-64 text-white/10">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeDasharray="2 5" />
          <path d="M88 96v-10a12 12 0 0124 0v10M84 96h32v24H84z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
      <div className="relative flex flex-col gap-3">
        <p className={`text-sm font-medium ${dark ? "text-brand-bright" : "text-brand"}`}>{content.eyebrow}</p>
        <h3 className={`text-xl font-medium md:text-[22px] ${dark ? "text-white" : "text-navy"}`}>{content.title}</h3>
        <p className={`mt-2 text-[13px] leading-[1.7] ${dark ? "text-white/70" : "text-muted"}`}>{content.body}</p>
        <ul className="mt-4 flex flex-col gap-4">
          {(content.points ?? []).map((p, i) => (
            <li
              key={p.id ?? i}
              className="statement-point flex items-center gap-2.5 text-[13px]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <PointIcon index={i} className={dark ? "text-brand-bright" : "text-brand"} />
              <span className={dark ? "text-white/85" : "text-navy/80"}>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
