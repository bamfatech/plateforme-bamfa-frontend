// Contenu de substitution — à remplacer par le contenu officiel BAMFA.
import { Compass, HeartHandshake, Lightbulb, ShieldCheck, Sprout, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const values = {
  header: { title: "Vision, mission & valeurs", intro: "Ce qui guide l'action de BAMFA au quotidien." },
  valuesTitle: "Nos valeurs",
  vision: {
    title: "Vision",
    text: "Une communauté d'alumni influente et solidaire, moteur de transformation positive au Bénin.",
  },
  mission: {
    title: "Mission",
    text: "Fédérer les alumni, faciliter le mentorat et le partage d'opportunités, et porter des projets à fort impact social.",
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
