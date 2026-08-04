import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { ProfilesView } from "./ProfilesView";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const PROFIL = {
  id: 7,
  first_name: "Awa",
  last_name: "Doe",
  email: "awa@example.org",
  promotion: 2018,
  country: "Bénin",
  phone: "+229 90 00 00 00",
  city: "Cotonou",
  university: "",
  mcf_program: "",
  sector: "numerique",
  sector_display: "Technologies et numérique",
  current_position: "Développeuse",
  organization: "BAMFA",
  bio: "",
  linkedin_url: "",
  birth_date: null,
  gender: "",
  directory_consent: true,
  status: "actif",
  status_display: "Actif",
  source: "import",
  mandate: null,
  completeness: 45,
  has_account: false,
  user_email: null,
  created_at: "2026-08-01T10:00:00Z",
  updated_at: "2026-08-01T10:00:00Z",
};

function reponse(results: unknown[], count = results.length) {
  return { count, next: null, previous: null, results };
}

describe("ProfilesView", () => {
  it("affiche les profils avec leurs données d'administration", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));

    renderWithClient(<ProfilesView />);

    expect(await screen.findByText("Doe Awa")).toBeInTheDocument();
    expect(screen.getByText("awa@example.org")).toBeInTheDocument();
    // Scopé à la table : « Actif » est aussi le libellé de l'option de statut
    // dans la barre de filtres, ce qui rendrait la requête ambiguë sans ça.
    const table = screen.getByRole("table");
    expect(within(table).getByText("Actif")).toBeInTheDocument();
    expect(screen.getByText("45 %")).toBeInTheDocument();
  });

  it("signale les profils sans compte de connexion", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));

    renderWithClient(<ProfilesView />);

    await screen.findByText("Doe Awa");
    // Idem : « Sans compte » est aussi le libellé de l'option du filtre
    // « Compte » — on vérifie le marqueur affiché dans la table, pas l'option.
    const table = screen.getByRole("table");
    expect(within(table).getByText("Sans compte")).toBeInTheDocument();
  });

  it("affiche un message quand la base est vide", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([]));

    renderWithClient(<ProfilesView />);

    expect(await screen.findByText(/aucun profil/i)).toBeInTheDocument();
  });

  it("suspend un profil", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));
    mock.onPost("/alumni/admin/profils/7/suspendre/").reply(200, PROFIL);
    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Suspendre" }));

    await waitFor(() =>
      expect(mock.history.post[0].url).toBe("/alumni/admin/profils/7/suspendre/"),
    );
  });

  it("propose de réactiver un profil suspendu et non de le suspendre", async () => {
    mock
      .onGet("/alumni/admin/profils/")
      .reply(200, reponse([{ ...PROFIL, status: "suspendu", status_display: "Suspendu" }]));

    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    expect(screen.getByRole("button", { name: "Réactiver" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Suspendre" }),
    ).not.toBeInTheDocument();
  });

  it("invite un profil sans compte", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));
    mock.onPost("/alumni/admin/profils/7/inviter/").reply(200, PROFIL);
    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Inviter" }));

    await waitFor(() =>
      expect(mock.history.post[0].url).toBe("/alumni/admin/profils/7/inviter/"),
    );
  });

  it("n'offre pas d'inviter un profil qui a déjà un compte", async () => {
    mock.onGet("/alumni/admin/profils/").reply(
      200,
      reponse([{ ...PROFIL, has_account: true, user_email: "awa@example.org" }]),
    );

    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    expect(screen.queryByRole("button", { name: "Inviter" })).not.toBeInTheDocument();
  });

  it("envoie le filtre de statut choisi", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));
    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    await userEvent.selectOptions(screen.getByLabelText(/statut/i), "suspendu");

    await waitFor(() =>
      expect(
        mock.history.get.some((appel) => appel.params?.statut === "suspendu"),
      ).toBe(true),
    );
  });

  it("convertit les filtres booléens en booléens réels, pas en chaînes", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));
    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    await userEvent.selectOptions(screen.getByLabelText(/compte/i), "false");
    await userEvent.selectOptions(screen.getByLabelText(/annuaire/i), "true");

    await waitFor(() => {
      const dernier = mock.history.get.at(-1);
      expect(dernier?.params?.a_un_compte).toBe(false);
      expect(dernier?.params?.consentement).toBe(true);
    });
    // Une chaîne "false" est une valeur non vide : si la conversion en
    // booléen manquait, cleanParams la laisserait passer telle quelle et le
    // filtre s'inverserait silencieusement.
    expect(
      mock.history.get.some((appel) => appel.params?.a_un_compte === "false"),
    ).toBe(false);
  });

  it("affiche une erreur quand l'API échoue", async () => {
    mock.onGet("/alumni/admin/profils/").reply(500);

    renderWithClient(<ProfilesView />);

    expect(
      await screen.findByText(/profils n'ont pas pu être chargés/i),
    ).toBeInTheDocument();
  });

  it("signale l'échec d'une action sans faire croire à sa réussite", async () => {
    mock.onGet("/alumni/admin/profils/").reply(200, reponse([PROFIL]));
    mock.onPost("/alumni/admin/profils/7/suspendre/").reply(400);
    renderWithClient(<ProfilesView />);
    await screen.findByText("Doe Awa");

    await userEvent.click(screen.getByRole("button", { name: "Suspendre" }));

    expect(
      await screen.findByText(/n'a pas pu être appliquée/i),
    ).toBeInTheDocument();
  });
});
