import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./a-propos/page";
import HowItWorksPage from "./fonctionnement/page";
import ValuesPage from "./vision-mission-valeurs/page";

describe("pages institutionnelles", () => {
  it("À propos rend son titre", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: "À propos de BAMFA" })).toBeInTheDocument();
  });

  it("Vision/mission/valeurs rend le titre et une valeur", () => {
    render(<ValuesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Vision, mission & valeurs" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Solidarité")).toBeInTheDocument();
  });

  it("Fonctionnement rend son titre", () => {
    render(<HowItWorksPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Fonctionnement" })).toBeInTheDocument();
  });
});
