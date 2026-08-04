import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
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

  it("déplace le focus dans la boîte de dialogue à l'ouverture", () => {
    render(
      <Modal open title="Rejeter" onClose={vi.fn()}>
        <button type="button">Confirmer</button>
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Rejeter" })).toHaveFocus();
  });

  it("piège la tabulation : depuis le dernier élément, Tab revient au premier", async () => {
    render(
      <Modal open title="Rejeter" onClose={vi.fn()}>
        <button type="button">Confirmer</button>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: "Fermer" });
    const confirmButton = screen.getByRole("button", { name: "Confirmer" });

    confirmButton.focus();
    await userEvent.tab();

    expect(closeButton).toHaveFocus();
  });

  it("piège la tabulation inversée : depuis le premier élément, Maj+Tab revient au dernier", async () => {
    render(
      <Modal open title="Rejeter" onClose={vi.fn()}>
        <button type="button">Confirmer</button>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { name: "Fermer" });
    const confirmButton = screen.getByRole("button", { name: "Confirmer" });

    closeButton.focus();
    await userEvent.tab({ shift: true });

    expect(confirmButton).toHaveFocus();
  });

  it("restaure le focus sur le déclencheur après la fermeture", async () => {
    function Wrapper() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Ouvrir
          </button>
          <Modal open={open} title="Rejeter" onClose={() => setOpen(false)}>
            contenu
          </Modal>
        </>
      );
    }

    render(<Wrapper />);

    const trigger = screen.getByRole("button", { name: "Ouvrir" });
    trigger.focus();
    await userEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Fermer" }));

    expect(trigger).toHaveFocus();
  });
});
