"use client";

import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/ui/Container";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-300 bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <NextLink href="/" className="inline-flex items-center">
          <Image src="/logo.png" alt="BAMFA" width={200} height={50} priority className="h-10 w-auto" />
        </NextLink>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <NextLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame ${
                  active ? "text-ink" : "text-stone-600 hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-flame transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </NextLink>
            );
          })}
          <NextLink
            href="/contact"
            className="inline-flex h-9 items-center rounded-sm bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Nous soutenir
          </NextLink>
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
        <nav aria-label="Navigation mobile" className="border-t border-stone-300 bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <NextLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-sm px-2 py-2 text-sm transition-colors ${
                    active ? "bg-ink/5 font-medium text-ink" : "text-stone-600 hover:text-ink"
                  }`}
                >
                  {item.label}
                </NextLink>
              );
            })}
            <NextLink
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-9 items-center rounded-sm bg-ink px-4 text-sm font-medium text-paper hover:bg-ember"
            >
              Nous soutenir
            </NextLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
