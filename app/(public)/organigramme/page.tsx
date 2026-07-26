import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
            {org.mandate}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {org.members.map((member, index) => (
              <Card key={`${member.name}-${index}`} className="flex items-center gap-4">
                <Avatar name={member.name} />
                <div>
                  <div className="font-heading text-lg font-semibold text-ink">{member.name}</div>
                  <div className="mt-0.5 text-sm text-primary-700">{member.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
