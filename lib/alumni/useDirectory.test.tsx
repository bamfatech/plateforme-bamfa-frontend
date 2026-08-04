import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { queryWrapper } from "@/lib/test-utils";

import { useDirectory } from "./useDirectory";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

const REPONSE = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      first_name: "Awa",
      last_name: "Doe",
      promotion: 2018,
      sector: "numerique",
      sector_display: "Technologies et numérique",
      country: "Bénin",
      current_position: "Développeuse",
      organization: "BAMFA",
    },
  ],
};

describe("useDirectory", () => {
  it("charge l'annuaire", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, REPONSE);

    const { result } = renderHook(() => useDirectory({}), {
      wrapper: queryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.results[0].last_name).toBe("Doe");
  });

  it("n'envoie que les filtres renseignés", async () => {
    mock.onGet("/alumni/annuaire/").reply(200, REPONSE);

    const { result } = renderHook(
      () => useDirectory({ search: "Doe", secteur: "", page: 2 }),
      { wrapper: queryWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mock.history.get[0].params).toEqual({ search: "Doe", page: 2 });
  });
});
