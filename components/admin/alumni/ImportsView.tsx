"use client";

import { useState } from "react";

import type { ImportReport } from "@/lib/alumni/types";
import { useImports } from "@/lib/alumni/useImports";
import { Alert } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";

import { ImportForm } from "./ImportForm";
import { ImportReportCard } from "./ImportReportCard";

export function ImportsView() {
  const [dernier, setDernier] = useState<ImportReport | null>(null);
  const { data, isLoading, isError } = useImports();

  // L'historique inclut déjà le dernier import après invalidation du cache :
  // on ne le met donc en avant qu'une fois, sans le dupliquer dans la liste.
  const historique = (data?.results ?? []).filter(
    (report) => report.id !== dernier?.id,
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Importer des alumni
        </h2>
        <ImportForm onImported={setDernier} />
      </section>

      {dernier && (
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Résultat du dernier import
          </h2>
          <ImportReportCard report={dernier} />
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Historique
        </h2>

        {isError && (
          <Alert variant="danger">
            L'historique n'a pas pu être chargé. Veuillez réessayer.
          </Alert>
        )}

        {isLoading && (
          <div className="flex justify-center py-8">
            <Spinner className="h-8 w-8 text-flame-ink" />
          </div>
        )}

        {data && historique.length === 0 && !dernier && (
          <Alert variant="info">Aucun import n'a encore été effectué.</Alert>
        )}

        <div className="flex flex-col gap-4">
          {historique.map((report) => (
            <ImportReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>
    </div>
  );
}
