const COLUMNS = 36;
const DIGITS = 28;

// Small deterministic generator so the server and browser draw the same digits
function digitsFor(col: number) {
  let seed = (col + 1) * 2654435761;
  let out = "";
  for (let i = 0; i < DIGITS; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    out += (seed >> 16) % 2 ? "1" : "0";
    out += "\n";
  }
  return out;
}

const columns = Array.from({ length: COLUMNS }, (_, i) => ({
  digits: digitsFor(i),
  duration: 18 + ((i * 7) % 13),
  delay: -((i * 5) % 17),
  bright: i % 5 === 2,
}));

/** Columns of binary digits drifting down behind the inner page headers. */
export function BinaryRain({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`binary-rain pointer-events-none select-none ${className}`}>
      {columns.map((c, i) => (
        <div
          key={i}
          className="binary-rain-col"
          data-bright={c.bright}
          style={{ "--dur": `${c.duration}s`, "--delay": `${c.delay}s` } as React.CSSProperties}
        >
          <span>{c.digits}</span>
          <span>{c.digits}</span>
        </div>
      ))}
    </div>
  );
}
