import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { ValueCard } from "@/components/sections/ValueCard";
import { values } from "@/content/values";

export const metadata = {
  title: "Vision, mission & valeurs — BAMFA",
  description: "La vision, la mission et les valeurs qui guident BAMFA.",
};

export default function ValuesPage() {
  return (
    <>
      <PageHeader title={values.header.title} intro={values.header.intro} />
      <Section>
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">{values.vision.title}</h2>
            <p className="mt-3 text-stone-600">{values.vision.text}</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">{values.mission.title}</h2>
            <p className="mt-3 text-stone-600">{values.mission.text}</p>
          </div>
        </Container>
      </Section>
      <Section className="bg-cream">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-ink">Nos valeurs</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.items.map((v) => (
              <ValueCard key={v.title} icon={v.icon} title={v.title} description={v.description} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
