import type { Metadata } from "next";

import { ActivationForm } from "@/components/alumni/ActivationForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Activer mon accès — BAMFA",
  robots: { index: false, follow: false },
};

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <>
      <PageHeader
        title="Activer mon accès"
        intro="Dernière étape : définissez le mot de passe qui vous servira à vous connecter à la plateforme BAMFA."
      />
      <Section>
        <Container className="max-w-md">
          <ActivationForm token={token ?? null} />
        </Container>
      </Section>
    </>
  );
}
