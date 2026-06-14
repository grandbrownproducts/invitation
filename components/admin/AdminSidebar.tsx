"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  LogOut,
  HeartHandshake,
  MessageCircleHeart,
} from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/administrator/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/administrator/guests", label: "Guests", icon: Users },
  { href: "/administrator/wishes", label: "Wishes", icon: MessageCircleHeart },
  { href: "/administrator/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/administrator/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white px-4 py-6 lg:w-64">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-maroon-deep">
          <HeartHandshake size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">Admin Dashboard</p>
          <p className="text-xs text-gray-500">Wedding Manager</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-amber-50 text-amber-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </form>
    </aside>
  );
}
