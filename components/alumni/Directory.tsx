"use client";

import { useState } from "react";

import { useDirectory } from "@/lib/alumni/useDirectory";
import type { DirectoryFilters as Filters } from "@/lib/alumni/types";
import { Alert } from "@/components/ui/Alert";
import { Pagination } from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/Spinner";

import { DirectoryCard } from "./DirectoryCard";
import { DirectoryFilters } from "./DirectoryFilters";

const PAGE_SIZE = 20;

export function Directory() {
  const [filters, setFilters] = useState<Filters>({ page: 1 });
  const { data, isLoading, isError } = useDirectory(filters);

  return (
    <div className="flex flex-col gap-8">
      <DirectoryFilters values={filters} onChange={setFilters} />

      {isError && (
        <Alert variant="danger">
          L'annuaire n'a pas pu être chargé. Veuillez réessayer dans quelques
          instants.
        </Alert>
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-flame-ink" />
        </div>
      )}

      {data && data.results.length === 0 && (
        <Alert variant="info">
          Aucun alumni ne correspond à votre recherche.
        </Alert>
      )}

      {data && data.results.length > 0 && (
        <>
          <p className="font-mono text-xs text-stone-600">
            {data.count} alumni référencé{data.count > 1 ? "s" : ""}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((entry) => (
              <DirectoryCard key={entry.id} entry={entry} />
            ))}
          </div>
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
