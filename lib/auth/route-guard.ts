export const SESSION_COOKIE = "bamfa_refresh";

export function shouldRedirectToLogin(
  pathname: string,
  hasSessionCookie: boolean,
): boolean {
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  return isAdmin && !hasSessionCookie;
}
