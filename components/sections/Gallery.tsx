"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/sections/Lightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative px-6 py-20">
      <SectionHeading eyebrow="Memories" title="Photo Gallery" subtitle="අපගේ ඡායාරූප එකතුව" />

      <div className="mx-auto mt-10 max-w-5xl columns-2 gap-3 sm:columns-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {galleryImages.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
            className="block w-full overflow-hidden rounded-xl border border-gold/20 shadow-md"
            aria-label={`Open photo ${index + 1} in gallery viewer`}
          >
            <div className="relative w-full" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
