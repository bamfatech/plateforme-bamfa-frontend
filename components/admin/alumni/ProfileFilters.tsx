"use client";

import { SECTOR_OPTIONS, STATUS_OPTIONS } from "@/content/alumni";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import type { AdminProfileFilters } from "@/lib/alumni/types";

const COMPTE_OPTIONS = [
  { value: "true", label: "Avec compte" },
  { value: "false", label: "Sans compte" },
];

const CONSENTEMENT_OPTIONS = [
  { value: "true", label: "Publié dans l'annuaire" },
  { value: "false", label: "Non publié" },
];

/** Convertit la valeur brute d'un `<select>` ("true"/"false"/"") en booléen
 *  ou `undefined`. Ne jamais transmettre la chaîne brute : `cleanParams` ne
 *  retire que `undefined`/`null`/`""`, jamais `false`, donc une chaîne
 *  "false" survivrait comme valeur non vide et inverserait le filtre. */
function toBooleanFilter(valeur: string): boolean | undefined {
  if (valeur === "true") return true;
  if (valeur === "false") return false;
  return undefined;
}

interface Props {
  values: AdminProfileFilters;
  onChange: (values: AdminProfileFilters) => void;
}

export function ProfileFilters({ values, onChange }: Props) {
  function set(champ: "search" | "statut" | "promotion" | "secteur", valeur: string) {
    onChange({ ...values, [champ]: valeur, page: 1 });
  }

  function setBooleanFilter(champ: "a_un_compte" | "consentement", valeur: string) {
    onChange({ ...values, [champ]: toBooleanFilter(valeur), page: 1 });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Field
        label="Rechercher"
        placeholder="Nom, e-mail, organisation"
        value={values.search ?? ""}
        onChange={(e) => set("search", e.target.value)}
      />
      <Select
        label="Statut"
        options={STATUS_OPTIONS}
        placeholder="Tous"
        value={values.statut ?? ""}
        onChange={(e) => set("statut", e.target.value)}
      />
      <Field
        label="Promotion"
        type="number"
        inputMode="numeric"
        placeholder="Toutes"
        value={values.promotion ?? ""}
        onChange={(e) => set("promotion", e.target.value)}
      />
      <Select
        label="Secteur"
        options={SECTOR_OPTIONS}
        placeholder="Tous"
        value={values.secteur ?? ""}
        onChange={(e) => set("secteur", e.target.value)}
      />
      <Select
        label="Compte"
        options={COMPTE_OPTIONS}
        placeholder="Peu importe"
        value={values.a_un_compte === undefined ? "" : String(values.a_un_compte)}
        onChange={(e) => setBooleanFilter("a_un_compte", e.target.value)}
      />
      <Select
        label="Annuaire"
        options={CONSENTEMENT_OPTIONS}
        placeholder="Peu importe"
        value={values.consentement === undefined ? "" : String(values.consentement)}
        onChange={(e) => setBooleanFilter("consentement", e.target.value)}
      />
    </div>
  );
}
