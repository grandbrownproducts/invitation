import { getAllGuests } from "@/lib/services/guests";
import { getWeddingSettings } from "@/lib/services/settings";
import GuestTable from "@/components/admin/GuestTable";

export default async function GuestsPage() {
  const [guests, settings] = await Promise.all([getAllGuests(), getWeddingSettings()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Guests</h1>
        <p className="text-sm text-gray-500">
          Manage your guest list, send invitations, and track responses
        </p>
      </div>

      <GuestTable guests={guests} settings={settings} />
    </div>
  );
}
