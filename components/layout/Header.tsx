"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/programmes", label: "Programmes" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center no-underline hover:no-underline">
          <Image src="/logo.jpg" alt="BAMFA" width={120} height={32} priority className="h-8 w-auto" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Button variant="gradient" size="sm">
            Nous soutenir
          </Button>
        </nav>
        <button
          type="button"
          className="flex flex-col gap-1 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="block h-0.5 w-6 bg-ink" />
        </button>
      </Container>
      {open && (
        <nav aria-label="Navigation mobile" className="border-t border-stone-200 bg-white md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button variant="gradient" size="sm">
              Nous soutenir
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
