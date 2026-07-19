import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { Eyebrow } from "@/components/sections/Eyebrow";
import { Hero } from "@/components/sections/Hero";
import { ImageFeatureCard } from "@/components/sections/ImageFeatureCard";
import { SplitSection } from "@/components/sections/SplitSection";
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

      <Section className="bg-cream">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {home.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </Container>
      </Section>

      <SplitSection
        eyebrow={home.mission.eyebrow}
        title={home.mission.title}
        imageSrc={home.mission.imageSrc}
        imageAlt={home.mission.imageAlt}
        imageSide="left"
      >
        {home.mission.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </SplitSection>

      <Section className="bg-cream">
        <Container>
          <Eyebrow>{home.programs.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
            {home.programs.title}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {home.programs.items.map((item) => (
              <ImageFeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
              />
            ))}
          </div>
        </Container>
      </Section>

      <SplitSection
        eyebrow={home.impact.eyebrow}
        title={home.impact.title}
        imageSrc={home.impact.imageSrc}
        imageAlt={home.impact.imageAlt}
        imageSide="right"
      >
        {home.impact.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </SplitSection>

      <Section className="bg-cream">
        <Container className="text-center">
          <Eyebrow className="text-center">{home.partners.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink">{home.partners.title}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {home.partners.logos.map((logo) => (
              <span key={logo} className="font-heading text-lg font-semibold text-stone-400">
                {logo}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction {...home.cta} />
    </>
  );
}
