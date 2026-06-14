import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuestById } from "@/lib/services/guests";
import { getWeddingSettings } from "@/lib/services/settings";
import Monogram from "@/components/ui/Monogram";
import InvitationRSVP from "@/app/invitation/[guestId]/InvitationRSVP";

export const metadata: Metadata = {
  title: "You're Invited | Vihanga & Sandali Wedding",
};

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

  const settings = await getWeddingSettings();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16 text-center">
      <Monogram className="h-24 w-24 sm:h-28 sm:w-28" />

      <p className="mt-8 font-sinhala text-sm uppercase tracking-[0.2em] text-rose-gold">
        You&apos;re Invited
      </p>

      <h1 className="mt-3 font-display text-3xl font-semibold text-maroon sm:text-4xl">
        {settings.groomName} &amp; {settings.brideName}
      </h1>

      <div className="ornament-divider mt-4 w-32 sm:w-40" aria-hidden="true">
        <span className="text-lg">❀</span>
      </div>

      <p className="mt-6 font-sinhala text-lg text-maroon-deep/90">Dear {guest.name},</p>

      <p className="mx-auto mt-3 max-w-md font-sinhala text-base text-maroon-deep/80">
        ඔබව අපගේ විවාහ මංගල්‍යයට සහභාගී වන මෙන් ආරාධනා කරමු.
      </p>

      <div className="mt-6 flex flex-col gap-1 text-sm text-maroon-deep/80">
        <p className="font-medium text-maroon">{settings.weddingDateDisplay}</p>
        <p>{settings.venueName}</p>
        <p className="text-maroon-deep/60">{settings.venueAddress}</p>
      </div>

      <InvitationRSVP guestId={guest.id} initialStatus={guest.responseStatus} />
    </main>
  );
}
