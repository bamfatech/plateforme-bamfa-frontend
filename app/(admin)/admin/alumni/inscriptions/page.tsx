"use client";

import Link from "next/link";

import { RegistrationsView } from "@/components/admin/alumni/RegistrationsView";

export default function AdminAlumniInscriptionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-flame-ink">
          Alumni
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
          Demandes d'inscription
        </h1>
        <p className="mt-3 text-stone-600">
          Instruisez les candidatures reçues depuis le site public. Une
          approbation crée le profil et envoie le lien d'activation.
        </p>
        <Link
          href="/admin/alumni"
          className="mt-4 inline-block text-sm text-flame-ink underline-offset-4 hover:underline"
        >
          Retour aux profils
        </Link>
      </div>
      <RegistrationsView />
    </div>
  );
}
