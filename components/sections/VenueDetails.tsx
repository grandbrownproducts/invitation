"use client";

import { CalendarDays, Clock, Landmark, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CallButton from "@/components/ui/CallButton";

export default function VenueDetails() {
  return (
    <section id="venue" className="relative px-6 py-20">
      <SectionHeading
        eyebrow="Where & When"
        title="Event Details"
        subtitle="උත්සව විස්තර"
        icon={Landmark}
        iconClassName="bg-gradient-to-br from-lilac-deep to-rose-gold"
      />

      <Reveal className="mx-auto mt-10 max-w-xl">
        <div className="glass overflow-hidden rounded-3xl shadow-xl">
          <div className="border-b border-gold/30 bg-gold/10 px-6 py-5 text-center">
            <p className="font-sinhala-serif text-2xl font-semibold text-maroon">{siteConfig.venueName}</p>
            <p className="font-display text-sm uppercase tracking-widest text-rose-gold">
              {siteConfig.venueNameEn}
            </p>
          </div>

          <div className="flex flex-col gap-5 px-6 py-6">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush to-blush-deep text-white shadow-sm">
                <CalendarDays size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-sinhala text-sm uppercase tracking-wide text-rose-gold">දිනය</p>
                <p className="font-sinhala-serif text-lg text-maroon-deep">{siteConfig.weddingDateDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage to-sage-deep text-white shadow-sm">
                <Clock size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-sinhala text-sm uppercase tracking-wide text-rose-gold">වෙලාව</p>
                <p className="font-sinhala-serif text-lg text-maroon-deep">{siteConfig.weddingTimeDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-white shadow-sm">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-sinhala text-sm uppercase tracking-wide text-rose-gold">ස්ථානය</p>
                <p className="font-sinhala-serif text-lg text-maroon-deep">{siteConfig.venueName}</p>
                <p className="font-body text-sm text-maroon-deep/70">{siteConfig.venueAddress}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 px-6 pb-6 sm:grid-cols-2">
            <a
              href={siteConfig.venueMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold bg-gold/10 px-4 py-3 font-sinhala text-sm font-medium text-maroon transition-colors hover:bg-gold/20"
            >
              <MapPin size={18} aria-hidden="true" />
              සිතියම බලන්න
            </a>
            <CallButton phone={siteConfig.venuePhone} phoneDisplay={siteConfig.venuePhoneDisplay} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
