"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { GuestStats } from "@/lib/types";

const COLORS = ["#2563eb", "#ec4899"];

export default function GroomVsBrideChart({ stats }: { stats: GuestStats }) {
  const data = [
    { name: "Groom's Side", value: stats.groomSide },
    { name: "Bride's Side", value: stats.brideSide },
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
