"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import type { User } from "@/lib/auth/types";
import { useAuth } from "@/lib/auth/useAuth";
import { Button } from "@/components/ui/Button";

export function Topbar({ user }: { user: User }) {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout.mutateAsync();
    } catch {
      // même si l'appel serveur échoue, on déconnecte côté client
    } finally {
      router.replace("/connexion");
    }
  }

  const displayName =
    [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;
  const role = user.is_superuser ? "Administrateur" : user.roles[0] ?? "Membre";

  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-6">
      <div>
        <p className="text-sm font-medium text-ink">{displayName}</p>
        <p className="text-xs text-stone-500">{role}</p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleLogout}
        loading={logout.isPending}
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Déconnexion
      </Button>
    </header>
  );
}
