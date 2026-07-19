import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("rend le libellé et le variant primaire par défaut", () => {
    render(<Button>Envoyer</Button>);
    const btn = screen.getByRole("button", { name: "Envoyer" });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("bg-primary-600");
  });

  it("est désactivé et aria-busy en chargement", () => {
    render(<Button loading>Envoyer</Button>);
    const btn = screen.getByRole("button", { name: "Chargement Envoyer" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });
});
