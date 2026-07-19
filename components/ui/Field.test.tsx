import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field } from "./Field";

describe("Field", () => {
  it("associe le label à l'input", () => {
    render(<Field label="Adresse e-mail" />);
    expect(screen.getByLabelText("Adresse e-mail")).toBeInTheDocument();
  });

  it("marque l'input invalide et relie le message d'erreur", () => {
    render(<Field label="E-mail" error="Champ requis" />);
    const input = screen.getByLabelText("E-mail");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText("Champ requis").id).toBe(errorId);
  });
});
