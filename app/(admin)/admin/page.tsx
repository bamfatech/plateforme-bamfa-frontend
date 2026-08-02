"use client";

import { useAuth } from "@/lib/auth/useAuth";
import { Badge } from "@/components/ui/Badge";
import { monoLabel } from "@/components/ui/styles";

const STATS = [
  { label: "Membres", hint: "Annuaire alumni" },
  { label: "Contenus publiés", hint: "Articles & actualités" },
  { label: "Événements à venir", hint: "Agenda associatif" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.first_name || "membre";
  const roles = user?.is_superuser ? ["Administrateur"] : user?.roles ?? [];

  return (
    <div className="space-y-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-flame-ink">
          Tableau de bord
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
          Bonjour {firstName}
        </h1>
        <p className="mt-3 text-stone-600">Bienvenue dans votre back-office BAMFA.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-px overflow-hidden rounded-sm border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-paper p-6">
            <p className={`${monoLabel} text-stone-600`}>
              {stat.label}
            </p>
            <p className="mt-3 font-heading text-4xl font-semibold text-stone-300">—</p>
            <p className="mt-1 text-xs text-stone-600">{stat.hint} · à venir</p>
          </div>
        ))}
      </div>
    </div>
  );
}
