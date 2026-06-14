import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuestById } from "@/lib/services/guests";
import HomeExperience from "@/components/HomeExperience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guestId: string }>;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = await getGuestById(guestId);

  return {
    title: guest
      ? `${guest.name}, You're Invited! | විහඟ ❤️ සඳලි`
      : "You're Invited | විහඟ ❤️ සඳලි",
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ guestId: string }>;
}) {
  const { guestId } = await params;
  const guest = await getGuestById(guestId);

  if (!guest) {
    notFound();
  }

  return (
    <HomeExperience
      guest={{ id: guest.id, name: guest.name, responseStatus: guest.responseStatus }}
    />
  );
}
