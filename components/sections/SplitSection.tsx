import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { Eyebrow } from "./Eyebrow";

export function SplitSection({
  eyebrow,
  title,
  children,
  imageSrc,
  imageAlt,
  imageSide = "right",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  className?: string;
}) {
  return (
    <Section className={className}>
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={imageSide === "left" ? "lg:order-2" : undefined}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-stone-600">{children}</div>
        </div>
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ${
            imageSide === "left" ? "lg:order-1" : ""
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Container>
    </Section>
  );
}
