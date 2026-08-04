import { describe, expect, it } from "vitest";

import { landingPathForUser, shouldRedirectToLogin } from "./route-guard";

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

  it("ne confond pas /administration avec /admin", () => {
    expect(shouldRedirectToLogin("/administration", false)).toBe(false);
  });
});

describe("shouldRedirectToLogin — espace alumni", () => {
  it("protège /espace", () => {
    expect(shouldRedirectToLogin("/espace", false)).toBe(true);
    expect(shouldRedirectToLogin("/espace/", false)).toBe(true);
  });

  it("laisse passer /espace avec une session", () => {
    expect(shouldRedirectToLogin("/espace", true)).toBe(false);
  });

  it("ne protège pas les pages publiques alumni", () => {
    expect(shouldRedirectToLogin("/alumni", false)).toBe(false);
    expect(shouldRedirectToLogin("/alumni/inscription", false)).toBe(false);
    expect(shouldRedirectToLogin("/alumni/activation", false)).toBe(false);
  });

  it("ne confond pas un préfixe avec un autre chemin", () => {
    expect(shouldRedirectToLogin("/espacements", false)).toBe(false);
  });
});

describe("landingPathForUser", () => {
  it("envoie les rôles staff vers le back-office", () => {
    for (const role of [
      "Administrateur",
      "Secrétaire",
      "Trésorier",
      "Rédacteur de contenu",
    ]) {
      expect(
        landingPathForUser({ roles: [role], is_superuser: false }),
      ).toBe("/admin");
    }
  });

  it("envoie un alumni vers son espace", () => {
    expect(
      landingPathForUser({ roles: ["Alumni"], is_superuser: false }),
    ).toBe("/espace");
  });

  it("envoie un super-utilisateur vers le back-office", () => {
    expect(landingPathForUser({ roles: [], is_superuser: true })).toBe("/admin");
  });

  it("envoie un compte sans rôle vers l'espace alumni", () => {
    expect(landingPathForUser({ roles: [], is_superuser: false })).toBe("/espace");
  });

  it("privilégie le back-office pour un alumni également rédacteur", () => {
    expect(
      landingPathForUser({
        roles: ["Alumni", "Rédacteur de contenu"],
        is_superuser: false,
      }),
    ).toBe("/admin");
  });

  it("tolère un utilisateur absent", () => {
    expect(landingPathForUser(null)).toBe("/espace");
  });
});
