"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";

import type { ImportReport, Paginated } from "./types";

export function useImports() {
  return useQuery<Paginated<ImportReport>>({
    queryKey: ["alumni", "imports"],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ImportReport>>(
        "/alumni/admin/imports/",
      );
      return data;
    },
  });
}

export function useCreateImport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, strict }: { file: File; strict: boolean }) => {
      const body = new FormData();
      body.append("fichier", file);
      body.append("strict", String(strict));
      const { data } = await api.post<ImportReport>(
        "/alumni/admin/imports/",
        body,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni", "imports"] });
      queryClient.invalidateQueries({ queryKey: ["alumni", "profils"] });
    },
  });
}
