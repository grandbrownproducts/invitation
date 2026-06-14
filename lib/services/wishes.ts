import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { Wish } from "@/lib/types";

const wishesCollection = adminDb.collection("wishes");

function toWish(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot): Wish {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    name: data.name ?? "",
    message: data.message ?? "",
    createdAt: data.createdAt?.toDate?.().toISOString() ?? new Date(0).toISOString(),
  };
}

export async function getAllWishes(): Promise<Wish[]> {
  const snapshot = await wishesCollection.orderBy("createdAt", "asc").get();
  return snapshot.docs.map(toWish);
}

export async function createWish(input: { name: string; message: string }): Promise<Wish> {
  const docRef = await wishesCollection.add({
    name: input.name,
    message: input.message,
    createdAt: FieldValue.serverTimestamp(),
  });
  const doc = await docRef.get();
  return toWish(doc);
}

export async function deleteWish(id: string): Promise<void> {
  await wishesCollection.doc(id).delete();
}
