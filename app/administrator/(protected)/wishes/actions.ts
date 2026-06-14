"use server";

import { revalidatePath } from "next/cache";
import { deleteWish } from "@/lib/services/wishes";

export async function deleteWishAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing wish id");

  await deleteWish(id);
  revalidatePath("/administrator/wishes");
  revalidatePath("/");
}
