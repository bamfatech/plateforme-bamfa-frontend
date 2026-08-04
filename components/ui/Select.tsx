"use client";

import { useId, type SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  /** Libellé du choix vide (filtre « tous ») ; omis, aucun choix vide n'est rendu. */
  placeholder?: string;
  error?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  id,
  className = "",
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600"
      >
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-11 w-full rounded-sm border bg-transparent px-3 text-ink outline-none focus-visible:border-flame focus-visible:ring-2 focus-visible:ring-flame/40 ${
          error ? "border-danger" : "border-ink/20"
        } ${className}`}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
