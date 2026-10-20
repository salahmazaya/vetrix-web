import { ArrowIcon } from "./ArrowIcon";
import { LocaleLink } from "./LocaleLink";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "ghost" | "brand";
  withArrow?: boolean;
  className?: string;
};

const variants = {
  light: "bg-white text-navy hover:bg-sky/90",
  ghost: "border border-white/10 bg-white/[0.04] text-white backdrop-blur-[2px] hover:bg-white/10",
  brand: "bg-brand text-white hover:bg-brand-bright",
};

export function PillButton({
  href,
  children,
  variant = "light",
  withArrow = variant !== "ghost",
  className = "",
}: PillButtonProps) {
  return (
    <LocaleLink
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full p-4 text-base leading-none transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && <ArrowIcon className="size-[13px]" />}
    </LocaleLink>
  );
}
