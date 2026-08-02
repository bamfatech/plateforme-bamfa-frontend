import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("rend son contenu (présent dans le DOM)", () => {
    render(
      <Reveal>
        <p>contenu révélé</p>
      </Reveal>,
    );
    expect(screen.getByText("contenu révélé")).toBeInTheDocument();
  });

  it("applique la className", () => {
    const { container } = render(<Reveal className="mt-8">x</Reveal>);
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
