import type { Guest, WeddingSettings } from "@/lib/types";

/**
 * Builds the personalized invitation link for a guest.
 */
export function buildInvitationLink(settings: WeddingSettings, guestId: string): string {
  return `${settings.websiteUrl.replace(/\/$/, "")}/invitation/${guestId}`;
}

/**
 * Renders the WhatsApp invitation message for a guest from the settings template,
 * replacing {{guestName}}, {{coupleNames}}, {{weddingDate}} and {{invitationLink}}.
 */
export function renderInvitationMessage(guest: Guest, settings: WeddingSettings): string {
  const coupleNames = `${settings.groomName} & ${settings.brideName}`;
  const invitationLink = buildInvitationLink(settings, guest.id);

  return settings.whatsappInvitationTemplate
    .replaceAll("{{guestName}}", guest.name)
    .replaceAll("{{coupleNames}}", coupleNames)
    .replaceAll("{{weddingDate}}", settings.weddingDateDisplay)
    .replaceAll("{{invitationLink}}", invitationLink);
}

/**
 * Builds a wa.me URL with no destination number, so the couple can pick the
 * guest's contact manually before sending.
 */
export function buildInvitationWhatsAppUrl(guest: Guest, settings: WeddingSettings): string {
  return `https://wa.me/?text=${encodeURIComponent(renderInvitationMessage(guest, settings))}`;
}
