import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";
import { howItWorks } from "@/content/how-it-works";

export const metadata = {
  title: "Fonctionnement — BAMFA",
  description: "Gouvernance, adhésion et activités de l'association BAMFA.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader title={howItWorks.header.title} intro={howItWorks.header.intro} />
      <Section>
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {howItWorks.sections.map((section) => {
            const Icon = section.icon;
            return (
              <article
                key={section.title}
                className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-heading text-xl font-semibold text-ink">
                  {section.title}
                </h2>
                <p className="mt-2 text-stone-600">{section.text}</p>
              </article>
            );
          })}
        </Container>
      </Section>
      <CallToAction {...howItWorks.cta} />
    </>
  );
}
