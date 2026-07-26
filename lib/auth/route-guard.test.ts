import { describe, expect, it } from "vitest";

import { shouldRedirectToLogin } from "./route-guard";

describe("shouldRedirectToLogin", () => {
  it("redirige sur /admin sans cookie de session", () => {
    expect(shouldRedirectToLogin("/admin", false)).toBe(true);
    expect(shouldRedirectToLogin("/admin/contenus", false)).toBe(true);
  });

  it("laisse passer /admin avec cookie de session", () => {
    expect(shouldRedirectToLogin("/admin", true)).toBe(false);
  });

  it("ne concerne pas les routes hors /admin", () => {
    expect(shouldRedirectToLogin("/", false)).toBe(false);
    expect(shouldRedirectToLogin("/connexion", false)).toBe(false);
    expect(shouldRedirectToLogin("/a-propos", false)).toBe(false);
  });
});
