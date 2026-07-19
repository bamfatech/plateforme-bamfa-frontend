import { render, screen } from "@testing-library/react";
import { Award } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Avatar } from "@/components/ui/Avatar";

import { ImageFeatureCard } from "./ImageFeatureCard";
import { SplitSection } from "./SplitSection";

describe("composants riches", () => {
  it("Avatar rend les initiales du nom", () => {
    render(<Avatar name="Awa Koudjo" />);
    expect(screen.getByText("AK")).toBeInTheDocument();
  });

  it("SplitSection rend le titre et l'image", () => {
    render(
      <SplitSection title="Notre mission" imageSrc="https://picsum.photos/seed/x/800/600" imageAlt="Illustration mission">
        <p>Texte</p>
      </SplitSection>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Notre mission" })).toBeInTheDocument();
    expect(screen.getByAltText("Illustration mission")).toBeInTheDocument();
  });

  it("ImageFeatureCard rend le titre, la description et l'image", () => {
    render(
      <ImageFeatureCard
        icon={Award}
        title="Mentorat"
        description="Accompagnement"
        imageSrc="https://picsum.photos/seed/y/800/500"
        imageAlt="Illustration mentorat"
      />,
    );
    expect(screen.getByText("Mentorat")).toBeInTheDocument();
    expect(screen.getByText("Accompagnement")).toBeInTheDocument();
    expect(screen.getByAltText("Illustration mentorat")).toBeInTheDocument();
  });
});
