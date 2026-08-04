"use client";

import { Button } from "./Button";

interface PaginationProps {
  /** Nombre total d'éléments, tel que renvoyé par l'API. */
  count: number;
  /** Page courante, 1-indexée. */
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ count, page, pageSize, onPageChange }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(count / pageSize));
  if (pages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 pt-4"
    >
      <Button
        type="button"
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Précédent
      </Button>
      <p aria-live="polite" className="font-mono text-xs text-stone-600">
        Page {page} sur {pages}
      </p>
      <Button
        type="button"
        variant="secondary"
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant
      </Button>
    </nav>
  );
}
