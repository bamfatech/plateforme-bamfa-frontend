export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-heading text-5xl font-semibold text-ink">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-stone-600">
        {label}
      </div>
    </div>
  );
}
