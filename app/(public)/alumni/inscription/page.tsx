import type { Metadata } from "next";

import { RegistrationForm } from "@/components/alumni/RegistrationForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Rejoindre BAMFA — Inscription alumni",
  description:
    "Formulaire d'inscription à la Benin Association of the Mastercard Foundation Alumni. Votre demande est examinée par l'équipe BAMFA.",
};

export default function InscriptionAlumniPage() {
  return (
    <>
      <PageHeader
        title="Rejoindre la communauté BAMFA"
        intro="Remplissez ce formulaire pour demander votre inscription. Votre demande sera examinée par l'équipe, puis vous recevrez un e-mail pour activer votre accès."
      />
      <Section>
        <Container className="max-w-3xl">
          <RegistrationForm />
        </Container>
      </Section>
    </>
  );
}
