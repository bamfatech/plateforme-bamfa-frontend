import { screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it, vi } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import EspacePage from "./espace/page";

const mock = new MockAdapter(api);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

afterEach(() => mock.reset());

const PROFIL = {
  id: 5,
  first_name: "Awa",
  last_name: "Doe",
  email: "awa@example.org",
  promotion: 2018,
  country: "Bénin",
  phone: "",
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
  completeness: 45,
};

describe("EspacePage", () => {
  it("accueille l'alumni et affiche sa complétude", async () => {
    mock.onGet("/alumni/moi/").reply(200, PROFIL);

    renderWithClient(<EspacePage />);

    expect(await screen.findByText(/Bonjour Awa/)).toBeInTheDocument();
    expect(screen.getByText("45 %")).toBeInTheDocument();
  });

  it("propose l'accès à l'annuaire", async () => {
    mock.onGet("/alumni/moi/").reply(200, PROFIL);

    renderWithClient(<EspacePage />);
    await screen.findByText(/Bonjour Awa/);

    expect(screen.getByRole("link", { name: /annuaire/i })).toHaveAttribute(
      "href",
      "/alumni",
    );
  });

  it("explique la situation d'un compte sans profil alumni", async () => {
    mock.onGet("/alumni/moi/").reply(404, {
      error: { code: "not_found", message: "Introuvable.", details: {} },
    });

    renderWithClient(<EspacePage />);

    expect(
      await screen.findByText(/aucun profil alumni n'est rattaché/i),
    ).toBeInTheDocument();
  });
});
