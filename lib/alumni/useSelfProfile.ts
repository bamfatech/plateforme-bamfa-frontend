"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/client";

export interface SelfProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  promotion: number;
  country: string;
  city: string;
  sector: string;
  sector_display: string;
  current_position: string;
  organization: string;
  bio: string;
  linkedin_url: string;
  directory_consent: boolean;
  status: string;
  status_display: string;
  completeness: number;
}

export function useSelfProfile() {
  return useQuery<SelfProfile>({
    queryKey: ["alumni", "moi"],
    queryFn: async () => {
      const { data } = await api.get<SelfProfile>("/alumni/moi/");
      return data;
    },
    // Un compte sans profil alumni répond 404 : inutile de réessayer.
    retry: false,
  });
}
