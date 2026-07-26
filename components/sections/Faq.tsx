import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { Eyebrow } from "./Eyebrow";

export function Faq({
  eyebrow,
  title,
  items,
  className = "",
}: {
  eyebrow: string;
  title: string;
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <Section className={className}>
      <Container className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
        <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-primary-700 transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
