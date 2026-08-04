"use client";

import { useRef, useState } from "react";

import { ApiError } from "@/lib/api/client";
import type { ImportReport } from "@/lib/alumni/types";
import { useCreateImport } from "@/lib/alumni/useImports";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

function messageErreur(erreur: unknown): string {
  if (erreur instanceof ApiError) {
    const details = (erreur.data as { error?: { details?: Record<string, string[]> } })
      ?.error?.details;
    const messages = details?.fichier;
    if (messages?.length) return messages[0];
  }
  return "L'import a échoué. Vérifiez le fichier et réessayez.";
}

export function ImportForm({
  onImported,
}: {
  onImported: (report: ImportReport) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fichier, setFichier] = useState<File | null>(null);
  const [strict, setStrict] = useState(false);
  const [erreur, setErreur] = useState("");
  const creer = useCreateImport();

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErreur("");
    if (!fichier) {
      setErreur("Sélectionnez un fichier CSV.");
      return;
    }
    creer.mutate(
      { file: fichier, strict },
      {
        onSuccess: (report) => {
          onImported(report);
          setFichier(null);
          if (inputRef.current) inputRef.current.value = "";
        },
        onError: (err) => setErreur(messageErreur(err)),
      },
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {erreur && <Alert variant="danger">{erreur}</Alert>}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="import-fichier"
          className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600"
        >
          Fichier CSV
        </label>
        <input
          ref={inputRef}
          id="import-fichier"
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => setFichier(e.target.files?.[0] ?? null)}
          className="rounded-sm border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink file:mr-3 file:rounded-sm file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-sm file:text-paper focus-visible:border-flame focus-visible:outline-none"
        />
        <p className="text-xs text-stone-600">
          Colonnes requises : <code className="font-mono">email</code>,{" "}
          <code className="font-mono">nom</code>,{" "}
          <code className="font-mono">prenom</code>,{" "}
          <code className="font-mono">promotion</code>. Séparateur{" "}
          <code className="font-mono">,</code> ou{" "}
          <code className="font-mono">;</code>. Les alumni déjà présents sont mis
          à jour, jamais dupliqués.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={strict}
          onChange={(e) => setStrict(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded-sm border-ink/25 text-flame focus-visible:ring-2 focus-visible:ring-flame"
        />
        <span>
          Mode « tout ou rien » : la première ligne invalide annule l'import
          entier. Sans cette option, les lignes valides sont importées et les
          autres consignées au rapport.
        </span>
      </label>

      <Button type="submit" loading={creer.isPending} className="self-start">
        Importer le fichier
      </Button>
    </form>
  );
}
