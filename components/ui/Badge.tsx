import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "success" | "info" | "warning" | "danger";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-stone-100 text-stone-700",
  success: "bg-success/10 text-success-text",
  info: "bg-info/10 text-info-text",
  warning: "bg-warning/10 text-warning-text",
  danger: "bg-danger/10 text-danger-text",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
