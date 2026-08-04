"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";

import { cleanParams } from "./params";
import type { DirectoryEntry, DirectoryFilters, Paginated } from "./types";

export function useDirectory(filters: DirectoryFilters) {
  return useQuery<Paginated<DirectoryEntry>>({
    queryKey: ["alumni", "annuaire", filters],
    queryFn: async () => {
      const { data } = await api.get<Paginated<DirectoryEntry>>(
        "/alumni/annuaire/",
        { params: cleanParams(filters) },
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
}
