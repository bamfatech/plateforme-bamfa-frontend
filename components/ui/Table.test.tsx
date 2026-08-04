import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table, Tbody, Td, Th, Thead, Tr } from "./Table";

describe("Table", () => {
  it("rend une table accessible avec ses en-têtes", () => {
    render(
      <Table caption="Profils alumni">
        <Thead>
          <Tr>
            <Th>Nom</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Doe</Td>
          </Tr>
        </Tbody>
      </Table>,
    );

    expect(screen.getByRole("table", { name: "Profils alumni" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Nom" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Doe" })).toBeInTheDocument();
  });
});
