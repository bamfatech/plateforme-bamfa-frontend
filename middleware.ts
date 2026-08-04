import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, shouldRedirectToLogin } from "@/lib/auth/route-guard";

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (shouldRedirectToLogin(request.nextUrl.pathname, hasSession)) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Le matcher de Next.js est analysé à la compilation et ne peut pas être
// dérivé de PROTECTED_PREFIXES (constante runtime) : les deux listes sont
// à garder en cohérence manuellement quand une zone protégée est ajoutée.
export const config = {
  matcher: ["/admin/:path*", "/espace/:path*"],
};
