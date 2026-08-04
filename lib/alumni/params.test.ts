import { describe, expect, it } from "vitest";

import { cleanParams } from "./params";

describe("cleanParams", () => {
  it("retire les valeurs vides, nulles et indéfinies", () => {
    expect(
      cleanParams({ search: "", promotion: undefined, secteur: null, page: 2 }),
    ).toEqual({ page: 2 });
  });

  it("conserve les valeurs utiles, y compris les booléens", () => {
    expect(cleanParams({ search: "Doe", a_un_compte: false })).toEqual({
      search: "Doe",
      a_un_compte: false,
    });
  });

  it("renvoie un objet vide quand tout est vide", () => {
    expect(cleanParams({ search: "", page: undefined })).toEqual({});
  });
});
