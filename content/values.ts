// Contenu de substitution — à remplacer par le contenu officiel BAMFA (textes + images).
import { Compass, HeartHandshake, Lightbulb, ShieldCheck, Sprout, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const values = {
  valuesHeading: { eyebrow: "Nos valeurs", title: "Ce qui nous anime" },
  vision: {
    eyebrow: "Notre vision",
    title: "Un réseau moteur de transformation",
    text: "Une communauté d'alumni influente et solidaire, moteur de transformation positive au Bénin.",
    imageSrc: "https://picsum.photos/seed/bamfa-vision/800/600",
    imageAlt: "Photo de substitution — vision BAMFA",
  },
  mission: {
    eyebrow: "Notre mission",
    title: "Fédérer, accompagner, agir",
    text: "Fédérer les alumni, faciliter le mentorat et le partage d'opportunités, et porter des projets à fort impact social.",
    imageSrc: "https://picsum.photos/seed/bamfa-mission2/800/600",
    imageAlt: "Photo de substitution — mission BAMFA",
  },
  items: [
    { icon: HeartHandshake as LucideIcon, title: "Solidarité", description: "S'entraider et avancer ensemble." },
    { icon: ShieldCheck as LucideIcon, title: "Intégrité", description: "Agir avec éthique et transparence." },
    { icon: Lightbulb as LucideIcon, title: "Innovation", description: "Oser des solutions nouvelles." },
    { icon: Sprout as LucideIcon, title: "Impact", description: "Servir les communautés durablement." },
    { icon: Users as LucideIcon, title: "Inclusion", description: "Valoriser chaque membre." },
    { icon: Compass as LucideIcon, title: "Excellence", description: "Viser haut, avec exigence." },
  ],
};
