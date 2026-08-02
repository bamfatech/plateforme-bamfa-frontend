import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { Eyebrow } from "./Eyebrow";

export function Testimonials({
  eyebrow,
  title,
  items,
  className = "",
}: {
  eyebrow: string;
  title: string;
  items: { quote: string; name: string; role: string }[];
  className?: string;
}) {
  return (
    <Section className={className}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-stone-300 bg-stone-300 md:grid-cols-3">
          {items.map((item) => (
            <figure key={item.name} className="flex flex-col bg-paper p-8">
              <Quote className="h-7 w-7 text-flame" aria-hidden="true" />
              <blockquote className="mt-5 flex-1 font-heading text-xl leading-snug text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-stone-300 pt-4">
                <div className="font-medium text-ink">{item.name}</div>
                <div className="mt-0.5 font-mono text-xs uppercase tracking-[0.12em] text-stone-600">
                  {item.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
