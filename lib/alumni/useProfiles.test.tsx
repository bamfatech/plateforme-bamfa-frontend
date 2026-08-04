import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { createTestQueryClient, queryWrapper } from "@/lib/test-utils";

import { useDirectory } from "./useDirectory";
import { useProfileAction, useProfiles } from "./useProfiles";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

describe("useProfiles", () => {
  it("charge la liste d'administration", async () => {
    mock
      .onGet("/alumni/admin/profils/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });

    const { result } = renderHook(() => useProfiles({}), {
      wrapper: queryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.count).toBe(0);
  });

  it("envoie les filtres booléens, y compris false", async () => {
    mock
      .onGet("/alumni/admin/profils/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });

    const { result } = renderHook(
      () => useProfiles({ consentement: false, a_un_compte: true }),
      { wrapper: queryWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mock.history.get[0].params).toEqual({
      consentement: false,
      a_un_compte: true,
    });
  });
});

describe("useProfileAction", () => {
  it("appelle l'action demandée sur le bon profil", async () => {
    mock.onPost("/alumni/admin/profils/7/suspendre/").reply(200, { id: 7 });

    const { result } = renderHook(() => useProfileAction(), {
      wrapper: queryWrapper(),
    });
    result.current.mutate({ id: 7, action: "suspendre" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mock.history.post[0].url).toBe("/alumni/admin/profils/7/suspendre/");
  });

  it("invalide aussi l'annuaire public, qui peut afficher le même profil", async () => {
    const client = createTestQueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );

    mock
      .onGet("/alumni/annuaire/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/profils/7/suspendre/").reply(200, { id: 7 });

    const { result: directory } = renderHook(() => useDirectory({}), { wrapper });
    await waitFor(() => expect(directory.current.isSuccess).toBe(true));

    const appelsAnnuaireAvant = mock.history.get.filter(
      (r) => r.url === "/alumni/annuaire/",
    ).length;

    const { result: action } = renderHook(() => useProfileAction(), { wrapper });
    action.current.mutate({ id: 7, action: "suspendre" });
    await waitFor(() => expect(action.current.isSuccess).toBe(true));

    // `isInvalidated` retombe à `false` dès que le refetch déclenché par
    // l'invalidation se termine (immédiat ici, le mock répondant sans
    // délai) : on vérifie donc la trace d'un second GET sur l'annuaire,
    // pas ce drapeau transitoire.
    await waitFor(() =>
      expect(
        mock.history.get.filter((r) => r.url === "/alumni/annuaire/").length,
      ).toBeGreaterThan(appelsAnnuaireAvant),
    );
  });
});
