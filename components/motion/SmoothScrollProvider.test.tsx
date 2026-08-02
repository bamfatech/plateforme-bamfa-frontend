import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SmoothScrollProvider } from "./SmoothScrollProvider";

describe("SmoothScrollProvider", () => {
  it("rend ses enfants", () => {
    render(
      <SmoothScrollProvider>
        <p>page</p>
      </SmoothScrollProvider>,
    );
    expect(screen.getByText("page")).toBeInTheDocument();
  });
});
