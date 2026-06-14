"use server";

import { revalidatePath } from "next/cache";
import {
  bulkCreateGuests,
  createGuest,
  deleteGuest,
  markGuestInvited,
  updateGuest,
} from "@/lib/services/guests";
import type { GuestSide, NewGuestInput, UpdateGuestInput } from "@/lib/types";

const GUESTS_PATH = "/administrator/guests";

function parseSide(value: FormDataEntryValue | null): GuestSide {
  return value === "bride" ? "bride" : "groom";
}

export async function createGuestAction(formData: FormData) {
  const input: NewGuestInput = {
    name: String(formData.get("name") ?? "").trim(),
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
    side: parseSide(formData.get("side")),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  };

  if (!input.name || !input.phoneNumber) {
    throw new Error("Name and phone number are required");
  }

  await createGuest(input);
  revalidatePath(GUESTS_PATH);
  revalidatePath("/administrator/dashboard");
  revalidatePath("/administrator/analytics");
}

export async function updateGuestAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing guest id");

  const input: UpdateGuestInput = {
    name: String(formData.get("name") ?? "").trim(),
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
    side: parseSide(formData.get("side")),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  };

  if (!input.name || !input.phoneNumber) {
    throw new Error("Name and phone number are required");
  }

  await updateGuest(id, input);
  revalidatePath(GUESTS_PATH);
  revalidatePath("/administrator/dashboard");
  revalidatePath("/administrator/analytics");
}

export async function deleteGuestAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing guest id");

  await deleteGuest(id);
  revalidatePath(GUESTS_PATH);
  revalidatePath("/administrator/dashboard");
  revalidatePath("/administrator/analytics");
}

export async function markInvitedAction(id: string) {
  await markGuestInvited(id);
  revalidatePath(GUESTS_PATH);
  revalidatePath("/administrator/dashboard");
}

/**
 * Bulk import accepts an array of guest rows (e.g. parsed from CSV on the client).
 */
export async function bulkImportAction(guests: NewGuestInput[]) {
  const valid = guests.filter((guest) => guest.name && guest.phoneNumber);
  if (valid.length === 0) {
    throw new Error("No valid guest rows found");
  }

  const count = await bulkCreateGuests(valid);
  revalidatePath(GUESTS_PATH);
  revalidatePath("/administrator/dashboard");
  revalidatePath("/administrator/analytics");
  return count;
}
