import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Providers } from "./Providers";

describe("Providers", () => {
  it("rend ses enfants", () => {
    render(
      <Providers>
        <p>contenu</p>
      </Providers>,
    );
    expect(screen.getByText("contenu")).toBeInTheDocument();
  });
});
