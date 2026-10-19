/**
 * Renders admin text where *starred* words get their own colour,
 * e.g. "Where *Deep* Tech Meets Business Logic".
 */
export function Highlight({ text, className = "text-brand" }: { text: string; className?: string }) {
  const parts = text.split(/\*([^*]+)\*/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
