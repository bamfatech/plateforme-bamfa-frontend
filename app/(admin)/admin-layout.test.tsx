import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AdminLayout from "./layout";

const { replaceMock, useAuthMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  useAuthMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, push: replaceMock }),
}));
vi.mock("@/lib/auth/useAuth", () => ({ useAuth: useAuthMock }));

const USER = {
  id: 1,
  email: "admin@bamfa.org",
  first_name: "Ada",
  last_name: "Lovelace",
  is_staff: true,
  is_superuser: true,
  roles: ["Administrateur"],
};

afterEach(() => {
  replaceMock.mockClear();
  useAuthMock.mockReset();
});

describe("AdminLayout (garde)", () => {
  it("affiche un indicateur de chargement pendant la vérification", () => {
    useAuthMock.mockReturnValue({ user: null, isLoading: true, isAuthenticated: false });
    render(<AdminLayout><p>secret</p></AdminLayout>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
  });

  it("redirige vers /connexion si non authentifié", async () => {
    useAuthMock.mockReturnValue({ user: null, isLoading: false, isAuthenticated: false });
    render(<AdminLayout><p>secret</p></AdminLayout>);
    expect(screen.queryByText("secret")).not.toBeInTheDocument(); // jamais monté, indépendant du timing de l'effet
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/connexion"));
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
  });

  it("rend le contenu quand authentifié", () => {
    useAuthMock.mockReturnValue({
      user: USER,
      isLoading: false,
      isAuthenticated: true,
      logout: { mutateAsync: vi.fn(), isPending: false },
    });
    render(<AdminLayout><p>secret</p></AdminLayout>);
    expect(screen.getByText("secret")).toBeInTheDocument();
    expect(screen.getByText("admin@bamfa.org")).toBeInTheDocument();
    expect(screen.getByText("Administrateur")).toBeInTheDocument();
  });
});
