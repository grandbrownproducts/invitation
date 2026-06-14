"use server";

import { revalidatePath } from "next/cache";
import { submitGuestRSVP } from "@/lib/services/guests";
import type { ResponseStatus } from "@/lib/types";

export async function submitRSVPAction(
  guestId: string,
  status: "accepted" | "rejected"
): Promise<ResponseStatus> {
  const result = await submitGuestRSVP(guestId, status);
  revalidatePath(`/invitation/${guestId}`);
  revalidatePath("/administrator/dashboard");
  revalidatePath("/administrator/guests");
  revalidatePath("/administrator/analytics");
  return result;
}
