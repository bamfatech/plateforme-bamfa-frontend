import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { Hero } from "@/components/sections/Hero";
import { Stat } from "@/components/sections/Stat";
import { home } from "@/content/home";

export const metadata = {
  title: "BAMFA — Réseau des alumni Mastercard Foundation au Bénin",
  description:
    "BAMFA fédère, accompagne et valorise les alumni de la Mastercard Foundation au Bénin.",
};

export default function HomePage() {
  return (
    <>
      <Hero {...home.hero} />

      <Section>
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {home.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-ink">{home.mission.title}</h2>
          <p className="mt-4 max-w-3xl text-lg text-stone-600">{home.mission.text}</p>
        </Container>
      </Section>

      <Section>
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {home.features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </Container>
      </Section>

      <CallToAction {...home.cta} />
    </>
  );
}
