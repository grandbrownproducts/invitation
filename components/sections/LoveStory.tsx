"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { loveStory } from "@/data/loveStory";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function LoveStory() {
  return (
    <section id="story" className="relative px-6 py-20">
      <SectionHeading eyebrow="Our Journey" title="Love Story" subtitle="ආදරයේ කතාව" />

      <div className="mx-auto mt-12 max-w-3xl">
        <ol className="relative flex flex-col gap-12 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-gold/40 sm:before:left-1/2">
          {loveStory.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <li
                key={item.year}
                className={cn(
                  "relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10",
                  !isEven && "sm:flex-row-reverse"
                )}
              >
                <span
                  className="absolute left-6 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold bg-cream sm:left-1/2"
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="ml-10 flex-1 sm:ml-0"
                >
                  <div className="overflow-hidden rounded-2xl border border-gold/30 bg-cream shadow-lg">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.image}
                        alt={`${item.title} – ${item.year}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5 text-center sm:text-left">
                      <span className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-semibold text-maroon">{item.title}</h3>
                      <p className="mt-2 font-sinhala text-sm text-maroon-deep/80 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="hidden flex-1 sm:block" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
