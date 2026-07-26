// Contenu de substitution — à remplacer par le contenu officiel BAMFA.
import { CalendarDays, Landmark, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const howItWorks = {
  heading: { eyebrow: "Fonctionnement", title: "Comment BAMFA s'organise" },
  sections: [
    {
      icon: Landmark as LucideIcon,
      title: "Gouvernance",
      text: "BAMFA est animée par un bureau élu et des comités thématiques, avec des mandats renouvelés régulièrement.",
    },
    {
      icon: UserPlus as LucideIcon,
      title: "Adhésion",
      text: "Tout alumni de la Mastercard Foundation au Bénin peut rejoindre l'association et participer à ses activités.",
    },
    {
      icon: CalendarDays as LucideIcon,
      title: "Activités",
      text: "Mentorat, formations, événements, partage d'opportunités et projets communautaires rythment la vie de l'association.",
    },
  ],
};
