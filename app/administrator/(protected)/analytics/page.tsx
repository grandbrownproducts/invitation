import { getGuestStats } from "@/lib/services/guests";
import AcceptedVsRejectedChart from "@/components/admin/charts/AcceptedVsRejectedChart";
import GroomVsBrideChart from "@/components/admin/charts/GroomVsBrideChart";
import InvitationProgressChart from "@/components/admin/charts/InvitationProgressChart";

export default async function AnalyticsPage() {
  const stats = await getGuestStats();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Guest list and RSVP insights</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-900">Accepted vs Declined</h2>
          <AcceptedVsRejectedChart stats={stats} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold text-gray-900">Groom&apos;s Side vs Bride&apos;s Side</h2>
          <GroomVsBrideChart stats={stats} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-2 text-sm font-semibold text-gray-900">Invitation Progress</h2>
          <InvitationProgressChart stats={stats} />
        </div>
      </div>
    </div>
  );
}
