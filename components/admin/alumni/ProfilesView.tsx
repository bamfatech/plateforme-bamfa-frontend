"use client";

import { useState } from "react";

import type { AdminProfileFilters, ProfileAction } from "@/lib/alumni/types";
import { useProfileAction, useProfiles } from "@/lib/alumni/useProfiles";
import { Alert } from "@/components/ui/Alert";
import { Pagination } from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/Spinner";

import { ProfileFilters } from "./ProfileFilters";
import { ProfilesTable } from "./ProfilesTable";

const PAGE_SIZE = 20;

export function ProfilesView() {
  const [filters, setFilters] = useState<AdminProfileFilters>({ page: 1 });
  const { data, isLoading, isError } = useProfiles(filters);
  const action = useProfileAction();

  function onAction(id: number, nom: ProfileAction) {
    action.mutate({ id, action: nom });
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileFilters values={filters} onChange={setFilters} />

      {isError && (
        <Alert variant="danger">
          Les profils n'ont pas pu être chargés. Veuillez réessayer.
        </Alert>
      )}
      {action.isError && (
        <Alert variant="danger">
          L'action n'a pas pu être appliquée. Veuillez réessayer.
        </Alert>
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-flame-ink" />
        </div>
      )}

      {data && data.results.length === 0 && (
        <Alert variant="info">Aucun profil ne correspond à ces critères.</Alert>
      )}

      {data && data.results.length > 0 && (
        <>
          <p className="font-mono text-xs text-stone-600">
            {data.count} profil{data.count > 1 ? "s" : ""}
          </p>
          <ProfilesTable
            profiles={data.results}
            onAction={onAction}
            pending={action.isPending}
          />
          <Pagination
            count={data.count}
            page={filters.page ?? 1}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </>
      )}
    </div>
  );
}
