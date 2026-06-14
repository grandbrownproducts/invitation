"use client";

import { useState, type ReactNode } from "react";
import { X, Upload } from "lucide-react";
import type { GuestSide, NewGuestInput } from "@/lib/types";
import { bulkImportAction } from "@/app/administrator/(protected)/guests/actions";

function parseCsv(text: string): NewGuestInput[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.toLowerCase().startsWith("name,")) // skip header row
    .map((line) => {
      const [name = "", phoneNumber = "", side = "", notes = ""] = line
        .split(",")
        .map((cell) => cell.trim());

      return {
        name,
        phoneNumber,
        side: (side.toLowerCase() === "bride" ? "bride" : "groom") as GuestSide,
        notes: notes || undefined,
      };
    });
}

export default function BulkImportModal({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleImport() {
    setError(null);
    setResult(null);

    const guests = parseCsv(csvText);
    if (guests.length === 0) {
      setError("Paste at least one row in the format: name,phoneNumber,side,notes");
      return;
    }

    setLoading(true);
    try {
      const count = await bulkImportAction(guests);
      setResult(`Imported ${count} guest${count === 1 ? "" : "s"} successfully.`);
      setCsvText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      {open && (
        <div className="admin-area fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Bulk Import Guests</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-2 text-sm text-gray-600">
              Paste CSV rows: <code className="rounded bg-gray-100 px-1.5 py-0.5">name,phoneNumber,side,notes</code>
              <br />
              <code className="rounded bg-gray-100 px-1.5 py-0.5">side</code> should be{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5">groom</code> or{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5">bride</code>. Notes are optional.
            </p>

            <textarea
              value={csvText}
              onChange={(event) => setCsvText(event.target.value)}
              rows={8}
              placeholder={"Nimal Perera,+94771234567,groom,College friend\nKamala Silva,+94777654321,bride,"}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />

            {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
            {result && <p className="mt-2 text-sm font-medium text-green-700">{result}</p>}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-soft to-gold px-6 py-2.5 text-sm font-semibold text-maroon-deep shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                <Upload size={16} />
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
