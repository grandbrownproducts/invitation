import { adminAuth } from "@/lib/firebase/admin";

export const SESSION_COOKIE_NAME = "__session";

// 5 days, matches the max allowed by Firebase session cookies.
export const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000;

export async function createSessionCookie(idToken: string): Promise<string> {
  return adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS });
}

export interface AdminSession {
  uid: string;
  email: string | undefined;
}

/**
 * Verifies the session cookie and confirms the user has the `admin` custom claim.
 * Returns null if the cookie is missing, invalid, expired, or not an admin.
 */
export async function verifyAdminSession(sessionCookie: string | undefined): Promise<AdminSession | null> {
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decoded.admin) return null;
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}
