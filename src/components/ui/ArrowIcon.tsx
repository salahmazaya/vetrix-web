type ArrowIconProps = {
  className?: string;
};

/** Diagonal "go" arrow used on every call-to-action in the design. */
export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      className={["rtl:-scale-x-100", className].filter(Boolean).join(" ")}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.00781 0V1.99219H9.60938L0 11.6016L1.40625 13.0078L11.0156 3.39844V12H13.0078V0H1.00781Z"
        fill="currentColor"
      />
    </svg>
  );
}
