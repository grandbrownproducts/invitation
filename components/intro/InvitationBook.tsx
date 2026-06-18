"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { playBackgroundAudio } from "@/lib/audio";

interface InvitationBookProps {
  onOpen: () => void;
}

const SPARKLES = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * 360;
  const rad = (angle * Math.PI) / 180;
  const distance = 90 + (i % 3) * 40;
  return {
    id: i,
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
    delay: (i % 6) * 0.03,
    size: 10 + (i % 3) * 6,
    glyph: i % 2 === 0 ? "✨" : "❀",
  };
});

/**
 * The invitation cover card. Tapping "ආරාධනය විවෘත කරන්න" flips the card
 * open in 3D with a sparkle burst, then fades to reveal the site.
 */
export default function InvitationBook({ onOpen }: InvitationBookProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    void playBackgroundAudio();
    window.setTimeout(onOpen, 1300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-maroon-deep via-maroon to-[#260509] p-4"
      exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
    >
      {/* Ambient glow */}
      <span aria-hidden="true" className="bg-orb h-[26rem] w-[26rem] bg-gold opacity-40" />

      <div
        className="relative w-full max-w-sm"
        style={{ aspectRatio: "3 / 4.2", perspective: "1800px" }}
      >
        {/* Sparkle burst on open */}
        <div className="absolute left-1/2 top-1/2">
          <AnimatePresence>
            {opening &&
              SPARKLES.map((s) => (
                <motion.span
                  key={`spark-${s.id}`}
                  aria-hidden="true"
                  className="absolute left-0 top-0 select-none text-gold"
                  style={{ fontSize: s.size }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
                  animate={{ x: s.x, y: s.y, opacity: 0, scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
                >
                  {s.glyph}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        {/* Invitation cover card */}
        <motion.div
          className="absolute inset-0 origin-center rounded-2xl border-4 border-gold bg-gradient-to-br from-maroon via-maroon-deep to-[#260509] shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
          animate={opening ? { rotateY: -110, opacity: 0, scale: 0.85 } : { rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="absolute inset-3 flex flex-col items-center justify-between rounded border border-gold-soft/60 px-6 py-10 text-center">
            <div className="ornament-divider w-1/2 text-xs text-gold-soft">ශ්‍රී සුබ මංගලම්</div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-sinhala-serif text-2xl text-gold-light sm:text-3xl">
                {siteConfig.invitationLine1}
              </span>
              <span className="font-sinhala-serif text-4xl text-gold sm:text-5xl">
                {siteConfig.groomName} &amp; {siteConfig.brideName}
              </span>
              <span className="font-sinhala text-sm text-gold-light/90 sm:text-base">
                {siteConfig.weddingDateDisplay}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={handleOpen}
              className="rounded-full border border-gold bg-gold/10 px-8 py-3 font-sinhala text-base text-gold-light shadow-lg transition-colors hover:bg-gold/20 sm:text-lg"
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(212,175,55,0.3)",
                  "0 0 24px rgba(212,175,55,0.6)",
                  "0 0 0px rgba(212,175,55,0.3)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-label="ආරාධනය විවෘත කරන්න (Open invitation)"
            >
              ආරාධනය විවෘත කරන්න
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
