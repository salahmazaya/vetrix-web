type Props = {
  user?: {
    email?: string | null;
  } | null;
};

/** Logged-in account: picture and name, shown at the start of the header. */
export function AccountChip({ user }: Props) {
  const email = typeof user?.email === "string" ? user.email.trim() : "";
  if (!email) return null;

  const name = email.split("@")[0] || email;
  const initial = name.slice(0, 1).toUpperCase();

  return (
    <span className="vx-account">
      <span className="vx-account__avatar" aria-hidden="true">
        {initial}
      </span>
      <span className="vx-account__name" title={email}>
        {name}
      </span>
    </span>
  );
}
