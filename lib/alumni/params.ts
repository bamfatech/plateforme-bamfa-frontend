type Value = string | number | boolean | null | undefined;

/** Retire les filtres non renseignés : une chaîne vide envoyée à l'API
 *  filtrerait sur « vide » au lieu de ne pas filtrer du tout.
 *
 *  Générique sur `T extends object` (plutôt qu'un alias `Record<string, Value>`
 *  utilisé directement comme type de paramètre) : les interfaces de filtres
 *  (`DirectoryFilters`, `AdminProfileFilters`, ...) n'ont pas de signature
 *  d'index, et TypeScript refuse d'assigner un type nommé sans signature
 *  d'index à un type qui en exige une, même via une contrainte générique. */
export function cleanParams<T extends object>(
  filters: T,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(filters as Record<string, Value>).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  ) as Record<string, string | number | boolean>;
}
