import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const discover = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/a-propos#equipe", label: "Notre équipe" },
  { href: "/a-propos#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Redirections vers les plateformes partenaires (URLs à renseigner).
const platforms = [
  { href: "#", label: "Transition Alumni MCF" },
  { href: "#", label: "Baobab" },
  { href: "#", label: "ACN" },
];

const socials: { href: string; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { href: "#", label: "Facebook", icon: FacebookIcon },
  { href: "#", label: "LinkedIn", icon: LinkedInIcon },
  { href: "#", label: "Instagram", icon: InstagramIcon },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-ink text-stone-300">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.jpg"
              alt="BAMFA"
              width={132}
              height={35}
              className="h-9 w-auto rounded-sm bg-white/95 px-2 py-1"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
              Le réseau des alumni Mastercard Foundation au Bénin : fédérer, accompagner et
              valoriser pour multiplier l'impact.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Découvrir">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper">
              Découvrir
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {discover.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Plateformes partenaires">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper">
              Plateformes
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {platforms.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:contact@bamfa.org" className="transition hover:text-white">
                  contact@bamfa.org
                </a>
              </li>
              <li>Cotonou, Bénin</li>
              <li>
                <Link href="/contact" className="text-gold transition hover:text-paper">
                  Nous écrire →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} BAMFA. Tous droits réservés.</p>
          <p>Site vitrine — contenu en cours d'actualisation.</p>
        </div>
      </Container>
    </footer>
  );
}
