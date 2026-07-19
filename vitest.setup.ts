import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
  Poppins: () => ({ variable: "--font-poppins", className: "font-poppins" }),
}));
