import Image from "next/image";
import Link from "next/link";

import { FlameGlyph } from "@/components/brand/FlameGlyph";
import { Reveal } from "@/components/motion/Reveal";
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
    <section className="border-b border-stone-300 bg-paper">
      <Container className="grid grid-cols-1 items-end gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-7">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <FlameGlyph className="h-5 w-5 text-flame" />
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <Reveal>
            <h1 className="mt-6 font-heading text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">{subtitle}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex h-12 items-center rounded-sm bg-ink px-7 font-medium text-paper transition-colors hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-sm font-medium text-flame-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame"
                >
                  {secondaryCta.label} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          )}
        </div>
        {imageSrc && (
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-stone-300">
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
