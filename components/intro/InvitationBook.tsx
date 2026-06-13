"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";

interface InvitationBookProps {
  onOpen: () => void;
}

/**
 * An antique-style wedding invitation book. The cover page flips open
 * (3D page-turn) when tapped, then the whole overlay fades to reveal
 * the invitation underneath.
 */
export default function InvitationBook({ onOpen }: InvitationBookProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-maroon-deep via-maroon to-[#33060f] p-4"
      exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
    >
      <div
        className="relative w-full max-w-md"
        style={{ perspective: "1800px" }}
      >
        {/* Back cover / inner page (revealed after opening) */}
        <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-lg border-4 border-gold-soft bg-gradient-to-br from-cream via-ivory to-gold-light shadow-2xl">
          <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="font-script text-5xl text-rose-gold">Vihanga &amp; Sandali</span>
            <p className="font-sinhala-serif text-xl text-maroon">{siteConfig.invitationLine1}</p>
            <div className="ornament-divider w-2/3 text-sm">29.08.2026</div>
          </div>
        </div>

        {/* Front cover that flips open */}
        <AnimatePresence>
          {!opening && (
            <motion.div
              className="absolute inset-0 origin-left rounded-lg border-4 border-gold bg-gradient-to-br from-maroon via-maroon-deep to-[#260509] shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
              animate={opening ? { rotateY: -150, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -150, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute inset-3 flex flex-col items-center justify-between rounded border border-gold-soft/60 px-6 py-10 text-center">
                <div className="ornament-divider w-1/2 text-xs text-gold-soft">
                  ශ්‍රී සුභ මංගල
                </div>

                <div className="flex flex-col items-center gap-3">
                  <span className="font-sinhala-serif text-2xl text-gold-light sm:text-3xl">
                    {siteConfig.invitationLine1}
                  </span>
                  <span className="font-script text-5xl text-cream sm:text-6xl">
                    {siteConfig.groomName} &amp; {siteConfig.brideName}
                  </span>
                  <span className="font-sinhala text-sm text-gold-light/90 sm:text-base">
                    {siteConfig.weddingDateDisplay}
                  </span>
                </div>

                <motion.button
                  type="button"
                  onClick={handleOpen}
                  className="rounded-full border border-gold bg-gold/10 px-8 py-3 font-sinhala text-base text-gold-light shadow-lg backdrop-blur transition-colors hover:bg-gold/20 sm:text-lg"
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
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
