import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("affiche la position courante", () => {
    render(<Pagination count={45} page={2} pageSize={20} onPageChange={vi.fn()} />);

    expect(screen.getByText("Page 2 sur 3")).toBeInTheDocument();
  });

  it("désactive « Précédent » sur la première page", () => {
    render(<Pagination count={45} page={1} pageSize={20} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Précédent" })).toBeDisabled();
  });

  it("désactive « Suivant » sur la dernière page", () => {
    render(<Pagination count={45} page={3} pageSize={20} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Suivant" })).toBeDisabled();
  });

  it("notifie le changement de page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination count={45} page={2} pageSize={20} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Suivant" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("ne s'affiche pas quand tout tient sur une page", () => {
    const { container } = render(
      <Pagination count={5} page={1} pageSize={20} onPageChange={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
