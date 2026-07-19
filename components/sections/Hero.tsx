import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

import { Eyebrow } from "./Eyebrow";

type Cta = { label: string; href: string };

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-white">
      {/* Forme organique décorative (écho à l'emblème BAMFA) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl"
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div>
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-xl text-lg text-white/90">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex h-12 items-center rounded-md bg-white px-6 font-medium text-primary-700 shadow-sm transition hover:bg-white/90"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-12 items-center rounded-md border border-white/70 px-6 font-medium text-white transition hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
        {imageSrc && (
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] ring-8 ring-white/20">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
