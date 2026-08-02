import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { Eyebrow } from "@/components/sections/Eyebrow";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { SplitSection } from "@/components/sections/SplitSection";
import { TeamMemberCard } from "@/components/sections/TeamMemberCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { ValueCard } from "@/components/sections/ValueCard";
import { about } from "@/content/about";
import { howItWorks } from "@/content/how-it-works";
import { org } from "@/content/org";
import { values } from "@/content/values";

export const metadata = {
  title: "À propos — BAMFA",
  description:
    "Qui sommes-nous, notre histoire, notre vision, nos valeurs, notre fonctionnement et notre équipe.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.header.title} intro={about.header.intro} />

      {/* Navigation d'ancres éditoriale */}
      <div className="sticky top-16 z-30 border-b border-stone-300 bg-paper/90 backdrop-blur">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-3 font-mono text-xs uppercase tracking-[0.12em]">
          {about.anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="text-stone-600 transition-colors hover:text-flame-ink"
            >
              {anchor.label}
            </a>
          ))}
        </Container>
      </div>

      <div id="qui-sommes-nous" className="scroll-mt-28">
        <Reveal>
          <SplitSection
            eyebrow={about.intro.eyebrow}
            title={about.intro.title}
            imageSrc={about.intro.imageSrc}
            imageAlt={about.intro.imageAlt}
            imageSide="right"
          >
            {about.intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SplitSection>
        </Reveal>
      </div>

      <SectionDivider />

      <div id="histoire" className="scroll-mt-28">
        <Section>
          <Container className="max-w-3xl">
            <Reveal>
              <Eyebrow>{about.history.eyebrow}</Eyebrow>
              <h2 className="mb-10 mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {about.history.title}
              </h2>
            </Reveal>
            <Timeline steps={about.history.steps} />
          </Container>
        </Section>
      </div>

      <div id="vision-mission" className="scroll-mt-28">
        <Reveal>
          <SplitSection
            eyebrow={values.vision.eyebrow}
            title={values.vision.title}
            imageSrc={values.vision.imageSrc}
            imageAlt={values.vision.imageAlt}
            imageSide="right"
          >
            <p>{values.vision.text}</p>
          </SplitSection>
        </Reveal>
        <Reveal>
          <SplitSection
            eyebrow={values.mission.eyebrow}
            title={values.mission.title}
            imageSrc={values.mission.imageSrc}
            imageAlt={values.mission.imageAlt}
            imageSide="left"
          >
            <p>{values.mission.text}</p>
          </SplitSection>
        </Reveal>
      </div>

      <SectionDivider />

      <div id="valeurs" className="scroll-mt-28">
        <Section>
          <Container>
            <Reveal>
              <Eyebrow>{values.valuesHeading.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {values.valuesHeading.title}
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {values.items.map((value) => (
                <Reveal key={value.title}>
                  <ValueCard icon={value.icon} title={value.title} description={value.description} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      </div>

      <div id="fonctionnement" className="scroll-mt-28">
        <Section>
          <Container>
            <Reveal>
              <Eyebrow>{howItWorks.heading.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {howItWorks.heading.title}
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {howItWorks.sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Reveal key={section.title}>
                    <article className="h-full rounded-sm border border-stone-300 bg-white p-7 transition-colors hover:border-ink">
                      <Icon className="h-6 w-6 text-flame-ink" aria-hidden="true" />
                      <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                        {section.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-stone-600">{section.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>
      </div>

      <SectionDivider />

      <div id="equipe" className="scroll-mt-28">
        <Section>
          <Container>
            <Reveal>
              <Eyebrow>{org.heading.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {org.heading.title}
              </h2>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-flame-ink">
                {org.mandate}
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {org.members.map((member, index) => (
                <Reveal key={`${member.name}-${index}`}>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      </div>

      <div id="faq" className="scroll-mt-28">
        <Faq eyebrow={about.faq.eyebrow} title={about.faq.title} items={about.faq.items} />
      </div>

      <SectionDivider />

      <Testimonials
        eyebrow={about.testimonials.eyebrow}
        title={about.testimonials.title}
        items={about.testimonials.items}
      />

      <CallToAction {...about.cta} />
    </>
  );
}
