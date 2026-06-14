"use server";

import { revalidatePath } from "next/cache";
import { updateWeddingSettings } from "@/lib/services/settings";
import type { WeddingSettings } from "@/lib/types";

export async function updateSettingsAction(formData: FormData) {
  const settings: WeddingSettings = {
    groomName: String(formData.get("groomName") ?? "").trim(),
    brideName: String(formData.get("brideName") ?? "").trim(),
    weddingDateISO: String(formData.get("weddingDateISO") ?? "").trim(),
    weddingDateDisplay: String(formData.get("weddingDateDisplay") ?? "").trim(),
    venueName: String(formData.get("venueName") ?? "").trim(),
    venueAddress: String(formData.get("venueAddress") ?? "").trim(),
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim(),
    whatsappInvitationTemplate: String(formData.get("whatsappInvitationTemplate") ?? "").trim(),
  };

  await updateWeddingSettings(settings);
  revalidatePath("/administrator/settings");
}
