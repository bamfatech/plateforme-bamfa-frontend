export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-heading text-4xl font-bold text-primary-600">{value}</div>
      <div className="mt-1 text-sm text-stone-600">{label}</div>
    </div>
  );
}
