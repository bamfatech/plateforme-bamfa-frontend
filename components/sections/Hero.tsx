import Link from "next/link";

import { Container } from "@/components/ui/Container";

type Cta = { label: string; href: string };

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="bg-brand-gradient text-white">
      <Container className="py-20 sm:py-28">
        <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg text-white/90">{subtitle}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex h-12 items-center rounded-md bg-white px-6 font-medium text-primary-700 hover:bg-white/90"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 items-center rounded-md border border-white/70 px-6 font-medium text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
