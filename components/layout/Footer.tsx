import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-stone-200 bg-cream">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">© {year} BAMFA. Tous droits réservés.</p>
        <nav aria-label="Liens de pied de page" className="flex gap-6 text-sm">
          <Link href="/a-propos">À propos</Link>
          <Link href="/vision-mission-valeurs">Vision & valeurs</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </Container>
    </footer>
  );
}
