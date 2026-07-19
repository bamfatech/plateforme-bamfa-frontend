import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("affiche des erreurs quand on soumet vide", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(screen.getByText("Le nom est requis.")).toBeInTheDocument();
    expect(screen.getByText("L'e-mail est requis.")).toBeInTheDocument();
    expect(screen.getByText("Le message est requis.")).toBeInTheDocument();
  });

  it("valide le format de l'e-mail", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "invalide" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour" } });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(screen.getByText("Format d'e-mail invalide.")).toBeInTheDocument();
  });

  it("affiche un message d'information sur soumission valide", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "alice@bamfa.org" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour" } });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/bient[oô]t/i);
  });
});
