import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { createTestQueryClient, queryWrapper } from "@/lib/test-utils";

import { useDirectory } from "./useDirectory";
import {
  useApproveRegistration,
  useRegistrations,
  useRejectRegistration,
} from "./useRegistrations";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const REPONSE = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 3,
      first_name: "Awa",
      last_name: "Doe",
      email: "awa.doe@example.com",
      promotion: 2018,
      country: "Bénin",
      phone: "+22900000000",
      city: "Cotonou",
      university: "UAC",
      mcf_program: "MCF 2018",
      sector: "numerique",
      sector_display: "Technologies et numérique",
      current_position: "Développeuse",
      organization: "BAMFA",
      bio: "Bio complète.",
      linkedin_url: "https://linkedin.com/in/awadoe",
      birth_date: "1995-04-12",
      gender: "F",
      directory_consent: true,
      status: "en_attente",
      status_display: "En attente",
      submitted_at: "2026-08-01T10:00:00Z",
      reviewed_at: null,
      reviewed_by_email: null,
      rejection_reason: "",
      profile: null,
    },
  ],
};

describe("useRegistrations", () => {
  it("charge les demandes avec les champs administratifs complets", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, REPONSE);

    const { result } = renderHook(() => useRegistrations({}), {
      wrapper: queryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const demande = result.current.data?.results[0];
    expect(demande?.university).toBe("UAC");
    expect(demande?.mcf_program).toBe("MCF 2018");
    expect(demande?.bio).toBe("Bio complète.");
    expect(demande?.linkedin_url).toBe("https://linkedin.com/in/awadoe");
    expect(demande?.birth_date).toBe("1995-04-12");
    expect(demande?.gender).toBe("F");
  });
});

describe("useApproveRegistration", () => {
  it("invalide aussi l'annuaire public : un profil approuvé peut y apparaître", async () => {
    const client = createTestQueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );

    mock
      .onGet("/alumni/annuaire/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/inscriptions/3/approuver/").reply(200, { id: 9 });

    const { result: directory } = renderHook(() => useDirectory({}), { wrapper });
    await waitFor(() => expect(directory.current.isSuccess).toBe(true));

    const appelsAnnuaireAvant = mock.history.get.filter(
      (r) => r.url === "/alumni/annuaire/",
    ).length;

    const { result: approve } = renderHook(() => useApproveRegistration(), {
      wrapper,
    });
    approve.current.mutate({ id: 3 });
    await waitFor(() => expect(approve.current.isSuccess).toBe(true));

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

describe("useRejectRegistration", () => {
  it("n'invalide pas l'annuaire public : un rejet ne crée aucun profil", async () => {
    const client = createTestQueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );

    mock
      .onGet("/alumni/annuaire/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/inscriptions/3/rejeter/").reply(200, { id: 3 });

    const { result: directory } = renderHook(() => useDirectory({}), { wrapper });
    await waitFor(() => expect(directory.current.isSuccess).toBe(true));

    const appelsAnnuaireAvant = mock.history.get.filter(
      (r) => r.url === "/alumni/annuaire/",
    ).length;

    const { result: reject } = renderHook(() => useRejectRegistration(), {
      wrapper,
    });
    reject.current.mutate({ id: 3, motif: "Incomplet" });
    await waitFor(() => expect(reject.current.isSuccess).toBe(true));

    expect(
      mock.history.get.filter((r) => r.url === "/alumni/annuaire/").length,
    ).toBe(appelsAnnuaireAvant);
  });
});
