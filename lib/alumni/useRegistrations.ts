"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/lib/api/client";

import { cleanParams } from "./params";
import type { Paginated, Registration, RegistrationFilters } from "./types";

export function useRegistrations(filters: RegistrationFilters) {
  return useQuery<Paginated<Registration>>({
    queryKey: ["alumni", "inscriptions", filters],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Registration>>(
        "/alumni/admin/inscriptions/",
        { params: cleanParams(filters) },
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
}

function useReviewMutation(action: "approuver" | "rejeter") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, motif }: { id: number; motif?: string }) => {
      const { data } = await api.post(
        `/alumni/admin/inscriptions/${id}/${action}/`,
        action === "rejeter" ? { motif: motif ?? "" } : undefined,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni", "inscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["alumni", "profils"] });
    },
  });
}

export function useApproveRegistration() {
  return useReviewMutation("approuver");
}

export function useRejectRegistration() {
  return useReviewMutation("rejeter");
}
