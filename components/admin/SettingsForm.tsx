"use client";

import { useState } from "react";
import { Save, Loader2, Check } from "lucide-react";
import type { WeddingSettings } from "@/lib/types";
import { updateSettingsAction } from "@/app/administrator/(protected)/settings/actions";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}

export default function SettingsForm({ settings }: { settings: WeddingSettings }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setSaved(false);
    try {
      await updateSettingsAction(formData);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Groom's Name" name="groomName" defaultValue={settings.groomName} />
        <Field label="Bride's Name" name="brideName" defaultValue={settings.brideName} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Wedding Date (ISO, e.g. 2026-08-29T11:00:00+05:30)"
          name="weddingDateISO"
          defaultValue={settings.weddingDateISO}
        />
        <Field
          label="Wedding Date (Display)"
          name="weddingDateDisplay"
          defaultValue={settings.weddingDateDisplay}
        />
      </div>

      <Field label="Venue Name" name="venueName" defaultValue={settings.venueName} />
      <Field label="Venue Address" name="venueAddress" defaultValue={settings.venueAddress} />
      <Field label="Website URL" name="websiteUrl" defaultValue={settings.websiteUrl} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="whatsappInvitationTemplate" className="text-sm font-medium text-gray-700">
          WhatsApp Invitation Template
        </label>
        <p className="text-xs text-gray-500">
          Placeholders: {"{{guestName}}"}, {"{{coupleNames}}"}, {"{{weddingDate}}"}, {"{{invitationLink}}"}
        </p>
        <textarea
          id="whatsappInvitationTemplate"
          name="whatsappInvitationTemplate"
          defaultValue={settings.whatsappInvitationTemplate}
          rows={6}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-maroon-deep shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? "Saved" : "Save Settings"}
      </button>
    </form>
  );
}
