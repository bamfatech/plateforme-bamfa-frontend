import Link from "next/link";

import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion — BAMFA",
};

export default function ConnexionPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Panneau de marque (masqué en mobile) */}
      <div className="relative hidden overflow-hidden bg-brand-gradient p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/20" />
        <Link href="/" className="relative font-heading text-2xl font-bold">
          BAMFA
        </Link>
        <div className="relative">
          <h1 className="font-heading text-4xl font-bold leading-tight">
            Espace membre
          </h1>
          <p className="mt-4 max-w-md text-white/90">
            Accédez à votre back-office pour gérer les contenus, la communauté
            et la vie de l'association.
          </p>
        </div>
        <p className="relative text-sm text-white/70">
          Benin Association of the Mastercard Foundation Alumni
        </p>
      </div>

      {/* Carte de connexion */}
      <div className="flex items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="font-heading text-2xl font-bold text-primary-700">
              BAMFA
            </Link>
          </div>
          <h2 className="font-heading text-2xl font-bold text-ink">Connexion</h2>
          <p className="mt-2 text-sm text-stone-600">
            Entrez vos identifiants pour accéder à votre espace.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
