import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Sidebar } from "./Sidebar";

const USER = {
  id: 1,
  email: "admin@bamfa.org",
  first_name: "Ada",
  last_name: "Lovelace",
  is_staff: true,
  is_superuser: true,
  roles: ["Administrateur"],
};

describe("Sidebar", () => {
  it("mène à la page des profils alumni", () => {
    render(<Sidebar user={USER} />);

    expect(screen.getByRole("link", { name: "Alumni" })).toHaveAttribute(
      "href",
      "/admin/alumni",
    );
  });

  it("laisse les modules non livrés marqués « À venir »", () => {
    render(<Sidebar user={USER} />);

    expect(screen.queryByRole("link", { name: /Contenus/ })).not.toBeInTheDocument();
    expect(screen.getAllByText("À venir")).toHaveLength(2);
  });
});
