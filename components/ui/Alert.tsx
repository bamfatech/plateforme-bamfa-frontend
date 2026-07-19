import type { ReactNode } from "react";

type AlertVariant = "success" | "info" | "warning" | "danger";

const variants: Record<AlertVariant, string> = {
  success: "bg-success/10 text-success border-success/30",
  info: "bg-info/10 text-info border-info/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export function Alert({
  variant = "info",
  className = "",
  children,
}: {
  variant?: AlertVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="alert" className={`rounded-md border px-4 py-3 text-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
