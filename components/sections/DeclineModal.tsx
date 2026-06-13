"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { declineOtherReason, declineReasons } from "@/data/site";
import { buildDeclineUrl } from "@/lib/whatsapp";

interface DeclineModalProps {
  onClose: () => void;
}

export default function DeclineModal({ onClose }: DeclineModalProps) {
  const [reason, setReason] = useState<string>(declineReasons[0]);
  const [otherText, setOtherText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalReason =
      reason === declineOtherReason ? otherText.trim() || declineOtherReason : reason;
    const url = buildDeclineUrl(finalReason);
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="decline-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-ivory p-6 shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-maroon-deep hover:bg-gold/10"
          >
            <X size={18} />
          </button>

          <h3 id="decline-modal-title" className="font-display text-xl font-semibold text-maroon">
            We&apos;ll Miss You
          </h3>
          <p className="mt-1 font-sinhala text-sm text-maroon-deep/80">
            කරුණාකර ඔබ සහභාගී විය නොහැකි වීමට හේතුව තෝරන්න.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-sinhala text-sm text-rose-gold">හේතුව</span>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-12 rounded-xl border border-gold/40 bg-cream px-4 py-3 font-sinhala text-maroon-deep focus:border-gold focus:outline-none"
              >
                {declineReasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            {reason === declineOtherReason && (
              <label className="flex flex-col gap-2">
                <span className="font-sinhala text-sm text-rose-gold">විස්තර කරන්න</span>
                <textarea
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  rows={3}
                  required
                  placeholder="Please share your reason..."
                  className="min-h-24 resize-none rounded-xl border border-gold/40 bg-cream px-4 py-3 font-sinhala text-maroon-deep placeholder:text-maroon-deep/50 focus:border-gold focus:outline-none"
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-maroon px-6 py-3 font-sinhala text-base font-medium text-cream transition-colors hover:bg-maroon-deep"
            >
              යවන්න (Send via WhatsApp)
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
