import type { Metadata } from "next";
import Link from "next/link";

import { Directory } from "@/components/alumni/Directory";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Annuaire des alumni — BAMFA",
  description:
    "Découvrez les alumni de la Mastercard Foundation au Bénin : promotions, secteurs d'activité et parcours professionnels.",
};

export default function AnnuaireAlumniPage() {
  return (
    <>
      <PageHeader
        title="Annuaire des alumni"
        intro="La communauté BAMFA en un coup d'œil. Seuls les alumni ayant accepté la publication de leur profil y figurent."
      />
      <Section>
        <Container className="flex flex-col gap-8">
          <p className="text-sm text-stone-600">
            Vous êtes alumni de la Mastercard Foundation au Bénin ?{" "}
            <Link
              href="/alumni/inscription"
              className="text-flame-ink underline-offset-4 hover:underline"
            >
              Demandez votre inscription
            </Link>
            .
          </p>
          <Directory />
        </Container>
      </Section>
    </>
  );
}
