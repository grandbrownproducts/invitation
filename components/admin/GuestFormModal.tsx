"use client";

import { useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import type { Guest } from "@/lib/types";
import { createGuestAction, updateGuestAction } from "@/app/administrator/(protected)/guests/actions";

export default function GuestFormModal({
  guest,
  trigger,
}: {
  guest?: Guest;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = Boolean(guest);

  async function handleSubmit(formData: FormData) {
    setError(null);
    try {
      if (isEdit) {
        await updateGuestAction(formData);
      } else {
        await createGuestAction(formData);
      }
      setOpen(false);
      formRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>

      {open && (
        <div className="admin-area fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {isEdit ? "Edit Guest" : "Add Guest"}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
              {isEdit && <input type="hidden" name="id" value={guest!.id} />}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  defaultValue={guest?.name}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  defaultValue={guest?.phoneNumber}
                  placeholder="+94 7X XXX XXXX"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="side" className="text-sm font-medium text-gray-700">
                  Side
                </label>
                <select
                  id="side"
                  name="side"
                  defaultValue={guest?.side ?? "groom"}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  <option value="groom">Groom&apos;s Side</option>
                  <option value="bride">Bride&apos;s Side</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  defaultValue={guest?.notes}
                  rows={2}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-gold-soft to-gold px-6 py-2.5 text-sm font-semibold text-maroon-deep shadow-md transition-transform hover:scale-[1.02]"
                >
                  {isEdit ? "Save Changes" : "Add Guest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
