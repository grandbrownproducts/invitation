import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_MAX_AGE_MS } from "@/lib/auth/constants";

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/auth/constants";

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
