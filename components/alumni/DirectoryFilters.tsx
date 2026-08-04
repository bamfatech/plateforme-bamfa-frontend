"use client";

import { SECTOR_OPTIONS } from "@/content/alumni";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import type { DirectoryFilters as Filters } from "@/lib/alumni/types";

interface Props {
  values: Filters;
  onChange: (values: Filters) => void;
}

export function DirectoryFilters({ values, onChange }: Props) {
  function set(champ: keyof Filters, valeur: string) {
    // Tout changement de filtre ramène à la première page : rester sur la
    // page 3 d'un résultat qui n'en a plus qu'une afficherait un vide trompeur.
    onChange({ ...values, [champ]: valeur, page: 1 });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Field
        label="Rechercher"
        placeholder="Nom, organisation, poste"
        value={values.search ?? ""}
        onChange={(e) => set("search", e.target.value)}
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
        placeholder="Tous les secteurs"
        value={values.secteur ?? ""}
        onChange={(e) => set("secteur", e.target.value)}
      />
      <Field
        label="Pays"
        placeholder="Tous"
        value={values.pays ?? ""}
        onChange={(e) => set("pays", e.target.value)}
      />
    </div>
  );
}
