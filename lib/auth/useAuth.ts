"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api/client";
import type { User } from "./types";

interface Credentials {
  email: string;
  password: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const meQuery = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/me/");
      return data;
    },
  });

  const login = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const { data } = await api.post<User>("/auth/login/", credentials);
      return data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout/");
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
  });

  return {
    user: meQuery.data ?? null,
    isLoading: meQuery.isLoading,
    isAuthenticated: !!meQuery.data,
    login,
    logout,
  };
}
