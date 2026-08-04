"use client";

import { useState } from "react";

import { REGISTRATION_STATUS_OPTIONS } from "@/content/alumni";
import type { Registration, RegistrationFilters } from "@/lib/alumni/types";
import {
  useApproveRegistration,
  useRegistrations,
  useRejectRegistration,
} from "@/lib/alumni/useRegistrations";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/Textarea";

import { RegistrationsTable } from "./RegistrationsTable";

const PAGE_SIZE = 20;

export function RegistrationsView() {
  const [filters, setFilters] = useState<RegistrationFilters>({ page: 1 });
  const [aRejeter, setARejeter] = useState<Registration | null>(null);
  const [motif, setMotif] = useState("");

  const { data, isLoading, isError } = useRegistrations(filters);
  const approuver = useApproveRegistration();
  const rejeter = useRejectRegistration();

  function set(champ: keyof RegistrationFilters, valeur: string) {
    setFilters({ ...filters, [champ]: valeur, page: 1 });
  }

  function ouvrirRejet(registration: Registration) {
    setARejeter(registration);
    setMotif("");
  }

  function confirmerRejet() {
    if (!aRejeter) return;
    rejeter.mutate(
      { id: aRejeter.id, motif },
      { onSuccess: () => setARejeter(null) },
    );
  }

  const enCours = approuver.isPending || rejeter.isPending;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field
          label="Rechercher"
          placeholder="Nom, e-mail"
          value={filters.search ?? ""}
          onChange={(e) => set("search", e.target.value)}
        />
        <Select
          label="Statut"
          options={REGISTRATION_STATUS_OPTIONS}
          placeholder="Tous"
          value={filters.statut ?? ""}
          onChange={(e) => set("statut", e.target.value)}
        />
      </div>

      {isError && (
        <Alert variant="danger">
          Les demandes n'ont pas pu être chargées. Veuillez réessayer.
        </Alert>
      )}
      {(approuver.isError || rejeter.isError) && (
        <Alert variant="danger">
          L'instruction n'a pas pu être enregistrée. Veuillez réessayer.
        </Alert>
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-flame-ink" />
        </div>
      )}

      {data && data.results.length === 0 && (
        <Alert variant="info">Aucune demande ne correspond à ces critères.</Alert>
      )}

      {data && data.results.length > 0 && (
        <>
          <p className="font-mono text-xs text-stone-600">
            {data.count} demande{data.count > 1 ? "s" : ""}
          </p>
          <RegistrationsTable
            registrations={data.results}
            onApprove={(id) => approuver.mutate({ id })}
            onReject={ouvrirRejet}
            pending={enCours}
          />
          <Pagination
            count={data.count}
            page={filters.page ?? 1}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </>
      )}

      <Modal
        open={aRejeter !== null}
        title="Rejeter la demande"
        onClose={() => setARejeter(null)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-700">
            Le motif, s'il est renseigné, sera communiqué à{" "}
            <span className="font-mono text-ink">{aRejeter?.email}</span> dans
            l'e-mail de notification.
          </p>
          <Textarea
            label="Motif du rejet (facultatif)"
            rows={4}
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              loading={rejeter.isPending}
              onClick={confirmerRejet}
            >
              Confirmer le rejet
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setARejeter(null)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
