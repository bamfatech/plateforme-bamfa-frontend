import type { components } from "@/lib/api/schema";

type Sector = components["schemas"]["SectorEnum"];
type Gender = components["schemas"]["GenderEnum"];
type ProfileStatusValue = components["schemas"]["StatusFf2Enum"];
type RegistrationStatusValue =
  components["schemas"]["AlumniRegistrationAdminStatusEnum"];

/**
 * Les énumérations ci-dessous sont typées depuis le schéma OpenAPI régénéré
 * (`lib/api/schema.d.ts`, `npm run generate:api`) plutôt que recopiées à la
 * main : un `Record<Sector, string>` (ou équivalent) est la forme qui
 * **échoue à la compilation** si un membre du type manque — le jour où un
 * secteur ou un statut est ajouté côté Django, `npx tsc --noEmit` échoue ici
 * au lieu de laisser silencieusement le <select> concerné en retard.
 */

const SECTOR_LABELS: Record<Sector, string> = {
  agriculture: "Agriculture et agro-industrie",
  sante: "Santé",
  education: "Éducation et formation",
  numerique: "Technologies et numérique",
  finance: "Finance et assurance",
  entrepreneuriat: "Entrepreneuriat et PME",
  energie: "Énergie et environnement",
  industrie: "Industrie et BTP",
  commerce: "Commerce et distribution",
  transport: "Transport et logistique",
  public: "Administration publique",
  ong: "Société civile et ONG",
  culture: "Arts, culture et médias",
  recherche: "Recherche",
  autre: "Autre",
};
export const SECTOR_OPTIONS = (
  Object.entries(SECTOR_LABELS) as [Sector, string][]
).map(([value, label]) => ({ value, label }));

const GENDER_LABELS: Record<Gender, string> = {
  femme: "Femme",
  homme: "Homme",
  autre: "Autre",
  non_precise: "Non précisé",
};
export const GENDER_OPTIONS = (
  Object.entries(GENDER_LABELS) as [Gender, string][]
).map(([value, label]) => ({ value, label }));

const STATUS_LABELS: Record<ProfileStatusValue, string> = {
  actif: "Actif",
  suspendu: "Suspendu",
  archive: "Archivé",
};
export const STATUS_OPTIONS = (
  Object.entries(STATUS_LABELS) as [ProfileStatusValue, string][]
).map(([value, label]) => ({ value, label }));

const REGISTRATION_STATUS_LABELS: Record<RegistrationStatusValue, string> = {
  en_attente: "En attente",
  approuvee: "Approuvée",
  rejetee: "Rejetée",
};
export const REGISTRATION_STATUS_OPTIONS = (
  Object.entries(REGISTRATION_STATUS_LABELS) as [
    RegistrationStatusValue,
    string,
  ][]
).map(([value, label]) => ({ value, label }));

export const PROMOTION_MIN = 2010;
export const promotionMax = () => new Date().getFullYear() + 1;
