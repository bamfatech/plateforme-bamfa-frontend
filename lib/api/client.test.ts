import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ApiError, api } from "./client";

let apiMock: MockAdapter;
let axiosMock: MockAdapter;

beforeEach(() => {
  apiMock = new MockAdapter(api);
  axiosMock = new MockAdapter(axios);
  axiosMock.onGet(/\/auth\/csrf\/$/).reply(200, { csrfToken: "tok123" });
});

afterEach(() => {
  apiMock.restore();
  axiosMock.restore();
});

describe("client axios", () => {
  it("ajoute l'en-tête X-CSRFToken sur une requête POST", async () => {
    let sentHeaders: Record<string, unknown> = {};
    apiMock.onPost("/things/").reply((config) => {
      sentHeaders = config.headers as Record<string, unknown>;
      return [201, {}];
    });
    await api.post("/things/", { a: 1 });
    expect(sentHeaders["X-CSRFToken"]).toBe("tok123");
  });

  it("rafraîchit puis rejoue la requête sur 401", async () => {
    let calls = 0;
    apiMock.onGet("/me/").reply(() => {
      calls += 1;
      return calls === 1 ? [401, {}] : [200, { ok: true }];
    });
    apiMock.onPost("/auth/refresh/").reply(200, {});
    const res = await api.get("/me/");
    expect(res.data).toEqual({ ok: true });
    expect(calls).toBe(2);
  });

  it("lève ApiError si le refresh échoue (401 persistant)", async () => {
    apiMock.onGet("/secret/").reply(401);
    apiMock.onPost("/auth/refresh/").reply(401);
    await expect(api.get("/secret/")).rejects.toBeInstanceOf(ApiError);
  });

  it("lève ApiError avec le status sur une erreur non-401", async () => {
    apiMock.onGet("/x/").reply(500, { detail: "boom" });
    await expect(api.get("/x/")).rejects.toMatchObject({ status: 500 });
  });
});
