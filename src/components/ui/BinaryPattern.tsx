type BinaryPatternProps = {
  className?: string;
  tone?: "light" | "dark";
};

const rows = [
  "1 0 0 1 0 1 1 0 0 1",
  "0 1 1 0 0 1 1 0 1 0",
  "1 0 0 1 1 0 1 0 0 1",
  "0 0 1 1 0 1 0 1 1 0",
  "1 0 1 0 1 0 0 1 0 1",
  "0 1 0 1 1 0 0 1 1 0",
  "1 1 0 0 1 0 1 0 0 1",
  "0 1 0 0 1 1 0 1 0 1",
];

/**
 * Faded block of binary digits that decorates the corners of most sections.
 * Drawn as SVG so it stays crisp at any size.
 */
export function BinaryPattern({ className = "", tone = "light" }: BinaryPatternProps) {
  const id = `binary-fade-${tone}`;
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="200" height="200" fill={`url(#${id})`} />
        </mask>
      </defs>
      <g
        mask={`url(#${id}-mask)`}
        fill={tone === "light" ? "#7fa9c9" : "#4f86b8"}
        fillOpacity={tone === "light" ? 0.45 : 0.55}
        fontFamily="ui-monospace, monospace"
        fontSize="15"
      >
        {rows.map((row, i) => (
          <text key={i} x="6" y={22 + i * 24} letterSpacing="2">
            {row}
          </text>
        ))}
      </g>
    </svg>
  );
}
