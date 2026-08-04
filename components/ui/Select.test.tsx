import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Select } from "./Select";

const OPTIONS = [
  { value: "numerique", label: "Technologies et numérique" },
  { value: "sante", label: "Santé" },
];

describe("Select", () => {
  it("associe le libellé au champ", () => {
    render(<Select label="Secteur" options={OPTIONS} />);

    expect(screen.getByLabelText("Secteur")).toBeInTheDocument();
  });

  it("rend les options fournies", () => {
    render(<Select label="Secteur" options={OPTIONS} />);

    expect(screen.getByRole("option", { name: "Santé" })).toBeInTheDocument();
  });

  it("rend un choix vide quand un texte de repli est fourni", () => {
    render(<Select label="Secteur" options={OPTIONS} placeholder="Tous les secteurs" />);

    expect(screen.getByRole("option", { name: "Tous les secteurs" })).toBeInTheDocument();
  });

  it("signale l'erreur au lecteur d'écran", () => {
    render(<Select label="Secteur" options={OPTIONS} error="Champ requis." />);

    expect(screen.getByLabelText("Secteur")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Champ requis.")).toBeInTheDocument();
  });
});
