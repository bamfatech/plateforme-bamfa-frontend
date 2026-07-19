// Contenu de substitution — à remplacer par le contenu officiel BAMFA (textes + images).
// Les images pointent vers un fournisseur de placeholders (picsum) ; remplacer par les vraies photos.
import { GraduationCap, HandHeart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const home = {
  hero: {
    eyebrow: "Réseau d'alumni · Bénin",
    title: "Ensemble, les alumni Mastercard Foundation transforment le Bénin",
    subtitle:
      "BAMFA fédère, accompagne et valorise les diplômés de la Mastercard Foundation pour multiplier leur impact — au Bénin et au-delà.",
    primaryCta: { label: "Découvrir BAMFA", href: "/a-propos" },
    secondaryCta: { label: "Nous soutenir", href: "/contact" },
    imageSrc: "https://picsum.photos/seed/bamfa-hero/900/900",
    imageAlt: "Photo de substitution — communauté d'alumni BAMFA",
  },
  stats: [
    { value: "250+", label: "Alumni membres" },
    { value: "15", label: "Programmes & initiatives" },
    { value: "30+", label: "Événements organisés" },
    { value: "12", label: "Partenaires" },
  ],
  mission: {
    eyebrow: "Notre mission",
    title: "Un réseau solidaire au service de l'impact",
    paragraphs: [
      "Nous créons une communauté d'alumni engagés qui s'entraident, partagent des opportunités et conduisent des projets à fort impact social.",
      "Mentorat, formations, collaborations : BAMFA transforme des parcours individuels en une force collective au service du Bénin.",
    ],
    imageSrc: "https://picsum.photos/seed/bamfa-mission/800/600",
    imageAlt: "Photo de substitution — mission BAMFA",
  },
  programs: {
    eyebrow: "Ce que nous faisons",
    title: "Des programmes concrets",
    items: [
      {
        icon: Users as LucideIcon,
        title: "Communauté",
        description: "Un réseau actif d'alumni qui s'entraident et collaborent au quotidien.",
        imageSrc: "https://picsum.photos/seed/bamfa-prog1/800/500",
        imageAlt: "Photo de substitution — communauté",
      },
      {
        icon: GraduationCap as LucideIcon,
        title: "Mentorat & formation",
        description: "Un accompagnement et une montée en compétences pour chaque membre.",
        imageSrc: "https://picsum.photos/seed/bamfa-prog2/800/500",
        imageAlt: "Photo de substitution — mentorat",
      },
      {
        icon: HandHeart as LucideIcon,
        title: "Impact social",
        description: "Des projets concrets au service des communautés du Bénin.",
        imageSrc: "https://picsum.photos/seed/bamfa-prog3/800/500",
        imageAlt: "Photo de substitution — impact",
      },
    ],
  },
  impact: {
    eyebrow: "Notre impact",
    title: "Des parcours qui inspirent",
    paragraphs: [
      "Nos membres portent des initiatives dans l'éducation, l'entrepreneuriat et le développement communautaire.",
      "Chaque réussite renforce le réseau et ouvre de nouvelles opportunités pour celles et ceux qui suivent.",
    ],
    imageSrc: "https://picsum.photos/seed/bamfa-impact/800/600",
    imageAlt: "Photo de substitution — impact des alumni",
  },
  partners: {
    eyebrow: "Ils nous accompagnent",
    title: "Nos partenaires",
    logos: ["Partenaire 1", "Partenaire 2", "Partenaire 3", "Partenaire 4", "Partenaire 5"],
  },
  cta: {
    title: "Devenez partenaire de BAMFA",
    description: "Ensemble, amplifions l'impact des alumni au Bénin.",
    cta: { label: "Nous contacter", href: "/contact" },
  },
};
