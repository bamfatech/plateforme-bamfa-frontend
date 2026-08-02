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
  const color = tone === "light" ? "text-paper/75" : "text-flame-ink";
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.22em] ${color} ${className}`}>
      {children}
    </p>
  );
}
