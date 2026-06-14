"use server";

import { revalidatePath } from "next/cache";
import { createWish } from "@/lib/services/wishes";
import type { Wish } from "@/lib/types";

export async function submitWishAction(name: string, message: string): Promise<Wish> {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedMessage) {
    throw new Error("Name and message are required");
  }

  const wish = await createWish({ name: trimmedName, message: trimmedMessage });
  revalidatePath("/");
  revalidatePath("/administrator/wishes");
  return wish;
}
