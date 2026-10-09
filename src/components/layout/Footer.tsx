import Link from "next/link";
import { BinaryPattern } from "../ui/BinaryPattern";
import { Logo } from "../ui/Logo";

const columns = [
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
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path
        d="M6.07 18V9.79h2.75l.41-3.2H6.07V4.55c0-.93.26-1.56 1.59-1.56h1.69V.13A22.7 22.7 0 0 0 6.88 0C4.44 0 2.76 1.49 2.76 4.23v2.36H0v3.2h2.76V18h3.31Z"
        transform="translate(4 0)"
      />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <g transform="translate(1 1)">
        <path d="M12 0H4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Zm2.67 12A2.67 2.67 0 0 1 12 14.67H4A2.67 2.67 0 0 1 1.33 12V4A2.67 2.67 0 0 1 4 1.33h8A2.67 2.67 0 0 1 14.67 4v8Z" />
        <circle cx="12.33" cy="3.66" r="1" />
        <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.67A2.67 2.67 0 1 1 8 5.33a2.67 2.67 0 0 1 0 5.34Z" />
      </g>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <path d="M10.68 7.62 17.23 0h-1.55L9.99 6.62 5.44 0H.19l6.88 10.01L.19 18h1.56l6.01-6.99L12.56 18h5.25l-7.13-10.38Zm-2.13 2.48-.7-1-5.54-7.93h2.39l4.47 6.4.7 1 5.81 8.31h-2.39l-4.74-6.78Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <g>
        <path d="M16.2 16.2v-5.27c0-2.6-.56-4.58-3.58-4.58-1.46 0-2.43.8-2.83 1.55h-.04V6.59H6.9v9.61h2.98v-4.77c0-1.26.24-2.47 1.79-2.47 1.53 0 1.55 1.43 1.55 2.54v4.68h2.98Z" />
        <path d="M2.04 6.59h2.98v9.61H2.04z" />
        <path d="M3.53 1.8a1.73 1.73 0 1 0 0 3.47 1.73 1.73 0 0 0 0-3.47Z" />
      </g>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-night-gradient relative overflow-hidden text-[#e4e4e4]">
      <BinaryPattern tone="dark" className="absolute -top-14 -left-16 w-56 opacity-60" />
      <BinaryPattern tone="dark" className="absolute -top-16 right-[-60px] w-56 opacity-60" />
      <div className="relative mx-auto grid max-w-[1120px] gap-12 px-4 pt-10 pb-16 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-0">
        <div className="flex max-w-[245px] flex-col gap-8">
          <Logo className="h-[57px] w-[157px]" />
          <p className="text-base leading-normal">Building the intelligent systems that scale your business.</p>
          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-8 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_2px_rgba(186,150,224,0.1)] transition-colors hover:bg-brand-bright"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-8">
            <p className="text-xl font-medium text-sky">{col.title}</p>
            <ul className="flex flex-col gap-6 text-base">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
