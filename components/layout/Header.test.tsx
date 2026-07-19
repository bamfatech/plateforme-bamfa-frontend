import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";

describe("Header", () => {
  it("affiche le logo et la navigation principale realignee", () => {
    render(<Header />);
    expect(screen.getByAltText("BAMFA")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    expect(within(nav).getByRole("link", { name: "Fonctionnement" })).toHaveAttribute(
      "href",
      "/fonctionnement",
    );
  });

  it("bascule le menu mobile au clic sur le bouton", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeInTheDocument();
  });
});
