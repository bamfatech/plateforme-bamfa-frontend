export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient font-heading text-lg font-semibold text-white ${className}`}
    >
      {initials}
    </span>
  );
}
