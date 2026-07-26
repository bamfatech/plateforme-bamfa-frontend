import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/sections/Eyebrow";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitSection } from "@/components/sections/SplitSection";
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

      <SplitSection
        eyebrow={values.vision.eyebrow}
        title={values.vision.title}
        imageSrc={values.vision.imageSrc}
        imageAlt={values.vision.imageAlt}
        imageSide="right"
      >
        <p>{values.vision.text}</p>
      </SplitSection>

      <SplitSection
        eyebrow={values.mission.eyebrow}
        title={values.mission.title}
        imageSrc={values.mission.imageSrc}
        imageAlt={values.mission.imageAlt}
        imageSide="left"
        className="bg-cream"
      >
        <p>{values.mission.text}</p>
      </SplitSection>

      <Section>
        <Container>
          <Eyebrow>Nos valeurs</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
            {values.valuesTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.items.map((value) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
