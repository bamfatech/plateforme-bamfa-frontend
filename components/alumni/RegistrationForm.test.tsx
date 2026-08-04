import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { RegistrationForm } from "./RegistrationForm";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

async function remplirLeMinimum() {
  await userEvent.type(screen.getByLabelText(/prénom/i), "Awa");
  await userEvent.type(screen.getByLabelText(/^nom/i), "Doe");
  await userEvent.type(screen.getByLabelText(/e-mail/i), "awa@example.org");
  await userEvent.type(screen.getByLabelText(/promotion/i), "2018");
}

describe("RegistrationForm", () => {
  it("refuse la soumission quand les champs obligatoires sont vides", async () => {
    renderWithClient(<RegistrationForm />);

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(screen.getByText("Le prénom est requis.")).toBeInTheDocument();
    expect(screen.getByText("Le nom est requis.")).toBeInTheDocument();
    expect(screen.getByText("L'e-mail est requis.")).toBeInTheDocument();
    expect(screen.getByText("La promotion est requise.")).toBeInTheDocument();
    expect(mock.history.post).toHaveLength(0);
  });

  it("refuse un e-mail mal formé", async () => {
    renderWithClient(<RegistrationForm />);
    await userEvent.type(screen.getByLabelText(/e-mail/i), "pas-un-email");

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(screen.getByText("Format d'e-mail invalide.")).toBeInTheDocument();
  });

  it("refuse une promotion hors bornes", async () => {
    renderWithClient(<RegistrationForm />);
    await userEvent.type(screen.getByLabelText(/promotion/i), "1990");

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(screen.getByText(/année de promotion invalide/i)).toBeInTheDocument();
  });

  it("soumet la demande et affiche la confirmation", async () => {
    mock.onPost("/alumni/inscriptions/").reply(201, { id: 1 });
    renderWithClient(<RegistrationForm />);
    await remplirLeMinimum();

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() =>
      expect(screen.getByText(/demande a bien été enregistrée/i)).toBeInTheDocument(),
    );
    expect(JSON.parse(mock.history.post[0].data)).toMatchObject({
      first_name: "Awa",
      last_name: "Doe",
      email: "awa@example.org",
      promotion: 2018,
      directory_consent: false,
    });
  });

  it("transmet le consentement quand la case est cochée", async () => {
    mock.onPost("/alumni/inscriptions/").reply(201, { id: 1 });
    renderWithClient(<RegistrationForm />);
    await remplirLeMinimum();
    await userEvent.click(screen.getByLabelText(/annuaire public/i));

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(JSON.parse(mock.history.post[0].data).directory_consent).toBe(true);
  });

  it("affiche le message d'erreur renvoyé par l'API", async () => {
    mock.onPost("/alumni/inscriptions/").reply(400, {
      error: {
        code: "invalid",
        message: "Requête invalide.",
        details: {
          email: ["Une demande est déjà enregistrée pour cette adresse e-mail."],
        },
      },
    });
    renderWithClient(<RegistrationForm />);
    await remplirLeMinimum();

    await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() =>
      expect(
        screen.getByText(
          "Une demande est déjà enregistrée pour cette adresse e-mail.",
        ),
      ).toBeInTheDocument(),
    );
  });
});
