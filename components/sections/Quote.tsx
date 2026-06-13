"use client";

import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function Quote() {
  return (
    <section className="relative px-6 py-16">
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage to-lilac text-white shadow-lg" aria-hidden="true">
          <Flower2 size={22} />
        </span>
        <span aria-hidden="true" className="font-script text-6xl text-gold">
          “
        </span>
        <p className="font-sinhala-serif text-xl italic leading-relaxed text-maroon sm:text-2xl">
          දෙදෙනෙකුගේ ආත්ම දෙකක් එක්වීම, ලෝකයේ සියලු සුන්දරත්වයන්ට වඩා මහඟු සිදුවීමකි.
        </p>
        <footer className="font-display text-sm uppercase tracking-[0.3em] text-rose-gold">
          With Love, Vihanga &amp; Sandali
        </footer>
      </motion.blockquote>
    </section>
  );
}
