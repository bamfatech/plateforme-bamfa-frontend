import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it, vi } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { ActivationForm } from "./ActivationForm";

const mock = new MockAdapter(api);

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: push }),
}));

afterEach(() => {
  mock.reset();
  push.mockReset();
});

const MOT_DE_PASSE = "un-mot-de-passe-solide-42";

describe("ActivationForm", () => {
  it("affiche une erreur quand aucun jeton n'est fourni", async () => {
    renderWithClient(<ActivationForm token={null} />);

    expect(
      await screen.findByText(/lien d'activation est incomplet/i),
    ).toBeInTheDocument();
    expect(mock.history.post).toHaveLength(0);
  });

  it("accueille l'alumni par son prénom après vérification du jeton", async () => {
    mock
      .onPost("/alumni/invitation/verifier/")
      .reply(200, { first_name: "Awa", email: "awa@example.org" });

    renderWithClient(<ActivationForm token="jeton-valide" />);

    expect(await screen.findByText(/Bonjour Awa/)).toBeInTheDocument();
    expect(screen.getByText("awa@example.org")).toBeInTheDocument();
  });

  it("affiche le message du serveur quand le jeton est expiré", async () => {
    mock.onPost("/alumni/invitation/verifier/").reply(400, {
      error: {
        code: "invalid",
        message: "Requête invalide.",
        details: { token: ["Ce lien d'invitation a expiré."] },
      },
    });

    renderWithClient(<ActivationForm token="jeton-expire" />);

    expect(
      await screen.findByText("Ce lien d'invitation a expiré."),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/mot de passe/i)).not.toBeInTheDocument();
  });

  it("refuse une confirmation de mot de passe différente", async () => {
    mock
      .onPost("/alumni/invitation/verifier/")
      .reply(200, { first_name: "Awa", email: "awa@example.org" });
    renderWithClient(<ActivationForm token="jeton-valide" />);
    await screen.findByText(/Bonjour Awa/);

    await userEvent.type(screen.getByLabelText("Mot de passe"), MOT_DE_PASSE);
    await userEvent.type(screen.getByLabelText("Confirmation"), "autre-chose");
    await userEvent.click(screen.getByRole("button", { name: /activer/i }));

    expect(screen.getByLabelText("Confirmation")).toHaveAccessibleDescription(
      "Les deux mots de passe ne correspondent pas.",
    );
    expect(screen.getByLabelText("Mot de passe")).not.toHaveAttribute(
      "aria-describedby",
    );
    expect(
      mock.history.post.filter((a) => a.url?.includes("activer")),
    ).toHaveLength(0);
  });

  it("active le compte puis redirige vers la connexion", async () => {
    mock
      .onPost("/alumni/invitation/verifier/")
      .reply(200, { first_name: "Awa", email: "awa@example.org" });
    mock
      .onPost("/alumni/invitation/activer/")
      .reply(200, { created: true, detail: "Votre accès est activé." });
    renderWithClient(<ActivationForm token="jeton-valide" />);
    await screen.findByText(/Bonjour Awa/);

    await userEvent.type(screen.getByLabelText("Mot de passe"), MOT_DE_PASSE);
    await userEvent.type(screen.getByLabelText("Confirmation"), MOT_DE_PASSE);
    await userEvent.click(screen.getByRole("button", { name: /activer/i }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/connexion"));
  });

  it("signale qu'un compte existait déjà et ne redirige pas", async () => {
    mock
      .onPost("/alumni/invitation/verifier/")
      .reply(200, { first_name: "Awa", email: "awa@example.org" });
    mock.onPost("/alumni/invitation/activer/").reply(200, {
      created: false,
      detail:
        "Un compte existait déjà pour cette adresse. Connectez-vous avec vos identifiants habituels.",
    });
    renderWithClient(<ActivationForm token="jeton-valide" />);
    await screen.findByText(/Bonjour Awa/);

    await userEvent.type(screen.getByLabelText("Mot de passe"), MOT_DE_PASSE);
    await userEvent.type(screen.getByLabelText("Confirmation"), MOT_DE_PASSE);
    await userEvent.click(screen.getByRole("button", { name: /activer/i }));

    expect(
      await screen.findByText(/Un compte existait déjà/),
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("remonte les messages de validation du mot de passe", async () => {
    mock
      .onPost("/alumni/invitation/verifier/")
      .reply(200, { first_name: "Awa", email: "awa@example.org" });
    mock.onPost("/alumni/invitation/activer/").reply(400, {
      error: {
        code: "invalid",
        message: "Requête invalide.",
        details: { password: ["Ce mot de passe est trop court."] },
      },
    });
    renderWithClient(<ActivationForm token="jeton-valide" />);
    await screen.findByText(/Bonjour Awa/);

    await userEvent.type(screen.getByLabelText("Mot de passe"), "court");
    await userEvent.type(screen.getByLabelText("Confirmation"), "court");
    await userEvent.click(screen.getByRole("button", { name: /activer/i }));

    expect(
      await screen.findByText("Ce mot de passe est trop court."),
    ).toBeInTheDocument();
  });
});
