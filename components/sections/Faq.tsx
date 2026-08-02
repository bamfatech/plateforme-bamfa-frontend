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
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-flame-ink transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 leading-relaxed text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
