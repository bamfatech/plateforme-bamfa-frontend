export const SESSION_COOKIE = "bamfa_refresh";

/** Zones qui exigent une session. Le back-office et l'espace alumni. */
export const PROTECTED_PREFIXES = ["/admin", "/espace"] as const;

/** Rôles qui mènent au back-office. Tout autre compte va à l'espace alumni. */
export const STAFF_ROLES = [
  "Administrateur",
  "Secrétaire",
  "Trésorier",
  "Rédacteur de contenu",
] as const;

export function shouldRedirectToLogin(
  pathname: string,
  hasSessionCookie: boolean,
): boolean {
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return isProtected && !hasSessionCookie;
}

/** Page d'atterrissage après connexion, selon le rôle.
 *  Un compte cumulant un rôle staff et le rôle Alumni va au back-office :
 *  c'est la zone la plus capacitaire, et l'annuaire reste accessible depuis là. */
export function landingPathForUser(
  user: { roles: string[]; is_superuser: boolean } | null | undefined,
): "/admin" | "/espace" {
  if (!user) return "/espace";
  if (user.is_superuser) return "/admin";
  return user.roles.some((role) =>
    (STAFF_ROLES as readonly string[]).includes(role),
  )
    ? "/admin"
    : "/espace";
}
