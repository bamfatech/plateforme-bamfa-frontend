"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText, LayoutDashboard, Users, type LucideIcon } from "lucide-react";

import type { User } from "@/lib/auth/types";

interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  soon?: boolean;
}

const NAV: NavItem[] = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Contenus", icon: FileText, soon: true },
  { label: "Alumni", icon: Users, soon: true },
  { label: "Événements", icon: Calendar, soon: true },
];

export function Sidebar({ user }: { user: User }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-stone-300 bg-paper lg:flex">
      <div className="flex h-16 items-center border-b border-stone-300 px-6">
        <Link href="/admin" className="inline-flex">
          <Image src="/logo.jpg" alt="BAMFA" width={110} height={29} className="h-7 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4" aria-label="Navigation principale">
        {NAV.map((item) => {
          const Icon = item.icon;
          if (item.soon) {
            return (
              <span
                key={item.label}
                aria-disabled="true"
                className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-stone-400"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
                <span className="ml-auto rounded-sm bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-stone-500">
                  À venir
                </span>
              </span>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              <Icon className="h-5 w-5 text-flame-ink" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-300 p-4 text-xs text-stone-500">
        Connecté : <span>{user.email}</span>
      </div>
    </aside>
  );
}
