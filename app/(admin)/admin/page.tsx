"use client";

import { useAuth } from "@/lib/auth/useAuth";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">
          Bonjour {firstName} 👋
        </h1>
        <p className="mt-2 text-stone-600">
          Bienvenue dans votre back-office BAMFA.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm font-medium text-stone-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-stone-300">—</p>
            <p className="mt-1 text-xs text-stone-400">{stat.hint} · à venir</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
