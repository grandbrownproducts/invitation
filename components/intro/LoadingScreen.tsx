"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  progressLabel?: string;
}

/**
 * Full-screen luxury loading state shown before the invitation book appears.
 * Soft golden particles drift upward while a monogram pulses gently.
 */
export default function LoadingScreen({ progressLabel = "ආරාධනාව සූදානම් වෙමින්..." }: LoadingScreenProps) {
  const particles = Array.from({ length: 22 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-maroon-deep via-maroon to-[#2a070f]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((i) => {
          const left = (i * 41) % 100;
          const size = 2 + (i % 4);
          const duration = 6 + (i % 6);
          const delay = (i * 0.4) % 5;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gold-soft"
              style={{ left: `${left}%`, width: size, height: size, bottom: "-5%" }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.9, 0], y: "-100vh" }}
              transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6 px-6 text-center"
      >
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold text-3xl text-gold-soft sm:h-28 sm:w-28"
          animate={{ boxShadow: [
            "0 0 0px rgba(212,175,55,0.4)",
            "0 0 30px rgba(212,175,55,0.8)",
            "0 0 0px rgba(212,175,55,0.4)",
          ] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-script text-4xl sm:text-5xl">V&amp;S</span>
        </motion.div>

        <p className="font-sinhala-serif text-lg text-gold-light sm:text-xl">
          {progressLabel}
        </p>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-gold"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
