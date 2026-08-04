import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { afterEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { queryWrapper } from "@/lib/test-utils";

import { useProfileAction, useProfiles } from "./useProfiles";

const mock = new MockAdapter(api);

afterEach(() => mock.reset());

describe("useProfiles", () => {
  it("charge la liste d'administration", async () => {
    mock
      .onGet("/alumni/admin/profils/")
      .reply(200, { count: 0, next: null, previous: null, results: [] });

    const { result } = renderHook(() => useProfiles({}), {
      wrapper: queryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.count).toBe(0);
  });
});

describe("useProfileAction", () => {
  it("appelle l'action demandée sur le bon profil", async () => {
    mock.onPost("/alumni/admin/profils/7/suspendre/").reply(200, { id: 7 });

    const { result } = renderHook(() => useProfileAction(), {
      wrapper: queryWrapper(),
    });
    result.current.mutate({ id: 7, action: "suspendre" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mock.history.post[0].url).toBe("/alumni/admin/profils/7/suspendre/");
  });
});
