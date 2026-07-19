import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
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
          {howItWorks.sections.map((s) => (
            <Card key={s.title}>
              <h2 className="font-heading text-xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-2 text-stone-600">{s.text}</p>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
}
