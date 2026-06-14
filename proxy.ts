import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

/**
 * Lightweight gate for the admin area: redirects to the login page if no
 * session cookie is present. Full verification (signature, expiry, admin
 * claim) happens in app/administrator/layout.tsx.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/administrator/login") {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/administrator/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/administrator/:path*",
};
