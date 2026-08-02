interface FlameGlyphProps {
  className?: string;
  title?: string;
}

export function FlameGlyph({ className = "h-5 w-5", title }: FlameGlyphProps) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : "true"}
    >
      {labelled && <title>{title}</title>}
      {/* Deux pétales/flammes entrelacés — abstraction de la marque BAMFA */}
      <path d="M12 2c2.7 2.4 4.2 5 4.2 7.8 0 2.2-1.3 3.9-3.2 4.6 2.9.3 5 1.9 5 4 0 2.1-2.3 3.6-5.8 3.6-.8 0-1.5-.1-2.2-.2 1.7-.9 2.8-2.3 2.8-3.9 0-2.2-1.9-3.8-4.8-4.1 2.4-.6 3.9-2.2 3.9-4.3C11.9 8.9 11.4 6.3 12 2z" />
      <path d="M8.4 8.2c-1.9 1.9-2.9 3.9-2.9 5.9 0 2.7 2.2 4.6 5.7 4.9-2-1-3.2-2.6-3.2-4.5 0-2.1 1.3-4.1 3.4-6.1-1.1-.4-2.2-.5-3-0.2z" opacity=".85" />
    </svg>
  );
}
