import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("Page d'accueil", () => {
  it("rend le hero et les chiffres-clés", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /alumni Mastercard Foundation/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("250+")).toBeInTheDocument();
  });
});
