// One-time setup: grants the `admin` custom claim to a Firebase Auth user so
// they can sign in to /administrator.
//
// Usage:
//   node --env-file=.env.local scripts/setAdminClaim.mjs <uid-or-email>

import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const identifier = process.argv[2];

if (!identifier) {
  console.error("Usage: node --env-file=.env.local scripts/setAdminClaim.mjs <uid-or-email>");
  process.exit(1);
}

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing FIREBASE_ADMIN_* environment variables.");
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

const auth = getAuth();

const user = identifier.includes("@")
  ? await auth.getUserByEmail(identifier)
  : await auth.getUser(identifier);

await auth.setCustomUserClaims(user.uid, { admin: true });

console.log(`Granted admin claim to ${user.email ?? user.uid} (${user.uid}).`);
console.log("The user must sign in again for the new claim to take effect.");
