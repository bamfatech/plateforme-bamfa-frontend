import { render, screen } from "@testing-library/react";
import { Award } from "lucide-react";
import { describe, expect, it } from "vitest";

import { CallToAction } from "./CallToAction";
import { FeatureCard } from "./FeatureCard";
import { Hero } from "./Hero";
import { PageHeader } from "./PageHeader";
import { Stat } from "./Stat";
import { ValueCard } from "./ValueCard";

describe("composants de sections", () => {
  it("Hero rend le titre et les CTA", () => {
    render(
      <Hero
        title="Bienvenue"
        subtitle="Sous-titre"
        primaryCta={{ label: "Découvrir", href: "/a-propos" }}
        secondaryCta={{ label: "Nous soutenir", href: "/contact" }}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Bienvenue" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Découvrir" })).toHaveAttribute("href", "/a-propos");
    expect(screen.getByRole("link", { name: "Nous soutenir" })).toHaveAttribute("href", "/contact");
  });

  it("PageHeader rend un h1", () => {
    render(<PageHeader title="À propos" intro="Intro" />);
    expect(screen.getByRole("heading", { level: 1, name: "À propos" })).toBeInTheDocument();
  });

  it("Stat rend valeur et libellé", () => {
    render(<Stat value="250+" label="Alumni" />);
    expect(screen.getByText("250+")).toBeInTheDocument();
    expect(screen.getByText("Alumni")).toBeInTheDocument();
  });

  it("FeatureCard rend titre et description", () => {
    render(<FeatureCard icon={Award} title="Mentorat" description="Accompagnement" />);
    expect(screen.getByText("Mentorat")).toBeInTheDocument();
    expect(screen.getByText("Accompagnement")).toBeInTheDocument();
  });

  it("ValueCard rend titre et description", () => {
    render(<ValueCard icon={Award} title="Excellence" description="Viser haut" />);
    expect(screen.getByText("Excellence")).toBeInTheDocument();
  });

  it("CallToAction rend le titre et le bouton-lien", () => {
    render(<CallToAction title="Rejoignez-nous" cta={{ label: "Contact", href: "/contact" }} />);
    expect(screen.getByText("Rejoignez-nous")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
