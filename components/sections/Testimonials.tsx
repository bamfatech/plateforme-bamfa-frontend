import { Quote } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { Eyebrow } from "./Eyebrow";

export function Testimonials({
  eyebrow,
  title,
  items,
  className = "bg-cream",
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
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-primary-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-stone-700">{item.quote}</blockquote>
              <figcaption className="mt-5">
                <div className="font-heading font-semibold text-ink">{item.name}</div>
                <div className="text-sm text-stone-500">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
