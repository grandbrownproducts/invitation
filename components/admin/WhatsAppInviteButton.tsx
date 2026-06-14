"use client";

import { useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import type { Guest, WeddingSettings } from "@/lib/types";
import { buildInvitationWhatsAppUrl } from "@/lib/whatsappInvite";
import { markInvitedAction } from "@/app/administrator/(protected)/guests/actions";

export default function WhatsAppInviteButton({
  guest,
  settings,
}: {
  guest: Guest;
  settings: WeddingSettings;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      if (guest.invitationStatus !== "invited") {
        await markInvitedAction(guest.id);
      }
      const url = buildInvitationWhatsAppUrl(guest, settings);
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      title="Send WhatsApp invitation"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-700 transition-colors hover:bg-green-100 disabled:opacity-60"
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : <MessageCircle size={15} />}
    </button>
  );
}
