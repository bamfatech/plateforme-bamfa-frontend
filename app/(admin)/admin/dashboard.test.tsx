import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import DashboardPage from "./page";

const { useAuthMock } = vi.hoisted(() => ({ useAuthMock: vi.fn() }));
vi.mock("@/lib/auth/useAuth", () => ({ useAuth: useAuthMock }));

afterEach(() => useAuthMock.mockReset());

describe("DashboardPage", () => {
  it("salue l'utilisateur et affiche ses rôles", () => {
    useAuthMock.mockReturnValue({
      user: {
        id: 1,
        email: "admin@bamfa.org",
        first_name: "Ada",
        last_name: "Lovelace",
        is_staff: true,
        is_superuser: true,
        roles: ["Administrateur"],
      },
      isLoading: false,
      isAuthenticated: true,
    });
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { name: /Bonjour Ada/ })).toBeInTheDocument();
    expect(screen.getByText("Administrateur")).toBeInTheDocument();
  });
});
