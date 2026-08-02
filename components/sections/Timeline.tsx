export function Timeline({
  steps,
}: {
  steps: { year: string; title: string; text: string }[];
}) {
  return (
    <ol className="divide-y divide-stone-300 border-y border-stone-300">
      {steps.map((step, index) => (
        <li key={step.year} className="grid gap-3 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-flame-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600">
              {step.year}
            </span>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-stone-600">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
