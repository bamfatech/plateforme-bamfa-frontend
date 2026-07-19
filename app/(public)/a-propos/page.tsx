import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { about } from "@/content/about";

export const metadata = {
  title: "À propos — BAMFA",
  description: "Découvrez BAMFA, le réseau des alumni de la Mastercard Foundation au Bénin.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.header.title} intro={about.header.intro} />
      <Section>
        <Container className="flex flex-col gap-10">
          {about.sections.map((s) => (
            <div key={s.title} className="max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-ink">{s.title}</h2>
              <p className="mt-3 text-stone-600">{s.text}</p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
