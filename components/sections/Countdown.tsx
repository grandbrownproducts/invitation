"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Clock3, Hourglass, Sparkle, TimerIcon } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { siteConfig } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const UNITS: Array<{
  key: "days" | "hours" | "minutes" | "seconds";
  label: string;
  labelSi: string;
  icon: typeof CalendarHeart;
  accent: string;
}> = [
  { key: "days", label: "Days", labelSi: "දින", icon: CalendarHeart, accent: "from-blush to-blush-deep" },
  { key: "hours", label: "Hours", labelSi: "පැය", icon: Clock3, accent: "from-sage to-sage-deep" },
  { key: "minutes", label: "Minutes", labelSi: "මිනිත්තු", icon: Hourglass, accent: "from-lilac to-lilac-deep" },
  { key: "seconds", label: "Seconds", labelSi: "තප්පර", icon: TimerIcon, accent: "from-gold-light to-gold" },
];

export default function Countdown() {
  const time = useCountdown(siteConfig.weddingDateISO);
  const isOver = time.total <= 0;

  return (
    <section className="relative px-6 py-20">
      <SectionHeading
        eyebrow="The Big Day"
        title={isOver ? "We're Married!" : "Counting Down To Our Wedding"}
        subtitle={`${siteConfig.weddingDateDisplay} • ${siteConfig.weddingTimeDisplay}`}
        icon={Sparkle}
        iconClassName="bg-gradient-to-br from-gold to-rose-gold"
      />

      <Reveal className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        {UNITS.map(({ key, label, labelSi, icon: Icon, accent }) => (
          <div
            key={key}
            className="glass flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-6 text-center shadow-lg"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow-md`}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <motion.span
              key={time[key]}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-4xl font-bold text-maroon sm:text-5xl"
              aria-hidden="true"
            >
              {String(time[key]).padStart(2, "0")}
            </motion.span>
            <span className="font-sinhala text-sm text-rose-gold sm:text-base">{labelSi}</span>
            <span className="sr-only">
              {time[key]} {label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
