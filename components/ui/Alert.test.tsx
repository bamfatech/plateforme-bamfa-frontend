import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("a le rôle alert et le style du variant erreur", () => {
    render(<Alert variant="danger">Une erreur est survenue</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toHaveTextContent("Une erreur est survenue");
    expect(el.className).toContain("text-danger");
  });
});
