import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type {
  Guest,
  GuestStats,
  NewGuestInput,
  ResponseStatus,
  UpdateGuestInput,
} from "@/lib/types";

const guestsCollection = adminDb.collection("guests");

function toGuest(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot): Guest {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    name: data.name ?? "",
    phoneNumber: data.phoneNumber ?? "",
    side: data.side ?? "groom",
    invitationStatus: data.invitationStatus ?? "not_invited",
    responseStatus: data.responseStatus ?? "pending",
    invitedAt: data.invitedAt?.toDate?.().toISOString(),
    respondedAt: data.respondedAt?.toDate?.().toISOString(),
    notes: data.notes ?? undefined,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? new Date(0).toISOString(),
  };
}

export async function getAllGuests(): Promise<Guest[]> {
  const snapshot = await guestsCollection.orderBy("createdAt", "desc").get();
  return snapshot.docs.map(toGuest);
}

export async function getGuestById(id: string): Promise<Guest | null> {
  const doc = await guestsCollection.doc(id).get();
  if (!doc.exists) return null;
  return toGuest(doc);
}

export async function createGuest(input: NewGuestInput): Promise<Guest> {
  const notes = input.notes?.trim();
  const ref = await guestsCollection.add({
    name: input.name.trim(),
    phoneNumber: input.phoneNumber.trim(),
    side: input.side,
    ...(notes ? { notes } : {}),
    invitationStatus: "not_invited",
    responseStatus: "pending",
    createdAt: FieldValue.serverTimestamp(),
  });
  const doc = await ref.get();
  return toGuest(doc);
}

export async function updateGuest(id: string, input: UpdateGuestInput): Promise<void> {
  const update: Record<string, unknown> = {};
  if (input.name !== undefined) update.name = input.name.trim();
  if (input.phoneNumber !== undefined) update.phoneNumber = input.phoneNumber.trim();
  if (input.side !== undefined) update.side = input.side;
  if (input.notes !== undefined) {
    const notes = input.notes.trim();
    update.notes = notes ? notes : FieldValue.delete();
  }

  await guestsCollection.doc(id).update(update);
}

export async function deleteGuest(id: string): Promise<void> {
  await guestsCollection.doc(id).delete();
}

export async function bulkCreateGuests(guests: NewGuestInput[]): Promise<number> {
  const batch = adminDb.batch();
  for (const guest of guests) {
    const ref = guestsCollection.doc();
    const notes = guest.notes?.trim();
    batch.set(ref, {
      name: guest.name.trim(),
      phoneNumber: guest.phoneNumber.trim(),
      side: guest.side,
      ...(notes ? { notes } : {}),
      invitationStatus: "not_invited",
      responseStatus: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
  return guests.length;
}

export async function markGuestInvited(id: string): Promise<void> {
  await guestsCollection.doc(id).update({
    invitationStatus: "invited",
    invitedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * Records a guest's RSVP. If the guest has already responded, the existing
 * status is returned without being overwritten (prevents duplicate submissions).
 */
export async function submitGuestRSVP(
  id: string,
  status: "accepted" | "rejected"
): Promise<ResponseStatus> {
  const ref = guestsCollection.doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error("Guest not found");
  }

  const existingStatus: ResponseStatus = doc.data()?.responseStatus ?? "pending";
  if (existingStatus !== "pending") {
    return existingStatus;
  }

  await ref.update({
    responseStatus: status,
    respondedAt: FieldValue.serverTimestamp(),
  });
  return status;
}

export async function getGuestStats(): Promise<GuestStats> {
  const guests = await getAllGuests();

  return guests.reduce<GuestStats>(
    (stats, guest) => {
      stats.total += 1;
      if (guest.side === "groom") stats.groomSide += 1;
      else stats.brideSide += 1;

      if (guest.invitationStatus === "invited") stats.invited += 1;

      if (guest.responseStatus === "accepted") stats.accepted += 1;
      else if (guest.responseStatus === "rejected") stats.rejected += 1;
      else stats.pending += 1;

      return stats;
    },
    { total: 0, groomSide: 0, brideSide: 0, invited: 0, accepted: 0, rejected: 0, pending: 0 }
  );
}
