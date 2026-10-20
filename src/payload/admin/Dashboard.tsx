import type { CSSProperties } from "react";
import type { DashboardViewServerProps } from "@payloadcms/next/views";
import { formatAdminURL } from "payload/shared";
import Link from "next/link";
import { ChartStage, CountUp } from "./DashboardMotion";

const pages = ["header", "home", "aiCore", "about", "solutions", "contact", "faq", "cta", "footer"] as const;

const text = {
  en: {
    title: "Dashboard",
    messages: "Messages",
    media: "Media",
    team: "Team",
    pages: "Pages",
    inbox: "Inbox",
    last14: "Last 14 days",
    view: "Open",
    timing: "When they wrote",
    week: "This week",
    fortnight: "The week before",
    older: "Older",
    fromForm: "From the contact form",
    files: "Files in the library",
    accounts: "Accounts that can sign in",
    arabic: "Arabic",
    recent: "Latest messages",
    empty: "The contact form has not received anything yet.",
    trend: "Daily messages",
    quiet: "Quiet stretch",
  },
  ar: {
    title: "لوحة التحكم",
    messages: "الرسائل",
    media: "الوسائط",
    team: "الفريق",
    pages: "الصفحات",
    inbox: "الوارد",
    last14: "آخر 14 يومًا",
    view: "فتح",
    timing: "متى كتبوا",
    week: "هذا الأسبوع",
    fortnight: "الأسبوع السابق",
    older: "أقدم",
    fromForm: "من نموذج التواصل",
    files: "ملفات المكتبة",
    accounts: "حسابات يمكنها الدخول",
    arabic: "العربية",
    recent: "أحدث الرسائل",
    empty: "نموذج التواصل لم يستقبل شيئًا بعد.",
    trend: "الرسائل اليومية",
    quiet: "فترة هادئة",
  },
} as const;

type Lang = keyof typeof text;

function languageOf(code: string | undefined): Lang {
  return code?.startsWith("ar") ? "ar" : "en";
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function dayKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function lastDays(count: number) {
  const today = startOfDay(new Date());
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - index));
    return date;
  });
}

const probe: Record<(typeof pages)[number], (doc: Record<string, unknown>) => unknown> = {
  header: (doc) => (doc.links as { label?: string }[] | undefined)?.[0]?.label,
  home: (doc) => (doc.hero as { title?: string } | undefined)?.title,
  aiCore: (doc) => (doc.brain as { title?: string } | undefined)?.title,
  about: (doc) => (doc.identity as { title?: string } | undefined)?.title,
  solutions: (doc) => (doc.deliver as { title?: string } | undefined)?.title,
  contact: (doc) => (doc.form as { title?: string } | undefined)?.title,
  faq: (doc) => doc.title,
  cta: (doc) => doc.title,
  footer: (doc) => doc.tagline,
};

function ready(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function ago(iso: string, lang: Lang) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 1) return lang === "ar" ? "الآن" : "Just now";
  if (minutes < 60) return lang === "ar" ? `منذ ${minutes} د` : `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return lang === "ar" ? `منذ ${hours} س` : `${hours}h ago`;
  const days = Math.round(hours / 24);
  return lang === "ar" ? `منذ ${days} ي` : `${days}d ago`;
}

function Bars({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const width = 640;
  const height = 168;
  const gap = 10;
  const barWidth = (width - gap * (values.length - 1)) / values.length;
  return (
    <svg className="vx-bars" viewBox={`0 0 ${width} ${height}`} role="img">
      <defs>
        <linearGradient id="vx-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8fd0c2" />
          <stop offset="100%" stopColor="#7eb8e8" />
        </linearGradient>
      </defs>
      {values.map((value, index) => {
        const barHeight = Math.max(value > 0 ? 8 : 3, (value / max) * (height - 6));
        const x = index * (barWidth + gap);
        const y = height - barHeight;
        return <rect key={dayKey(lastDays(values.length)[index] ?? new Date()) + index} x={x} y={y} width={barWidth} height={barHeight} rx="7" fill={value > 0 ? "url(#vx-bar)" : "#e7f3fb"} />;
      })}
    </svg>
  );
}

function Trend({ values }: { values: number[] }) {
  const width = 320;
  const height = 120;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - 10 - (value / max) * (height - 24);
    return [x, y] as const;
  });
  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  return (
    <svg className="vx-trend" viewBox={`0 0 ${width} ${height}`} role="img">
      <defs>
        <linearGradient id="vx-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7eb8e8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7eb8e8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="vx-trend-area" d={area} fill="url(#vx-area)" />
      <path
        className="vx-draw"
        d={line}
        fill="none"
        stroke="#5a9fd4"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={1}
      />
      {points.map(([x, y], index) => (
        <circle
          key={index}
          className="vx-trend-dot"
          cx={x}
          cy={y}
          r={index === points.length - 1 ? 4 : 0}
          fill="#5a9fd4"
        />
      ))}
    </svg>
  );
}

function Donut({ parts }: { parts: { value: number; color: string }[] }) {
  const total = parts.reduce((sum, part) => sum + part.value, 0);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg className="vx-donut" viewBox="0 0 140 140" role="img">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#e7f3fb" strokeWidth="16" />
      {total > 0 &&
        parts.map((part, index) => {
          const length = (part.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;
          const circle = (
            <circle
              key={part.color}
              className="vx-donut-draw"
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={part.color}
              strokeWidth="16"
              strokeDasharray={dash}
              strokeLinecap="butt"
              transform="rotate(-90 70 70)"
              style={
                {
                  "--vx-gap": circumference,
                  "--vx-offset": -offset,
                  transitionDelay: `${index * 80}ms`,
                } as CSSProperties
              }
            />
          );
          offset += length;
          return circle;
        })}
      <text x="70" y="76" textAnchor="middle" className="vx-donut-value">
        {total}
      </text>
    </svg>
  );
}

const tones = ["#7eb8e8", "#b8a9ef", "#8fd0c2", "#9bb8e8", "#a8c5d8"];

export async function Dashboard({ i18n, initPageResult, payload }: DashboardViewServerProps) {
  const lang = languageOf(i18n.language);
  const t = text[lang];
  const req = initPageResult.req;
  const days = lastDays(14);
  const fortnightAgo = days[0] ?? startOfDay(new Date());
  const weekAgo = days[7] ?? fortnightAgo;
  const adminRoute = payload.config.routes.admin;
  const href = (path: `/${string}`) => formatAdminURL({ adminRoute, path });

  const [total, weekCount, fortnightCount, recent, media, users, windowDocs, coverage] = await Promise.all([
    payload.count({ collection: "messages", req }),
    payload.count({ collection: "messages", req, where: { createdAt: { greater_than_equal: weekAgo.toISOString() } } }),
    payload.count({
      collection: "messages",
      req,
      where: { createdAt: { greater_than_equal: fortnightAgo.toISOString() } },
    }),
    payload.find({ collection: "messages", depth: 0, limit: 5, overrideAccess: false, req, sort: "-createdAt" }),
    payload.count({ collection: "media", req }),
    payload.count({ collection: "users", req }),
    payload.find({
      collection: "messages",
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      req,
      where: { createdAt: { greater_than_equal: fortnightAgo.toISOString() } },
    }),
    Promise.all(
      pages.map(async (slug) => {
        try {
          const [english, arabic] = await Promise.all([
            payload.findGlobal({ slug, depth: 0, fallbackLocale: false, locale: "en", overrideAccess: true }),
            payload.findGlobal({ slug, depth: 0, fallbackLocale: false, locale: "ar", overrideAccess: true }),
          ]);
          return {
            english: ready(probe[slug](english as unknown as Record<string, unknown>)),
            arabic: ready(probe[slug](arabic as unknown as Record<string, unknown>)),
          };
        } catch {
          return { english: false, arabic: false };
        }
      }),
    ),
  ]);

  const byDay = new Map<string, number>();
  for (const doc of windowDocs.docs) {
    const created = typeof doc.createdAt === "string" ? doc.createdAt : "";
    if (!created) continue;
    const key = dayKey(startOfDay(new Date(created)));
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }
  const series = days.map((day) => byDay.get(dayKey(day)) ?? 0);
  const week = weekCount.totalDocs;
  const fortnight = Math.max(0, fortnightCount.totalDocs - week);
  const older = Math.max(0, total.totalDocs - fortnightCount.totalDocs);
  const arabicReady = coverage.filter((page) => page.arabic).length;
  const dateLabel = new Intl.DateTimeFormat(lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "short",
    weekday: "long",
    year: "numeric",
  }).format(new Date());
  const peak = Math.max(...series);

  const stats = [
    { label: t.messages, value: total.totalDocs, hint: t.fromForm, href: href("/collections/messages"), tone: "mint", icon: "messages" },
    { label: t.media, value: media.totalDocs, hint: t.files, href: href("/collections/media"), tone: "sky", icon: "media" },
    { label: t.team, value: users.totalDocs, hint: t.accounts, href: href("/collections/users"), tone: "lilac", icon: "team" },
    { label: t.pages, value: pages.length, hint: `${arabicReady}/${pages.length} ${t.arabic}`, href: href("/globals/home"), tone: "slate", icon: "pages" },
  ];

  return (
    <div className="vx-dash">
      <header className="vx-head">
        <h1>{t.title}</h1>
        <p className="vx-date">{dateLabel}</p>
      </header>

      <section className="vx-stats" aria-label={t.title}>
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            className={`vx-stat vx-stat-${stat.tone}`}
            href={stat.href}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className={`vx-stat-icon is-${stat.icon}`} aria-hidden="true" />
            <span>{stat.label}</span>
            <strong>
              <CountUp value={stat.value} />
            </strong>
            <small>{stat.hint}</small>
          </Link>
        ))}
      </section>

      <section className="vx-grid-top">
        <article className="vx-card" style={{ animationDelay: "120ms" }}>
          <div className="vx-card-head">
            <div>
              <h2>{t.inbox}</h2>
              <p>{t.last14}</p>
            </div>
            <Link href={href("/collections/messages")}>{t.view}</Link>
          </div>
          <ChartStage>
            <Bars values={series} />
          </ChartStage>
          <div className="vx-axis">
            <span>{days[0]?.getDate()}</span>
            <span>{days[7]?.getDate()}</span>
            <span>{days[13]?.getDate()}</span>
          </div>
          {peak === 0 && <p className="vx-quiet">{t.quiet}</p>}
        </article>

        <article className="vx-card" style={{ animationDelay: "180ms" }}>
          <div className="vx-card-head">
            <div>
              <h2>{t.timing}</h2>
              <p>{t.messages}</p>
            </div>
          </div>
          <ChartStage className="vx-donut-row">
            <Donut
              parts={[
                { value: week, color: "#8fd0c2" },
                { value: fortnight, color: "#b8a9ef" },
                { value: older, color: "#9bb8e8" },
              ]}
            />
            <ul className="vx-legend">
              {[
                { label: t.week, value: week, color: "#8fd0c2" },
                { label: t.fortnight, value: fortnight, color: "#b8a9ef" },
                { label: t.older, value: older, color: "#9bb8e8" },
              ].map((item) => (
                <li key={item.label}>
                  <i style={{ background: item.color }} />
                  <span>{item.label}</span>
                  <strong>{percent(item.value, total.totalDocs)}%</strong>
                </li>
              ))}
            </ul>
          </ChartStage>
        </article>
      </section>

      <section className="vx-grid-bottom">
        <article className="vx-card" style={{ animationDelay: "220ms" }}>
          <div className="vx-card-head">
            <div>
              <h2>{t.recent}</h2>
              <p>{t.messages}</p>
            </div>
            <Link href={href("/collections/messages")}>{t.view}</Link>
          </div>
          {recent.docs.length === 0 ? (
            <p className="vx-empty">{t.empty}</p>
          ) : (
            <ul className="vx-list">
              {recent.docs.map((doc, index) => {
                const name = typeof doc.name === "string" && doc.name ? doc.name : "—";
                const subject = typeof doc.subject === "string" ? doc.subject : "";
                const created = typeof doc.createdAt === "string" ? doc.createdAt : "";
                return (
                  <li key={String(doc.id)} style={{ animationDelay: `${320 + index * 60}ms` }}>
                    <Link href={href(`/collections/messages/${doc.id}`)}>
                      <span className="vx-avatar" style={{ background: tones[index % tones.length] }}>
                        {name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="vx-list-copy">
                        <strong>{name}</strong>
                        <small>{subject}</small>
                      </span>
                      <time>{created ? ago(created, lang) : ""}</time>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </article>

        <article className="vx-card" style={{ animationDelay: "280ms" }}>
          <div className="vx-card-head">
            <div>
              <h2>{t.trend}</h2>
              <p>{t.last14}</p>
            </div>
            <strong className="vx-peak">
              <CountUp value={peak} />
            </strong>
          </div>
          <ChartStage>
            <Trend values={series} />
          </ChartStage>
          <p className="vx-quiet">{peak === 0 ? t.quiet : t.inbox}</p>
        </article>
      </section>
    </div>
  );
}
