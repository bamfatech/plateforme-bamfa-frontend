import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { Eyebrow } from "@/components/sections/Eyebrow";
import { Hero } from "@/components/sections/Hero";
import { ImageFeatureCard } from "@/components/sections/ImageFeatureCard";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { SplitSection } from "@/components/sections/SplitSection";
import { Stat } from "@/components/sections/Stat";
import { Testimonials } from "@/components/sections/Testimonials";
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

      <Section className="border-b border-stone-300">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {home.stats.map((s) => (
            <Reveal key={s.label}>
              <Stat value={s.value} label={s.label} />
            </Reveal>
          ))}
        </Container>
      </Section>

      <Reveal>
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
      </Reveal>

      <SectionDivider />

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{home.programs.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {home.programs.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {home.programs.items.map((item) => (
              <Reveal key={item.title}>
                <ImageFeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Reveal>
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
      </Reveal>

      <Testimonials
        eyebrow={home.testimonials.eyebrow}
        title={home.testimonials.title}
        items={home.testimonials.items}
      />

      <SectionDivider />

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{home.partners.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink">
              {home.partners.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-stone-300 bg-stone-300 sm:grid-cols-3 md:grid-cols-5">
            {home.partners.logos.map((logo) => (
              <div key={logo.name} className="relative h-20 bg-paper">
                <Image
                  src={logo.imageSrc}
                  alt={logo.name}
                  fill
                  className="object-cover grayscale transition duration-300 hover:grayscale-0"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CallToAction {...home.cta} />
    </>
  );
}
