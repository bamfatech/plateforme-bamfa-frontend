import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("affiche l'année courante", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
