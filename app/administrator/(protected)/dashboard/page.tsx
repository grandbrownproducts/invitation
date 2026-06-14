import {
  Users,
  HeartHandshake,
  Heart,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { getGuestStats } from "@/lib/services/guests";
import StatsCard from "@/components/admin/StatsCard";

export default async function DashboardPage() {
  const stats = await getGuestStats();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your guest list and RSVPs</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard label="Total Guests" value={stats.total} icon={Users} />
        <StatsCard
          label="Groom Side"
          value={stats.groomSide}
          icon={HeartHandshake}
          accentClassName="bg-sage/40"
        />
        <StatsCard
          label="Bride Side"
          value={stats.brideSide}
          icon={Heart}
          accentClassName="bg-blush/60"
        />
        <StatsCard
          label="Invited"
          value={stats.invited}
          icon={Send}
          accentClassName="bg-lilac/50"
        />
        <StatsCard
          label="Accepted"
          value={stats.accepted}
          icon={CheckCircle2}
          accentClassName="bg-sage/40"
        />
        <StatsCard
          label="Rejected"
          value={stats.rejected}
          icon={XCircle}
          accentClassName="bg-rose-gold-light/60"
        />
        <StatsCard
          label="Pending Responses"
          value={stats.pending}
          icon={Clock}
          accentClassName="bg-gold-light/60"
        />
      </div>
    </div>
  );
}
