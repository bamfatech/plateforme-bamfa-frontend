import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/lib/api/client";
import { renderWithClient } from "@/lib/test-utils";

import { LoginForm } from "./LoginForm";

const { replaceMock } = vi.hoisted(() => ({ replaceMock: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, push: replaceMock }),
}));

const USER = {
  id: 1,
  email: "admin@bamfa.org",
  first_name: "Ada",
  last_name: "Lovelace",
  is_staff: true,
  is_superuser: true,
  roles: ["Administrateur"],
};

let apiMock: MockAdapter;
let axiosMock: MockAdapter;

beforeEach(() => {
  replaceMock.mockClear();
  apiMock = new MockAdapter(api);
  axiosMock = new MockAdapter(axios);
  axiosMock.onGet(/\/auth\/csrf\/$/).reply(200, { csrfToken: "tok123" });
  apiMock.onGet("/auth/me/").reply(401);
  apiMock.onPost("/auth/refresh/").reply(401);
});

afterEach(() => {
  apiMock.restore();
  axiosMock.restore();
});

describe("LoginForm", () => {
  it("affiche des erreurs quand les champs sont vides", async () => {
    renderWithClient(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(await screen.findByText("L'e-mail est requis.")).toBeInTheDocument();
    expect(screen.getByText("Le mot de passe est requis.")).toBeInTheDocument();
  });

  it("bloque la soumission si l'e-mail est mal formé (aucun appel réseau)", async () => {
    let loginCalled = false;
    apiMock.onPost("/auth/login/").reply(() => {
      loginCalled = true;
      return [200, USER];
    });
    renderWithClient(<LoginForm />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "pas-un-email" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(await screen.findByText("Format d'e-mail invalide.")).toBeInTheDocument();
    expect(loginCalled).toBe(false);
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("redirige vers /admin après une connexion réussie", async () => {
    apiMock.onPost("/auth/login/").reply(200, USER);
    renderWithClient(<LoginForm />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "admin@bamfa.org" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin"));
  });

  it("affiche une erreur sur identifiants invalides (401)", async () => {
    apiMock.onPost("/auth/login/").reply(401, { detail: "Identifiants invalides." });
    renderWithClient(<LoginForm />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "bad@bamfa.org" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(await screen.findByText("Identifiants invalides.")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
