import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OrgPage from "./page";

describe("Page organigramme", () => {
  it("rend le titre, le mandat et les rôles", () => {
    render(<OrgPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Organigramme" })).toBeInTheDocument();
    expect(screen.getByText("Mandat 2024-2026")).toBeInTheDocument();
    expect(screen.getByText("Président(e)")).toBeInTheDocument();
  });
});
