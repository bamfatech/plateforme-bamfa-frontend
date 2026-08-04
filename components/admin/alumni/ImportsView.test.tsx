import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { ImportsView } from "./ImportsView";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const RAPPORT = {
  id: 1,
  filename: "alumni.csv",
  strict: false,
  created_at: "2026-08-03T08:00:00Z",
  uploaded_by_email: "administrateur@bamfa.org",
  rows_total: 3,
  rows_created: 2,
  rows_updated: 0,
  rows_skipped: 0,
  rows_failed: 1,
  errors: [
    {
      id: 1,
      line_number: 3,
      raw_row: { email: "pas-un-email", nom: "Mensah" },
      message: "Adresse e-mail invalide ou absente.",
    },
  ],
};

function fichier() {
  return new File(
    ["email,nom,prenom,promotion\nawa@example.org,Doe,Awa,2018\n"],
    "alumni.csv",
    { type: "text/csv" },
  );
}

describe("ImportsView", () => {
  it("affiche l'historique des imports", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 1, next: null, previous: null, results: [RAPPORT] });

    renderWithClient(<ImportsView />);

    expect(await screen.findByText("alumni.csv")).toBeInTheDocument();
  });

  it("indique quand aucun import n'a encore été fait", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });

    renderWithClient(<ImportsView />);

    expect(await screen.findByText(/aucun import/i)).toBeInTheDocument();
  });

  it("refuse la soumission sans fichier", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    renderWithClient(<ImportsView />);

    await userEvent.click(screen.getByRole("button", { name: /importer/i }));

    expect(screen.getByText("Sélectionnez un fichier CSV.")).toBeInTheDocument();
    expect(mock.history.post).toHaveLength(0);
  });

  it("dépose le fichier et affiche le rapport", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/imports/").reply(201, RAPPORT);
    renderWithClient(<ImportsView />);

    await userEvent.upload(screen.getByLabelText(/fichier csv/i), fichier());
    await userEvent.click(screen.getByRole("button", { name: /importer/i }));

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(await screen.findByText("2 créé(s)")).toBeInTheDocument();
    expect(screen.getByText("1 en erreur")).toBeInTheDocument();
    expect(
      screen.getByText("Adresse e-mail invalide ou absente."),
    ).toBeInTheDocument();
    expect(screen.getByText(/ligne 3/i)).toBeInTheDocument();
  });

  it("transmet le mode strict quand la case est cochée", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/imports/").reply(201, RAPPORT);
    renderWithClient(<ImportsView />);

    await userEvent.upload(screen.getByLabelText(/fichier csv/i), fichier());
    await userEvent.click(screen.getByLabelText(/tout ou rien/i));
    await userEvent.click(screen.getByRole("button", { name: /importer/i }));

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    const body = mock.history.post[0].data as FormData;
    expect(body.get("strict")).toBe("true");
    expect((body.get("fichier") as File)?.name).toBe("alumni.csv");
  });

  it("affiche l'erreur de format renvoyée par l'API", async () => {
    mock
      .onGet("/alumni/admin/imports/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });
    mock.onPost("/alumni/admin/imports/").reply(400, {
      error: {
        code: "invalid",
        message: "Requête invalide.",
        details: { fichier: ["Colonnes requises absentes : promotion."] },
      },
    });
    renderWithClient(<ImportsView />);

    await userEvent.upload(screen.getByLabelText(/fichier csv/i), fichier());
    await userEvent.click(screen.getByRole("button", { name: /importer/i }));

    expect(
      await screen.findByText("Colonnes requises absentes : promotion."),
    ).toBeInTheDocument();
  });
});
