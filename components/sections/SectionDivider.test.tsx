import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionDivider } from "./SectionDivider";

describe("SectionDivider", () => {
  it("rend un séparateur décoratif avec un glyphe SVG", () => {
    const { container } = render(<SectionDivider />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
