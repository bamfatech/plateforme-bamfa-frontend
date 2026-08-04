import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";

describe("Modal", () => {
  it("ne rend rien quand elle est fermée", () => {
    const { container } = render(
      <Modal open={false} title="Rejeter" onClose={vi.fn()}>
        contenu
      </Modal>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("rend un dialogue nommé quand elle est ouverte", () => {
    render(
      <Modal open title="Rejeter la demande" onClose={vi.fn()}>
        contenu
      </Modal>,
    );

    expect(
      screen.getByRole("dialog", { name: "Rejeter la demande" }),
    ).toBeInTheDocument();
  });

  it("se ferme au clic sur le bouton de fermeture", async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Rejeter" onClose={onClose}>
        contenu
      </Modal>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Fermer" }));

    expect(onClose).toHaveBeenCalled();
  });

  it("se ferme à la touche Échap", async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Rejeter" onClose={onClose}>
        contenu
      </Modal>,
    );

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });
});
