import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("rend le contenu avec le style du variant succès", () => {
    render(<Badge variant="success">Validé</Badge>);
    const el = screen.getByText("Validé");
    expect(el.className).toContain("text-success");
  });
});
