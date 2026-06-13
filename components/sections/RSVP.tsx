"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, HeartCrack, PartyPopper } from "lucide-react";
import { buildAcceptUrl } from "@/lib/whatsapp";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import DeclineModal from "@/components/sections/DeclineModal";

export default function RSVP() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);

  const handleAccept = () => {
    setShowSuccess(true);

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#c9a0a4", "#fffdf6", "#5c1022"],
    });

    window.setTimeout(() => {
      const url = buildAcceptUrl();
      window.open(url, "_blank", "noopener,noreferrer");
      setShowSuccess(false);
    }, 1600);
  };

  return (
    <section id="rsvp" className="relative px-6 py-20">
      <SectionHeading
        eyebrow="Kindly Respond"
        title="Will You Join Us?"
        subtitle="ඔබගේ පැමිණීම තහවුරු කරන්න"
      />

      <Reveal className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
        <motion.button
          type="button"
          onClick={handleAccept}
          whileTap={{ scale: 0.96 }}
          className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-4 font-sinhala text-base font-semibold text-maroon-deep shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Check size={20} aria-hidden="true" />
          සහභාගී වෙමි
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setShowDecline(true)}
          whileTap={{ scale: 0.96 }}
          className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border border-maroon/40 bg-cream px-6 py-4 font-sinhala text-base font-semibold text-maroon shadow-lg transition-transform hover:scale-[1.02]"
        >
          <HeartCrack size={20} aria-hidden="true" />
          සහභාගී විය නොහැක
        </motion.button>
      </Reveal>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="flex flex-col items-center gap-3 rounded-3xl bg-ivory px-8 py-10 text-center shadow-2xl"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold"
              >
                <PartyPopper size={32} />
              </motion.span>
              <p className="font-display text-xl font-semibold text-maroon">Thank You!</p>
              <p className="max-w-xs font-sinhala text-sm text-maroon-deep/80">
                ඔබගේ පිළිතුර WhatsApp හරහා යවමින් සිටී...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDecline && <DeclineModal onClose={() => setShowDecline(false)} />}
    </section>
  );
}
