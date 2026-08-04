"use client";

import Link from "next/link";

import { ProfilesView } from "@/components/admin/alumni/ProfilesView";

export default function AdminAlumniPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-flame-ink">
          Alumni
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
          Profils alumni
        </h1>
        <p className="mt-3 text-stone-600">
          La base complète des membres BAMFA, tous statuts confondus.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link
            href="/admin/alumni/inscriptions"
            className="text-flame-ink underline-offset-4 hover:underline"
          >
            Demandes d'inscription
          </Link>
          <Link
            href="/admin/alumni/imports"
            className="text-flame-ink underline-offset-4 hover:underline"
          >
            Imports
          </Link>
        </div>
      </div>
      <ProfilesView />
    </div>
  );
}
