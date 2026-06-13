"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookHeart, Heart, Images, MapPin, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "invitation", label: "Invitation", labelSi: "ආරාධනාව", icon: ScrollText },
  { id: "rsvp", label: "RSVP", labelSi: "පිළිතුර", icon: Heart },
  { id: "story", label: "Story", labelSi: "කතාව", icon: BookHeart },
  { id: "gallery", label: "Gallery", labelSi: "ඡායාරූප", icon: Images },
  { id: "venue", label: "Venue", labelSi: "ස්ථානය", icon: MapPin },
];

export default function Navigation() {
  const [active, setActive] = useState("invitation");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-40 w-[94%] max-w-md -translate-x-1/2 sm:bottom-6"
    >
      <ul className="flex items-center justify-between rounded-full border border-gold/40 bg-maroon-deep px-2 py-2 shadow-xl sm:px-3">
        {NAV_ITEMS.map(({ id, label, labelSi, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => handleClick(id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-full px-1 py-2 text-[10px] font-medium transition-colors sm:text-xs",
                  isActive
                    ? "bg-gold text-maroon-deep shadow-md"
                    : "text-cream/70 hover:text-gold-light"
                )}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="font-sinhala leading-none">{labelSi}</span>
                <span className="sr-only">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
