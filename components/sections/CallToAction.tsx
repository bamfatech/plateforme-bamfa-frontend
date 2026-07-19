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
    <section className="bg-ink text-white">
      <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">{title}</h2>
          {description && <p className="mt-2 text-white/80">{description}</p>}
        </div>
        <Link
          href={cta.href}
          className="inline-flex h-12 shrink-0 items-center rounded-md bg-brand-gradient px-6 font-medium text-white hover:opacity-90"
        >
          {cta.label}
        </Link>
      </Container>
    </section>
  );
}
