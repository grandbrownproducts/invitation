import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCard({
  label,
  value,
  icon: Icon,
  accentClassName,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  accentClassName?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          accentClassName ?? "bg-amber-50 text-amber-700"
        )}
      >
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
