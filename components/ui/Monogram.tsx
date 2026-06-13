"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
}

/** Animated couple monogram logo: an interlocking "V & S" inside a gold ring. */
export default function Monogram({ className }: MonogramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative flex items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-cream to-gold-light shadow-lg",
        className
      )}
    >
      <motion.div
        className="absolute inset-1 rounded-full border border-gold-soft/70"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <span className="font-script text-2xl text-maroon sm:text-3xl">V &amp; S</span>
    </motion.div>
  );
}
