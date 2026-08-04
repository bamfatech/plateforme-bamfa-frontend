import { ApiError } from "./client";

/** Enveloppe d'erreur normalisée renvoyée par `apps/common/exceptions.py`,
 *  déjà portée par `ApiError.data` — déclarée une seule fois ici plutôt que
 *  recopiée (et castée sans vérification) dans chaque composant qui lit une
 *  erreur API. */
interface ErrorEnvelope {
  error?: {
    details?: Record<string, string[]>;
  };
}

function details(erreur: unknown): Record<string, string[]> | undefined {
  if (!(erreur instanceof ApiError)) return undefined;
  return (erreur.data as ErrorEnvelope | undefined)?.error?.details;
}

/** Premier message porté par un champ donné de l'enveloppe d'erreur, ou
 *  `undefined` si l'erreur n'est pas une `ApiError` ou ne porte rien pour ce
 *  champ — à l'appelant de fournir un repli. */
export function apiFieldError(erreur: unknown, champ: string): string | undefined {
  return details(erreur)?.[champ]?.[0];
}

/** Premier message de chaque champ en erreur, ou `undefined` si l'erreur
 *  n'est pas une `ApiError` ou ne porte aucun détail par champ. */
export function apiFieldErrors(erreur: unknown): Record<string, string> | undefined {
  const champs = details(erreur);
  if (!champs) return undefined;
  const messages: Record<string, string> = {};
  for (const [champ, valeurs] of Object.entries(champs)) {
    if (valeurs?.length) messages[champ] = valeurs[0];
  }
  return messages;
}
