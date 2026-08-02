import type { ReactNode } from "react";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-sm border border-stone-300 bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}
