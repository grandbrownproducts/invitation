import { adminDb } from "@/lib/firebase/admin";
import { siteConfig } from "@/data/site";
import type { WeddingSettings } from "@/lib/types";

const settingsRef = adminDb.collection("settings").doc("wedding");

export const defaultWeddingSettings: WeddingSettings = {
  groomName: siteConfig.coupleNamesEn.split("&")[0]?.trim() ?? siteConfig.groomName,
  brideName: siteConfig.coupleNamesEn.split("&")[1]?.trim() ?? siteConfig.brideName,
  weddingDateISO: siteConfig.weddingDateISO,
  weddingDateDisplay: siteConfig.weddingDateDisplay,
  venueName: siteConfig.venueNameEn,
  venueAddress: siteConfig.venueAddress,
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vihanga-sandali.wedding",
  whatsappInvitationTemplate:
    "Dear {{guestName}},\n\n" +
    "We would be delighted to have you celebrate our wedding with us.\n\n" +
    "Please view your invitation here:\n{{invitationLink}}\n\n" +
    "Kindly RSVP through the website.\n\nThank you.",
};

export async function getWeddingSettings(): Promise<WeddingSettings> {
  const doc = await settingsRef.get();
  if (!doc.exists) return defaultWeddingSettings;

  const data = doc.data() ?? {};
  return { ...defaultWeddingSettings, ...data };
}

export async function updateWeddingSettings(settings: WeddingSettings): Promise<void> {
  await settingsRef.set(settings, { merge: true });
}
