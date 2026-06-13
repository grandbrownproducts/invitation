"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import Monogram from "@/components/ui/Monogram";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/* Decorative floral corners */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-2 top-2 text-4xl text-gold/60 sm:left-6 sm:top-6 sm:text-6xl">❀</span>
        <span className="absolute right-2 top-2 text-4xl text-gold/60 sm:right-6 sm:top-6 sm:text-6xl">❀</span>
        <span className="absolute bottom-2 left-2 text-4xl text-gold/60 sm:bottom-6 sm:left-6 sm:text-6xl">❀</span>
        <span className="absolute bottom-2 right-2 text-4xl text-gold/60 sm:bottom-6 sm:right-6 sm:text-6xl">❀</span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6">
        <Reveal>
          <Monogram className="h-20 w-20 sm:h-24 sm:w-24" />
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-shimmer font-sinhala-serif text-3xl font-bold leading-snug sm:text-5xl">
            {siteConfig.invitationLine1}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sinhala text-xl text-rose-gold sm:text-2xl">{siteConfig.invitationLine2}</p>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col items-center gap-2">
          <p className="font-sinhala text-base leading-relaxed text-maroon-deep/90 sm:text-lg">
            {siteConfig.groomParents}
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-script text-5xl text-maroon sm:text-7xl"
          >
            {siteConfig.groomName}
          </motion.span>
        </Reveal>

        <Reveal delay={0.25} className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold sm:w-16" />
          <span className="font-sinhala text-lg text-gold sm:text-xl">සහ</span>
          <span className="h-px w-10 bg-gold sm:w-16" />
        </Reveal>

        <Reveal delay={0.3} className="flex flex-col items-center gap-2">
          <p className="font-sinhala text-base leading-relaxed text-maroon-deep/90 sm:text-lg">
            {siteConfig.brideParents}
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-script text-5xl text-maroon sm:text-7xl"
          >
            {siteConfig.brideName}
          </motion.span>
        </Reveal>

        <Reveal delay={0.35} className="flex flex-col items-center gap-3 rounded-2xl border border-gold/40 bg-cream/60 px-6 py-6 shadow-lg sm:px-10">
          <p className="font-sinhala text-base leading-relaxed text-maroon-deep sm:text-lg">
            {siteConfig.invitationClosing}
          </p>
          <div className="ornament-divider w-2/3">
            <span className="text-base">✦</span>
          </div>
          <p className="font-sinhala-serif text-xl font-semibold text-maroon sm:text-2xl">
            {siteConfig.weddingDateDisplay}
          </p>
          <p className="font-sinhala text-base text-rose-gold sm:text-lg">
            {siteConfig.weddingTimeDisplay}
          </p>
          <p className="font-sinhala-serif text-lg text-maroon sm:text-xl">{siteConfig.venueName}</p>
        </Reveal>
      </div>
    </section>
  );
}
