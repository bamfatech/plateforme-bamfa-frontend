import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";
import { Container } from "./Container";
import { Section } from "./Section";

describe("primitives de mise en page", () => {
  it("Container applique la largeur max et rend ses enfants", () => {
    render(<Container>contenu</Container>);
    const el = screen.getByText("contenu");
    expect(el.className).toContain("max-w-7xl");
  });

  it("Section rend une balise section", () => {
    const { container } = render(<Section>bloc</Section>);
    expect(container.querySelector("section")).not.toBeNull();
  });

  it("Card rend ses enfants dans une surface bordée", () => {
    render(<Card>carte</Card>);
    const el = screen.getByText("carte");
    expect(el.className).toContain("border");
  });
});
