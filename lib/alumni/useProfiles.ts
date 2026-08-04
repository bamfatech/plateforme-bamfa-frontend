"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { api } from "@/lib/api/client";

import { cleanParams } from "./params";
import type {
  AdminProfile,
  AdminProfileFilters,
  Paginated,
  ProfileAction,
} from "./types";

export function useProfiles(filters: AdminProfileFilters) {
  return useQuery<Paginated<AdminProfile>>({
    queryKey: ["alumni", "profils", filters],
    queryFn: async () => {
      const { data } = await api.get<Paginated<AdminProfile>>(
        "/alumni/admin/profils/",
        { params: cleanParams(filters) },
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useProfileAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action }: { id: number; action: ProfileAction }) => {
      const { data } = await api.post<AdminProfile>(
        `/alumni/admin/profils/${id}/${action}/`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumni", "profils"] });
    },
  });
}
