"use client";

import { useMemo, useState } from "react";
import { Plus, Upload, Pencil, Trash2, Search, ArrowUpDown } from "lucide-react";
import type { Guest, GuestSide, WeddingSettings } from "@/lib/types";
import { deleteGuestAction } from "@/app/administrator/(protected)/guests/actions";
import GuestFormModal from "@/components/admin/GuestFormModal";
import BulkImportModal from "@/components/admin/BulkImportModal";
import WhatsAppInviteButton from "@/components/admin/WhatsAppInviteButton";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

type SideFilter = "all" | GuestSide;

function StatusBadge({ children, tone }: { children: React.ReactNode; tone: "neutral" | "good" | "bad" | "info" }) {
  const toneClasses: Record<typeof tone, string> = {
    neutral: "bg-gray-100 text-gray-700",
    good: "bg-green-100 text-green-800",
    bad: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", toneClasses[tone])}>
      {children}
    </span>
  );
}

export default function GuestTable({
  guests,
  settings,
}: {
  guests: Guest[];
  settings: WeddingSettings;
}) {
  const [search, setSearch] = useState("");
  const [sideFilter, setSideFilter] = useState<SideFilter>("all");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = guests.filter((guest) => {
      const matchesSearch =
        !term ||
        guest.name.toLowerCase().includes(term) ||
        guest.phoneNumber.toLowerCase().includes(term);
      const matchesSide = sideFilter === "all" || guest.side === sideFilter;
      return matchesSearch && matchesSide;
    });

    result.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return result;
  }, [guests, search, sideFilter, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateFilter<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => updateFilter(setSearch, event.target.value)}
              placeholder="Search by name or phone"
              className="w-full rounded-lg border border-gray-300 bg-white px-9 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <select
            value={sideFilter}
            onChange={(event) => updateFilter(setSideFilter, event.target.value as SideFilter)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option value="all">All Sides</option>
            <option value="groom">Groom&apos;s Side</option>
            <option value="bride">Bride&apos;s Side</option>
          </select>

          <button
            type="button"
            onClick={() => setSortAsc((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition-colors hover:border-gray-400"
          >
            <ArrowUpDown size={15} />
            Name {sortAsc ? "A-Z" : "Z-A"}
          </button>
        </div>

        <div className="flex gap-2">
          <BulkImportModal
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
              >
                <Upload size={15} />
                Bulk Import
              </button>
            }
          />
          <GuestFormModal
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-maroon-deep shadow-md transition-transform hover:scale-[1.02]"
              >
                <Plus size={15} />
                Add Guest
              </button>
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Side</th>
              <th className="px-4 py-3">Invitation</th>
              <th className="px-4 py-3">Response</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No guests found.
                </td>
              </tr>
            )}

            {pageItems.map((guest) => (
              <tr key={guest.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{guest.name}</td>
                <td className="px-4 py-3 text-gray-600">{guest.phoneNumber}</td>
                <td className="px-4 py-3">
                  <StatusBadge tone={guest.side === "groom" ? "info" : "neutral"}>
                    {guest.side === "groom" ? "Groom's Side" : "Bride's Side"}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge tone={guest.invitationStatus === "invited" ? "good" : "neutral"}>
                    {guest.invitationStatus === "invited" ? "Invited" : "Not Invited"}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge
                    tone={
                      guest.responseStatus === "accepted"
                        ? "good"
                        : guest.responseStatus === "rejected"
                          ? "bad"
                          : "neutral"
                    }
                  >
                    {guest.responseStatus === "accepted"
                      ? "Accepted"
                      : guest.responseStatus === "rejected"
                        ? "Declined"
                        : "Pending"}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <WhatsAppInviteButton guest={guest} settings={settings} />
                    <GuestFormModal
                      guest={guest}
                      trigger={
                        <button
                          type="button"
                          title="Edit guest"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          <Pencil size={14} />
                        </button>
                      }
                    />
                    <form
                      action={deleteGuestAction}
                      onSubmit={(event) => {
                        if (!window.confirm(`Delete ${guest.name}?`)) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={guest.id} />
                      <button
                        type="submit"
                        title="Delete guest"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-700 transition-colors hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>
            Page {currentPage} of {totalPages} &middot; {filtered.length} guest
            {filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-4 py-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
