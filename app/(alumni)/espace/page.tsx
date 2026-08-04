"use client";

import Link from "next/link";

import { ApiError } from "@/lib/api/client";
import { useSelfProfile } from "@/lib/alumni/useSelfProfile";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Spinner } from "@/components/ui/Spinner";
import { cardShell, monoLabel } from "@/components/ui/styles";

export default function EspacePage() {
  const { data: profil, isLoading, isError, error } = useSelfProfile();

  // Un 404 signifie « pas de profil alumni » (invitation à s'inscrire) ;
  // toute autre erreur est une vraie panne et ne doit pas être confondue avec ce cas.
  const profilAbsent = error instanceof ApiError && error.status === 404;

  return (
    <Section>
      <Container className="flex max-w-3xl flex-col gap-8">
        {isLoading && (
          <div className="flex justify-center py-12">
            <Spinner className="h-8 w-8 text-flame-ink" />
          </div>
        )}

        {isError && profilAbsent && (
          <Alert variant="info">
            Aucun profil alumni n'est rattaché à ce compte. Si vous êtes alumni
            de la Mastercard Foundation au Bénin,{" "}
            <Link
              href="/alumni/inscription"
              className="underline underline-offset-4"
            >
              demandez votre inscription
            </Link>
            .
          </Alert>
        )}

        {isError && !profilAbsent && (
          <Alert variant="danger">
            Une erreur est survenue lors du chargement de votre profil.
            Réessayez plus tard, ou contactez l'équipe BAMFA si le problème
            persiste.
          </Alert>
        )}

        {profil && (
          <>
            <div>
              <p className={`${monoLabel} text-flame-ink`}>Espace alumni</p>
              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
                Bonjour {profil.first_name}
              </h1>
              <p className="mt-3 text-stone-600">
                Promotion {profil.promotion}
                {profil.organization && ` · ${profil.organization}`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>{profil.status_display}</Badge>
                {profil.sector_display && <Badge>{profil.sector_display}</Badge>}
              </div>
            </div>

            <div className={`${cardShell} p-6`}>
              <p className={`${monoLabel} text-stone-600`}>
                Complétude de votre profil
              </p>
              <p className="mt-2 font-heading text-4xl font-semibold text-ink">
                {profil.completeness} %
              </p>
              <div
                role="progressbar"
                aria-valuenow={profil.completeness}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Complétude du profil"
                className="mt-4 h-1.5 w-full overflow-hidden rounded-sm bg-stone-200"
              >
                <div
                  className="h-full bg-flame"
                  style={{ width: `${profil.completeness}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-stone-600">
                {profil.directory_consent
                  ? "Votre profil figure dans l'annuaire public."
                  : "Votre profil ne figure pas dans l'annuaire public."}{" "}
                L'édition de votre profil depuis cette page arrivera
                prochainement — contactez l'équipe BAMFA d'ici là.
              </p>
            </div>

            <Link
              href="/alumni"
              className="self-start text-sm text-flame-ink underline-offset-4 hover:underline"
            >
              Parcourir l'annuaire des alumni
            </Link>
          </>
        )}
      </Container>
    </Section>
  );
}
