import { getWeddingSettings } from "@/lib/services/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const settings = await getWeddingSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Wedding details and WhatsApp invitation message template
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
