"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { GuestStats } from "@/lib/types";

export default function InvitationProgressChart({ stats }: { stats: GuestStats }) {
  const data = [
    {
      name: "Invitations",
      Invited: stats.invited,
      "Not Invited": Math.max(stats.total - stats.invited, 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" allowDecimals={false} />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip />
        <Legend />
        <Bar dataKey="Invited" stackId="a" fill="#16a34a" radius={[6, 0, 0, 6]} />
        <Bar dataKey="Not Invited" stackId="a" fill="#d1d5db" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
