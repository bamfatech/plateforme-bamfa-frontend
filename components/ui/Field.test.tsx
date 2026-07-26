import { fireEvent, render, screen } from "@testing-library/react";
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

  it("bascule la visibilité d'un champ mot de passe", () => {
    render(<Field label="Mot de passe" type="password" />);
    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveAttribute("type", "password");

    const toggle = screen.getByRole("button", { name: "Afficher le mot de passe" });
    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Masquer le mot de passe" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Masquer le mot de passe" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("n'affiche pas de bouton de visibilité pour un champ non mot de passe", () => {
    render(<Field label="E-mail" type="email" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
