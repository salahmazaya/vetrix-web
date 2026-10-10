/** The "ve" monogram: rounded v and e strokes with the two brand dots. */
export function VeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-label="Ve" role="img">
      <path d="M5 8l11.5 24L28 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M57 20.5H35.5c.8 6.2 5.5 10.5 11 10.5 2.6 0 5-.9 6.8-2.4M35.6 18c1-5.6 5.4-9.5 10.9-9.5 5.6 0 10 4 10.6 10"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="44" cy="36" r="3" fill="#2aa4ec" />
      <path d="M50 36c3 0 6-1.4 7.5-4" stroke="#2aa4ec" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
