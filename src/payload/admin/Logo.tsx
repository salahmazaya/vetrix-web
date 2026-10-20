/** Wordmark for admin chrome. Light sidebar tints it navy via CSS; login keeps it white. */
export function Logo() {
  return (
    <img
      src="/images/logo.svg"
      alt="Vetrix"
      className="vx-logo"
      style={{ display: "block", height: 36, width: "auto" }}
    />
  );
}
