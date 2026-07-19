// Contenu de substitution — à remplacer par le contenu officiel BAMFA.
import { GraduationCap, HandHeart, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const home = {
  hero: {
    title: "Le réseau des alumni Mastercard Foundation au Bénin",
    subtitle:
      "BAMFA fédère, accompagne et valorise les diplômés de la Mastercard Foundation pour multiplier leur impact au Bénin et au-delà.",
    primaryCta: { label: "Découvrir BAMFA", href: "/a-propos" },
    secondaryCta: { label: "Nous soutenir", href: "/contact" },
  },
  stats: [
    { value: "250+", label: "Alumni membres" },
    { value: "15", label: "Programmes & initiatives" },
    { value: "30+", label: "Événements organisés" },
  ],
  mission: {
    title: "Notre mission",
    text: "Créer une communauté solidaire d'alumni engagés, en facilitant le mentorat, le partage d'opportunités et la conduite de projets à fort impact social.",
  },
  features: [
    { icon: Users as LucideIcon, title: "Communauté", description: "Un réseau actif d'alumni qui s'entraident et collaborent." },
    { icon: GraduationCap as LucideIcon, title: "Mentorat & formation", description: "Des programmes d'accompagnement et de montée en compétences." },
    { icon: HandHeart as LucideIcon, title: "Impact", description: "Des projets concrets au service des communautés." },
  ],
  cta: {
    title: "Devenez partenaire de BAMFA",
    description: "Ensemble, amplifions l'impact des alumni au Bénin.",
    cta: { label: "Nous contacter", href: "/contact" },
  },
};
