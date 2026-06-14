// One-time setup: seeds the settings/wedding Firestore document with default
// values (kept in sync with lib/services/settings.ts defaultWeddingSettings).
// Safe to re-run - existing fields are merged, not overwritten if already set
// (uses set with merge, so re-running will reset fields to these defaults;
// edit values in /administrator/settings afterwards instead of re-running).
//
// Usage:
//   node --env-file=.env.local scripts/seedSettings.mjs

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing FIREBASE_ADMIN_* environment variables.");
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

const db = getFirestore();

const defaultWeddingSettings = {
  groomName: "Vihanga",
  brideName: "Sandali",
  weddingDateISO: "2026-08-29T11:00:00+05:30",
  weddingDateDisplay: "2026 අගෝස්තු මස 29 වන දින",
  venueName: "Galle Face Hotel, Colombo",
  venueAddress: "2 Galle Rd, Colombo 00300, Sri Lanka",
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vihanga-sandali.wedding",
  whatsappInvitationTemplate:
    "Dear {{guestName}},\n\n" +
    "We would be delighted to have you celebrate our wedding with us.\n\n" +
    "Please view your invitation here:\n{{invitationLink}}\n\n" +
    "Kindly RSVP through the website.\n\nThank you.",
};

await db.collection("settings").doc("wedding").set(defaultWeddingSettings, { merge: true });

console.log("Seeded settings/wedding with default values.");
