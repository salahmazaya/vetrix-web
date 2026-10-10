/**
 * Dark band with a 3D grid floor and ceiling; light pulses race along the lines.
 * Purely decorative, between the features and the framework card.
 */
export function GridBand() {
  return (
    <div aria-hidden="true" className="grid-band relative h-[320px] overflow-hidden md:h-[598px]">
      <div className="grid-band-plane grid-band-ceiling" />
      <div className="grid-band-plane grid-band-floor" />
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="grid-band-beam" style={{ "--i": i } as React.CSSProperties} />
      ))}
      <div className="grid-band-horizon" />
    </div>
  );
}
