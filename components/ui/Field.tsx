"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, className = "", type, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-11 w-full rounded-sm border bg-transparent px-3 ${isPassword ? "pr-11" : ""} text-ink outline-none focus-visible:border-flame focus-visible:ring-2 focus-visible:ring-flame/40 ${
            error ? "border-danger" : "border-ink/20"
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex items-center rounded-sm px-3 text-stone-600 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
          >
            {visible ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
