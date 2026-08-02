import Image from "next/image";
import Link from "next/link";

import { FlameGlyph } from "@/components/brand/FlameGlyph";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Connexion — BAMFA",
};

export default function ConnexionPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Panneau de marque éditorial (encre) — masqué en mobile */}
      <div className="relative hidden flex-col justify-between bg-ink p-12 text-paper lg:flex">
        <Link href="/" className="inline-flex">
          <Image
            src="/logo.jpg"
            alt="BAMFA"
            width={132}
            height={35}
            className="h-10 w-auto rounded-sm"
          />
        </Link>
        <div>
          <FlameGlyph className="h-8 w-8 text-flame" />
          <h1 className="mt-6 font-heading text-5xl font-semibold leading-[1.02] tracking-tight">
            Espace membre
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-paper/70">
            Accédez à votre back-office pour gérer les contenus, la communauté et la vie de
            l'association.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper/50">
          Benin Association of the Mastercard Foundation Alumni
        </p>
      </div>

      {/* Carte de connexion */}
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <Image src="/logo.png" alt="BAMFA" width={120} height={32} className="h-9 w-auto" />
          </Link>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">Connexion</h2>
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
