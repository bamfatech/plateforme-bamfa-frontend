import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./a-propos/page";

describe("Page À propos (hub)", () => {
  it("rend le titre et les sections fusionnées", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: "À propos de BAMFA" })).toBeInTheDocument();
    // Valeurs fusionnées
    expect(screen.getByText("Solidarité")).toBeInTheDocument();
    // Fonctionnement fusionné
    expect(screen.getByRole("heading", { name: "Gouvernance" })).toBeInTheDocument();
    // Équipe / organigramme fusionné
    expect(screen.getByText("Mandat 2024-2026")).toBeInTheDocument();
    expect(screen.getByText("Président(e)")).toBeInTheDocument();
    // FAQ
    expect(screen.getByText(/Qui peut devenir membre/i)).toBeInTheDocument();
  });
});
