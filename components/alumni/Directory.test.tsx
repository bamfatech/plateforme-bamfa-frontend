import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { Directory } from "./Directory";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const ENTREE = {
  id: 1,
  first_name: "Awa",
  last_name: "Doe",
  promotion: 2018,
  sector: "numerique",
  sector_display: "Technologies et numérique",
  country: "Bénin",
  current_position: "Développeuse",
  organization: "BAMFA",
};

function reponse(results: unknown[], count = results.length) {
  return { count, next: null, previous: null, results };
}

describe("Directory", () => {
  it("affiche les alumni renvoyés par l'API", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, reponse([ENTREE]));

    renderWithClient(<Directory />);

    expect(await screen.findByText("Awa Doe")).toBeInTheDocument();
    // Portée sur la carte : le libellé de secteur de la fiche coïncide avec
    // une option du <select> de filtre (mêmes libellés SECTOR_OPTIONS), donc
    // une recherche non bornée sur tout le document trouverait les deux.
    const carte = screen.getByRole("article");
    expect(
      within(carte).getByText("Technologies et numérique"),
    ).toBeInTheDocument();
    expect(within(carte).getByText(/Développeuse/)).toBeInTheDocument();
  });

  it("n'affiche jamais d'adresse e-mail ni de téléphone", async () => {
    // Cette fiche ne comporte ni email ni téléphone : un test qui se
    // contenterait de vérifier leur absence contre cette seule fiche ne
    // pincerait rien (une carte affichant fautivement l'email passerait
    // quand même, puisque aucun email n'existe dans le jeu de données).
    // On ajoute donc une fiche qui, elle, porte un champ email — la carte ne
    // doit toujours rien en montrer.
    const AVEC_EMAIL = {
      ...ENTREE,
      id: 2,
      first_name: "Kofi",
      last_name: "Mensah",
      email: "kofi.mensah@example.com",
    };
    mock.onGet("/alumni/annuaire/").reply(200, reponse([ENTREE, AVEC_EMAIL]));

    renderWithClient(<Directory />);
    await screen.findByText("Awa Doe");

    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it("affiche un message quand l'annuaire est vide", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, reponse([]));

    renderWithClient(<Directory />);

    expect(
      await screen.findByText(/aucun alumni ne correspond/i),
    ).toBeInTheDocument();
  });

  it("envoie le filtre de secteur choisi", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, reponse([ENTREE]));
    renderWithClient(<Directory />);
    await screen.findByText("Awa Doe");

    await userEvent.selectOptions(screen.getByLabelText(/secteur/i), "sante");

    await waitFor(() =>
      expect(
        mock.history.get.some((appel) => appel.params?.secteur === "sante"),
      ).toBe(true),
    );
  });

  it("affiche la pagination au-delà d'une page", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, reponse([ENTREE], 45));

    renderWithClient(<Directory />);

    expect(await screen.findByText("Page 1 sur 3")).toBeInTheDocument();
  });

  it("remet la pagination à la page 1 lors d'un changement de filtre", async () => {
    // « envoie le filtre de secteur choisi » ci-dessus n'observe que le
    // paramètre secteur : un composant qui enverrait ce filtre sans remettre
    // la page à 1 la passerait quand même. On se place donc explicitement en
    // page 2 avant de changer de filtre, pour vérifier la remise à 1.
    mock.onGet("/alumni/annuaire/").reply(200, reponse([ENTREE], 45));
    renderWithClient(<Directory />);
    await screen.findByText("Page 1 sur 3");

    await userEvent.click(screen.getByRole("button", { name: "Suivant" }));
    await screen.findByText("Page 2 sur 3");

    await userEvent.selectOptions(screen.getByLabelText(/secteur/i), "sante");

    await waitFor(() =>
      expect(
        mock.history.get.some(
          (appel) =>
            appel.params?.secteur === "sante" && appel.params?.page === 1,
        ),
      ).toBe(true),
    );
    expect(await screen.findByText("Page 1 sur 3")).toBeInTheDocument();
  });

  it("affiche une erreur quand l'API échoue", async () => {
    mock.onGet("/alumni/annuaire/").reply(500);

    renderWithClient(<Directory />);

    expect(
      await screen.findByText(/annuaire n'a pas pu être chargé/i),
    ).toBeInTheDocument();
  });
});
