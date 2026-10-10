import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-11 w-[120px]", priority }: LogoProps) {
  return (
    <Image
      src="/images/logo.svg"
      alt="Vetrix"
      width={157}
      height={57}
      priority={priority}
      className={className}
    />
  );
}
