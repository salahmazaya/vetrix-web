// Small line icons for the mission and vision bullet points, used in turn
const paths = [
  "M4 4h4v4H4zM12 4h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4zM8 6h4M6 8v4M14 8v4M8 14h4",
  "M10 2.5l1.8 4.2 4.2 1.8-4.2 1.8L10 14.5l-1.8-4.2L4 8.5l4.2-1.8zM15.5 13.5l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8z",
  "M10 10a3 3 0 100-6 3 3 0 000 6zM4 17c0-3 2.7-5 6-5s6 2 6 5",
  "M3 15l4-5 3 3 4-6 3 4M3 3v14h14",
];

export function PointIcon({ index, className = "" }: { index: number; className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d={paths[index % paths.length]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
