import Image from "next/image";

export function Avatar({
  name,
  src,
  className = "",
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  if (src) {
    return (
      <span className={`relative inline-block h-14 w-14 shrink-0 overflow-hidden rounded-full ${className}`}>
        <Image src={src} alt={name} fill className="object-cover" sizes="56px" />
      </span>
    );
  }

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
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-heading text-lg font-semibold text-white ${className}`}
    >
      {initials}
    </span>
  );
}
