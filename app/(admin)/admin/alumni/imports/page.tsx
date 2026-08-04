"use client";

import Link from "next/link";

import { ImportsView } from "@/components/admin/alumni/ImportsView";

export default function AdminAlumniImportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-flame-ink">
          Alumni
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
          Import d'alumni
        </h1>
        <p className="mt-3 text-stone-600">
          Alimentez la base depuis un fichier CSV. Les profils importés sont
          validés d'office et n'apparaissent dans l'annuaire public que si la
          colonne de consentement l'indique.
        </p>
        <Link
          href="/admin/alumni"
          className="mt-4 inline-block text-sm text-flame-ink underline-offset-4 hover:underline"
        >
          Retour aux profils
        </Link>
      </div>
      <ImportsView />
    </div>
  );
}
