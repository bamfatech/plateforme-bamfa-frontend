export function Timeline({
  steps,
}: {
  steps: { year: string; title: string; text: string }[];
}) {
  return (
    <ol className="space-y-8">
      {steps.map((step, index) => (
        <li key={step.year} className="flex gap-5">
          <div className="flex flex-col items-center">
            <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded-full bg-brand-gradient" />
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="mt-1 w-px flex-1 bg-primary-200" />
            )}
          </div>
          <div className="pb-2">
            <div className="text-sm font-semibold text-primary-700">{step.year}</div>
            <h3 className="mt-1 font-heading text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-1 text-stone-600">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
