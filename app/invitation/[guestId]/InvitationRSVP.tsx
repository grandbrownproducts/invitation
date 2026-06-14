"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, HeartCrack, PartyPopper, Loader2 } from "lucide-react";
import type { ResponseStatus } from "@/lib/types";
import { submitRSVPAction } from "@/app/invitation/[guestId]/actions";

export default function InvitationRSVP({
  guestId,
  initialStatus,
}: {
  guestId: string;
  initialStatus: ResponseStatus;
}) {
  const [status, setStatus] = useState<ResponseStatus>(initialStatus);
  const [loading, setLoading] = useState<"accepted" | "rejected" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleRespond(choice: "accepted" | "rejected") {
    setLoading(choice);
    try {
      const result = await submitRSVPAction(guestId, choice);
      setStatus(result);

      if (result === "accepted") {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#c9a0a4", "#fffdf6", "#5c1022"],
        });
      }

      setShowSuccess(true);
      window.setTimeout(() => setShowSuccess(false), 2200);
    } finally {
      setLoading(null);
    }
  }

  if (status !== "pending") {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-3xl border border-gold/20 bg-ivory px-6 py-8 text-center shadow-lg">
        <p className="font-display text-lg font-semibold text-maroon">
          {status === "accepted" ? "Thank you for accepting!" : "Thank you for letting us know"}
        </p>
        <p className="mt-2 font-sinhala text-sm text-maroon-deep/80">
          {status === "accepted"
            ? "ඔබගේ පැමිණීම තහවුරු කර ඇත. අපි ඔබව බලාපොරොත්තුවෙන් සිටිමු!"
            : "ඔබගේ පිළිතුර ලැබුණි. සහභාගී විය නොහැකි වීම ගැන කනගාටුයි."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
      <motion.button
        type="button"
        onClick={() => handleRespond("accepted")}
        disabled={loading !== null}
        whileTap={{ scale: 0.96 }}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-4 font-sinhala text-base font-semibold text-maroon-deep shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {loading === "accepted" ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} aria-hidden="true" />}
        සහභාගී වෙමි
      </motion.button>

      <motion.button
        type="button"
        onClick={() => handleRespond("rejected")}
        disabled={loading !== null}
        whileTap={{ scale: 0.96 }}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border border-rose-gold/50 bg-gradient-to-r from-blush to-rose-gold-light px-6 py-4 font-sinhala text-base font-semibold text-maroon shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {loading === "rejected" ? <Loader2 size={20} className="animate-spin" /> : <HeartCrack size={20} aria-hidden="true" />}
        සහභාගී විය නොහැක
      </motion.button>

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
                ඔබගේ පිළිතුර සටහන් කර ගන්නා ලදී.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
