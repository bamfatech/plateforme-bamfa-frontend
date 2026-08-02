import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlameGlyph } from "./FlameGlyph";

describe("FlameGlyph", () => {
  it("est décoratif par défaut (aria-hidden, pas de rôle image)", () => {
    const { container } = render(<FlameGlyph />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role", "img");
  });

  it("applique la className passée", () => {
    const { container } = render(<FlameGlyph className="h-6 w-6 text-flame" />);
    expect(container.querySelector("svg")).toHaveClass("h-6", "w-6", "text-flame");
  });

  it("devient une image accessible quand un title est fourni", () => {
    const { container, getByText } = render(<FlameGlyph title="Signature BAMFA" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Signature BAMFA");
    expect(getByText("Signature BAMFA").tagName.toLowerCase()).toBe("title");
  });
});
