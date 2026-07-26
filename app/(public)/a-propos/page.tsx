import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { Eyebrow } from "@/components/sections/Eyebrow";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/sections/PageHeader";
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

      {/* Navigation d'ancres */}
      <div className="border-b border-stone-200 bg-white">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-4 text-sm">
          {about.anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="text-stone-600 transition hover:text-primary-700"
            >
              {anchor.label}
            </a>
          ))}
        </Container>
      </div>

      <div id="qui-sommes-nous" className="scroll-mt-24">
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
      </div>

      <div id="histoire" className="scroll-mt-24">
        <Section className="bg-cream">
          <Container className="max-w-3xl">
            <Eyebrow>{about.history.eyebrow}</Eyebrow>
            <h2 className="mb-8 mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {about.history.title}
            </h2>
            <Timeline steps={about.history.steps} />
          </Container>
        </Section>
      </div>

      <div id="vision-mission" className="scroll-mt-24">
        <SplitSection
          eyebrow={values.vision.eyebrow}
          title={values.vision.title}
          imageSrc={values.vision.imageSrc}
          imageAlt={values.vision.imageAlt}
          imageSide="right"
        >
          <p>{values.vision.text}</p>
        </SplitSection>
        <SplitSection
          eyebrow={values.mission.eyebrow}
          title={values.mission.title}
          imageSrc={values.mission.imageSrc}
          imageAlt={values.mission.imageAlt}
          imageSide="left"
          className="bg-cream"
        >
          <p>{values.mission.text}</p>
        </SplitSection>
      </div>

      <div id="valeurs" className="scroll-mt-24">
        <Section>
          <Container>
            <Eyebrow>{values.valuesHeading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {values.valuesHeading.title}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {values.items.map((value) => (
                <ValueCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </Container>
        </Section>
      </div>

      <div id="fonctionnement" className="scroll-mt-24">
        <Section className="bg-cream">
          <Container>
            <Eyebrow>{howItWorks.heading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {howItWorks.heading.title}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {howItWorks.sections.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                      <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-stone-600">{section.text}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </Section>
      </div>

      <div id="equipe" className="scroll-mt-24">
        <Section>
          <Container>
            <Eyebrow>{org.heading.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {org.heading.title}
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
              {org.mandate}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {org.members.map((member, index) => (
                <TeamMemberCard key={`${member.name}-${index}`} member={member} />
              ))}
            </div>
          </Container>
        </Section>
      </div>

      <div id="faq" className="scroll-mt-24">
        <Faq eyebrow={about.faq.eyebrow} title={about.faq.title} items={about.faq.items} className="bg-cream" />
      </div>

      <Testimonials
        eyebrow={about.testimonials.eyebrow}
        title={about.testimonials.title}
        items={about.testimonials.items}
        className=""
      />

      <CallToAction {...about.cta} />
    </>
  );
}
