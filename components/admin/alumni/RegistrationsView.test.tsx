import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { RegistrationsView } from "./RegistrationsView";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const DEMANDE = {
  id: 3,
  first_name: "Awa",
  last_name: "Doe",
  email: "awa@example.org",
  promotion: 2018,
  country: "Bénin",
  phone: "",
  city: "Cotonou",
  sector: "numerique",
  sector_display: "Technologies et numérique",
  current_position: "Développeuse",
  organization: "BAMFA",
  directory_consent: true,
  status: "en_attente",
  status_display: "En attente",
  submitted_at: "2026-08-02T09:00:00Z",
  reviewed_at: null,
  reviewed_by_email: null,
  rejection_reason: "",
  profile: null,
};

function reponse(results: unknown[], count = results.length) {
  return { count, next: null, previous: null, results };
}

describe("RegistrationsView", () => {
  it("affiche les demandes en attente", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));

    renderWithClient(<RegistrationsView />);

    expect(await screen.findByText("Doe Awa")).toBeInTheDocument();
    expect(screen.getByText("awa@example.org")).toBeInTheDocument();
    // Scopé à la table : « En attente » est aussi le libellé de l'option de
    // statut dans la barre de filtres, ce qui rendrait la requête ambiguë.
    const table = screen.getByRole("table");
    expect(within(table).getByText("En attente")).toBeInTheDocument();
  });

  it("affiche un message quand la file est vide", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([]));

    renderWithClient(<RegistrationsView />);

    expect(await screen.findByText(/aucune demande/i)).toBeInTheDocument();
  });

  it("approuve une demande", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));
    mock.onPost("/alumni/admin/inscriptions/3/approuver/").reply(200, { id: 9 });
    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Approuver" }));

    await waitFor(() =>
      expect(mock.history.post[0].url).toBe(
        "/alumni/admin/inscriptions/3/approuver/",
      ),
    );
  });

  it("demande le motif dans une modale avant de rejeter", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));
    mock.onPost("/alumni/admin/inscriptions/3/rejeter/").reply(200, DEMANDE);
    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Rejeter" }));
    expect(
      screen.getByRole("dialog", { name: /rejeter la demande/i }),
    ).toBeInTheDocument();
    expect(mock.history.post).toHaveLength(0);

    await userEvent.type(screen.getByLabelText(/motif/i), "Dossier incomplet.");
    await userEvent.click(
      screen.getByRole("button", { name: "Confirmer le rejet" }),
    );

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      motif: "Dossier incomplet.",
    });
  });

  it("permet de rejeter sans motif", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));
    mock.onPost("/alumni/admin/inscriptions/3/rejeter/").reply(200, DEMANDE);
    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Rejeter" }));
    // Rien n'est envoyé tant que la modale n'a pas été confirmée, même sans
    // motif saisi : c'est ce qui distingue « rejet sans motif autorisé » de
    // « rejet déclenché trop tôt » ou en double.
    expect(mock.history.post).toHaveLength(0);
    await userEvent.click(
      screen.getByRole("button", { name: "Confirmer le rejet" }),
    );

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ motif: "" });
  });

  it("ferme la modale sans rejeter quand on annule", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));
    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Rejeter" }));
    await userEvent.click(screen.getByRole("button", { name: "Annuler" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(mock.history.post).toHaveLength(0);
  });

  it("n'offre pas d'instruire une demande déjà traitée", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(
      200,
      reponse([
        {
          ...DEMANDE,
          status: "rejetee",
          status_display: "Rejetée",
          rejection_reason: "Hors périmètre.",
        },
      ]),
    );

    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    // Aucun bouton d'action n'est proposé — ni Approuver ni Rejeter — pour
    // une demande déjà traitée ; on vérifie les deux plutôt qu'un seul, sinon
    // une ligne qui échouerait entièrement à s'afficher ferait passer le
    // test à tort. Le motif affiché prouve que la ligne, elle, est bien rendue.
    expect(screen.queryByRole("button", { name: "Approuver" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Rejeter" })).not.toBeInTheDocument();
    expect(screen.getByText("Hors périmètre.")).toBeInTheDocument();
  });

  it("envoie le filtre de statut choisi", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(200, reponse([DEMANDE]));
    renderWithClient(<RegistrationsView />);
    await screen.findByText("Doe Awa");

    await userEvent.selectOptions(screen.getByLabelText(/statut/i), "rejetee");

    await waitFor(() =>
      expect(
        mock.history.get.some((appel) => appel.params?.statut === "rejetee"),
      ).toBe(true),
    );
  });

  it("affiche une erreur quand l'API échoue", async () => {
    mock.onGet("/alumni/admin/inscriptions/").reply(500);

    renderWithClient(<RegistrationsView />);

    expect(
      await screen.findByText(/demandes n'ont pas pu être chargées/i),
    ).toBeInTheDocument();
  });
});
