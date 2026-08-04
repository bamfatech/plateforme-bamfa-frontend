"use client";

import { useEffect, useId, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg rounded-sm border border-stone-300 bg-paper p-6 shadow-lg"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-heading text-xl font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-sm p-1 text-stone-600 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
