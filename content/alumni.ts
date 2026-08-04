/** Doit rester aligné sur `Sector` de `apps/alumni/models.py`. */
export const SECTOR_OPTIONS = [
  { value: "agriculture", label: "Agriculture et agro-industrie" },
  { value: "sante", label: "Santé" },
  { value: "education", label: "Éducation et formation" },
  { value: "numerique", label: "Technologies et numérique" },
  { value: "finance", label: "Finance et assurance" },
  { value: "entrepreneuriat", label: "Entrepreneuriat et PME" },
  { value: "energie", label: "Énergie et environnement" },
  { value: "industrie", label: "Industrie et BTP" },
  { value: "commerce", label: "Commerce et distribution" },
  { value: "transport", label: "Transport et logistique" },
  { value: "public", label: "Administration publique" },
  { value: "ong", label: "Société civile et ONG" },
  { value: "culture", label: "Arts, culture et médias" },
  { value: "recherche", label: "Recherche" },
  { value: "autre", label: "Autre" },
];

/** Doit rester aligné sur `Gender` de `apps/alumni/models.py`. */
export const GENDER_OPTIONS = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "autre", label: "Autre" },
  { value: "non_precise", label: "Non précisé" },
];

export const STATUS_OPTIONS = [
  { value: "actif", label: "Actif" },
  { value: "suspendu", label: "Suspendu" },
  { value: "archive", label: "Archivé" },
];

export const REGISTRATION_STATUS_OPTIONS = [
  { value: "en_attente", label: "En attente" },
  { value: "approuvee", label: "Approuvée" },
  { value: "rejetee", label: "Rejetée" },
];

export const PROMOTION_MIN = 2010;
export const promotionMax = () => new Date().getFullYear() + 1;
