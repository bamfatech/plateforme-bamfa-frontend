export const SESSION_COOKIE = "bamfa_refresh";

export function shouldRedirectToLogin(
  pathname: string,
  hasSessionCookie: boolean,
): boolean {
  return pathname.startsWith("/admin") && !hasSessionCookie;
}
