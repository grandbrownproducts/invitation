"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FallingItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  emoji: string;
}

const PETAL_EMOJIS = ["\u{1F33A}", "\u{1F338}", "\u{2740}"];
const HEART_EMOJIS = ["\u{1F90D}", "\u{2764}\u{FE0F}"];

function buildItems(count: number, emojis: string[], seedOffset: number): FallingItem[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset;
    return {
      id: seed,
      left: (seed * 37) % 100,
      size: 14 + ((seed * 13) % 18),
      duration: 14 + ((seed * 7) % 12),
      delay: (seed * 1.7) % 10,
      rotate: (seed * 53) % 360,
      emoji: emojis[seed % emojis.length],
    };
  });
}

/**
 * Decorative ambient layer: falling flower petals, floating hearts and
 * golden sparkle particles. Disabled automatically when the user prefers
 * reduced motion.
 */
export default function BackgroundEffects() {
  const shouldReduceMotion = useReducedMotion();

  const petals = useMemo(() => buildItems(10, PETAL_EMOJIS, 1), []);
  const hearts = useMemo(() => buildItems(6, HEART_EMOJIS, 50), []);
  const sparkles = useMemo(() => buildItems(14, ["✨"], 100), []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {petals.map((p) => (
        <motion.span
          key={`petal-${p.id}`}
          className="absolute top-[-5%] select-none"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: p.rotate,
            x: [0, 30, -20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}

      {hearts.map((h) => (
        <motion.span
          key={`heart-${h.id}`}
          className="absolute bottom-[-5%] select-none text-rose-gold"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: "10vh", opacity: 0, scale: 0.6 }}
          animate={{
            y: "-110vh",
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.6, 1, 1, 0.6],
            x: [0, -20, 20, 0],
          }}
          transition={{
            duration: h.duration + 4,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}

      {sparkles.map((s) => (
        <motion.span
          key={`sparkle-${s.id}`}
          className="absolute select-none text-gold"
          style={{ left: `${s.left}%`, top: `${(s.id * 17) % 100}%`, fontSize: s.size * 0.6 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{
            duration: 3 + (s.id % 4),
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </div>
  );
}
