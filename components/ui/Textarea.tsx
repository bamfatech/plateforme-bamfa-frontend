"use client";

import { useId, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  rows = 5,
  className = "",
  ...props
}: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-sm border bg-transparent px-3 py-2 text-ink outline-none focus-visible:border-flame focus-visible:ring-2 focus-visible:ring-flame/40 ${
          error ? "border-danger" : "border-ink/20"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
