import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-white/80" : "text-primary-700";
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${color} ${className}`}>
      {children}
    </p>
  );
}
