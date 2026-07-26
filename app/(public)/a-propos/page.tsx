import { CallToAction } from "@/components/sections/CallToAction";
import { PageHeader } from "@/components/sections/PageHeader";
import { SplitSection } from "@/components/sections/SplitSection";
import { about } from "@/content/about";

export const metadata = {
  title: "À propos — BAMFA",
  description: "Découvrez BAMFA, le réseau des alumni de la Mastercard Foundation au Bénin.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.header.title} intro={about.header.intro} />
      {about.sections.map((section, index) => (
        <SplitSection
          key={section.title}
          eyebrow={section.eyebrow}
          title={section.title}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          imageSide={index % 2 === 0 ? "right" : "left"}
          className={index % 2 === 1 ? "bg-cream" : undefined}
        >
          <p>{section.text}</p>
        </SplitSection>
      ))}
      <CallToAction {...about.cta} />
    </>
  );
}
