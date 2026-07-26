import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { api } from "@/lib/api/client";
import { queryWrapper } from "@/lib/test-utils";

import { useAuth } from "./useAuth";

let apiMock: MockAdapter;
let axiosMock: MockAdapter;

const USER = {
  id: 1,
  email: "admin@bamfa.org",
  first_name: "Ada",
  last_name: "Lovelace",
  is_staff: true,
  is_superuser: true,
  roles: ["Administrateur"],
};

beforeEach(() => {
  apiMock = new MockAdapter(api);
  axiosMock = new MockAdapter(axios);
  axiosMock.onGet(/\/auth\/csrf\/$/).reply(200, { csrfToken: "tok123" });
});

afterEach(() => {
  apiMock.restore();
  axiosMock.restore();
});

describe("useAuth", () => {
  it("expose l'utilisateur quand /me répond 200", async () => {
    apiMock.onGet("/auth/me/").reply(200, USER);
    const { result } = renderHook(() => useAuth(), { wrapper: queryWrapper() });
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(result.current.user?.email).toBe("admin@bamfa.org");
  });

  it("n'authentifie pas quand /me échoue (401 persistant)", async () => {
    apiMock.onGet("/auth/me/").reply(401);
    apiMock.onPost("/auth/refresh/").reply(401);
    const { result } = renderHook(() => useAuth(), { wrapper: queryWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("login renvoie l'utilisateur et l'authentifie", async () => {
    apiMock.onGet("/auth/me/").reply(401);
    apiMock.onPost("/auth/refresh/").reply(401);
    apiMock.onPost("/auth/login/").reply(200, USER);
    const { result } = renderHook(() => useAuth(), { wrapper: queryWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.login.mutateAsync({ email: "admin@bamfa.org", password: "x" });
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(result.current.user?.email).toBe("admin@bamfa.org");
  });
});
