import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associe le libellé au champ", () => {
    render(<Textarea label="Biographie" />);

    expect(screen.getByLabelText("Biographie")).toBeInTheDocument();
  });

  it("signale l'erreur au lecteur d'écran", () => {
    render(<Textarea label="Motif" error="Le motif est requis." />);

    expect(screen.getByLabelText("Motif")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Le motif est requis.")).toBeInTheDocument();
  });
});
