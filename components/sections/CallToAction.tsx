import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function CallToAction({
  title,
  description,
  cta,
}: {
  title: string;
  description?: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-ink text-paper">
      <Container className="flex flex-col items-start gap-8 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-3 max-w-xl text-paper/75">{description}</p>}
        </div>
        <Link
          href={cta.href}
          className="inline-flex h-12 shrink-0 items-center rounded-sm bg-paper px-7 font-medium text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {cta.label}
        </Link>
      </Container>
    </section>
  );
}
