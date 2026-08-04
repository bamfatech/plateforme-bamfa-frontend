import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LoginForm } from "./LoginForm";

// Isole les deux sites de redirection l'un de l'autre. Dans le composant réel,
// une connexion réussie déclenche à la fois l'effet de montage (si isAuthenticated
// passe à vrai via le cache React Query) et la ligne post-connexion explicite :
// les deux produiraient le même appel à router.replace et se masqueraient
// mutuellement dans un test qui ne mocke pas useAuth. Ici, useAuth est mocké
// pour que chaque test ne puisse déclencher qu'un seul des deux sites.
const { replaceMock, useAuthMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  useAuthMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, push: replaceMock }),
}));
vi.mock("@/lib/auth/useAuth", () => ({ useAuth: useAuthMock }));

const ALUMNI = {
  id: 2,
  email: "awa@example.org",
  first_name: "Awa",
  last_name: "Doe",
  is_staff: false,
  is_superuser: false,
  roles: ["Alumni"],
};

const ADMIN = {
  id: 1,
  email: "admin@bamfa.org",
  first_name: "Ada",
  last_name: "Admin",
  is_staff: true,
  is_superuser: false,
  roles: ["Administrateur"],
};

afterEach(() => {
  replaceMock.mockClear();
  useAuthMock.mockReset();
});

describe("LoginForm — redirection post-connexion (site isolé)", () => {
  it("redirige un alumni vers /espace d'après la valeur retournée par mutateAsync", async () => {
    const mutateAsync = vi.fn().mockResolvedValue(ALUMNI);
    // isAuthenticated reste faux et `user` diverge délibérément de la résolution
    // de mutateAsync : si le code redirigeait avec le `user` du hook (valeur pas
    // encore rafraîchie) plutôt qu'avec la valeur retournée par mutateAsync, la
    // destination attendue ("/espace") ne correspondrait pas à celle produite par
    // ADMIN ("/admin"), et le test échouerait.
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      user: ADMIN,
      login: { mutateAsync, isPending: false },
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "awa@example.org" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "motdepasse123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/espace"));
    expect(replaceMock).toHaveBeenCalledTimes(1);
  });

  it("redirige un administrateur vers /admin d'après la valeur retournée par mutateAsync", async () => {
    const mutateAsync = vi.fn().mockResolvedValue(ADMIN);
    // Même logique inversée : `user` (stale) pointe vers Alumni, mutateAsync
    // résout vers un administrateur. Utiliser le mauvais côté serait détecté.
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      user: ALUMNI,
      login: { mutateAsync, isPending: false },
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "admin@bamfa.org" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "motdepasse123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin"));
    expect(replaceMock).toHaveBeenCalledTimes(1);
  });
});

describe("LoginForm — redirection au montage si déjà authentifié (site isolé)", () => {
  it("redirige un alumni déjà authentifié vers /espace, sans passer par la soumission", async () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      user: ALUMNI,
      login: { mutateAsync: vi.fn(), isPending: false },
    });

    render(<LoginForm />);

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/espace"));
  });

  it("redirige un administrateur déjà authentifié vers /admin, sans passer par la soumission", async () => {
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      user: ADMIN,
      login: { mutateAsync: vi.fn(), isPending: false },
    });

    render(<LoginForm />);

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin"));
  });
});
