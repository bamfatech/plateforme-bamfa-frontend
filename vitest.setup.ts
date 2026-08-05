import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { vi } from "vitest";

// `fetchCsrfToken` (lib/api/client.ts) appelle l'instance axios **par défaut**,
// pas l'instance `api` que les tests interceptent. La pré-requête CSRF déclenchée
// par tout POST/PUT/PATCH/DELETE échappait donc aux mocks et partait sur le
// réseau : la suite ne passait que si un backend écoutait par hasard sur le port
// 8000, et échouait en ECONNREFUSED partout ailleurs (CI comprise).
// On intercepte donc l'instance par défaut ici, une fois pour toutes.
// `onNoMatch: "throwException"` est délibéré : tout autre appel passant par
// l'instance par défaut échoue bruyamment au lieu de filer vers le réseau.
new MockAdapter(axios, { onNoMatch: "throwException" })
  .onGet(/\/auth\/csrf\/$/)
  .reply(200, { csrfToken: "csrf-de-test" });

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist", className: "font-geist" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono", className: "font-geist-mono" }),
  Fraunces: () => ({ variable: "--font-fraunces", className: "font-fraunces" }),
}));

// Polyfills jsdom pour le motion (Reveal / Lenis) — Task 3 s'appuie dessus.
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

if (typeof globalThis.IntersectionObserver !== "function") {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error - polyfill de test
  globalThis.IntersectionObserver = IO;
}

if (typeof globalThis.ResizeObserver !== "function") {
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = RO;
}
