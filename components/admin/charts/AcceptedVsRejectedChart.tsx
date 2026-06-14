"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { GuestStats } from "@/lib/types";

const COLORS = ["#16a34a", "#dc2626", "#d1d5db"];

export default function AcceptedVsRejectedChart({ stats }: { stats: GuestStats }) {
  const data = [
    { name: "Accepted", value: stats.accepted },
    { name: "Declined", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
