import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const { idToken } = await request.json();

  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!decoded.admin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const sessionCookie = await createSessionCookie(idToken);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
