import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/sections/PageHeader";
import { org } from "@/content/org";

export const metadata = {
  title: "Organigramme — BAMFA",
  description: "L'équipe et la structure de gouvernance de BAMFA.",
};

export default function OrgPage() {
  return (
    <>
      <PageHeader title={org.header.title} intro={org.header.intro} />
      <Section>
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-primary-700">
            {org.mandate}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {org.members.map((m, i) => (
              <Card key={`${m.role}-${i}`}>
                <div className="font-heading text-lg font-semibold text-ink">{m.name}</div>
                <div className="mt-1 text-sm text-primary-700">{m.role}</div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
