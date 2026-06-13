"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircleHeart, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

interface Wish {
  id: string;
  name: string;
  message: string;
}

const STORAGE_KEY = "wedding-wishes";

const SEED_WISHES: Wish[] = [
  { id: "seed-1", name: "Amma & Thaththa", message: "May your home always be filled with love and laughter. Congratulations!" },
  { id: "seed-2", name: "Nimal & Family", message: "Wishing you both a lifetime of happiness together. ❤️" },
];

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Wish[] = JSON.parse(stored);
        setWishes([...SEED_WISHES, ...parsed]);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = { id: crypto.randomUUID(), name: name.trim(), message: message.trim() };
    const updated = [...wishes, newWish];
    setWishes(updated);

    try {
      const userWishes = updated.filter((w) => !w.id.startsWith("seed-"));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWishes));
    } catch {
      // ignore storage errors
    }

    setName("");
    setMessage("");
  };

  return (
    <section className="relative px-6 py-20">
      <SectionHeading
        eyebrow="Blessings"
        title="Wedding Wishes Wall"
        subtitle="ආශීර්වාද සහ සුභ පැතුම්"
        icon={MessageCircleHeart}
        iconClassName="bg-gradient-to-br from-blush-deep to-gold"
      />

      <Reveal className="mx-auto mt-10 max-w-xl">
        <form onSubmit={handleSubmit} className="glass flex flex-col gap-3 rounded-2xl p-5 shadow-lg">
          <label className="sr-only" htmlFor="wish-name">
            Your name
          </label>
          <input
            id="wish-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="min-h-12 rounded-xl border border-gold/40 bg-ivory/80 px-4 py-3 font-sinhala text-maroon-deep placeholder:text-maroon-deep/50 focus:border-gold focus:outline-none"
          />
          <label className="sr-only" htmlFor="wish-message">
            Your message
          </label>
          <textarea
            id="wish-message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave your wishes for the couple..."
            rows={3}
            className="min-h-24 resize-none rounded-xl border border-gold/40 bg-ivory/80 px-4 py-3 font-sinhala text-maroon-deep placeholder:text-maroon-deep/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 font-sinhala text-sm font-medium text-cream transition-colors hover:bg-maroon-deep"
          >
            <Send size={16} aria-hidden="true" />
            Send Wishes
          </button>
        </form>

        <ul className="mt-6 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {wishes.map((wish, index) => {
              const TINTS = ["bg-blush/40 border-blush-deep/30", "bg-sage/40 border-sage-deep/30", "bg-lilac/40 border-lilac-deep/30"];
              return (
                <motion.li
                  key={wish.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-2xl border px-5 py-4 shadow-sm ${TINTS[index % TINTS.length]}`}
                >
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-rose-gold" fill="currentColor" aria-hidden="true" />
                    <p className="font-display text-sm font-semibold text-maroon">{wish.name}</p>
                  </div>
                  <p className="mt-1 font-sinhala text-sm text-maroon-deep/85">{wish.message}</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </Reveal>
    </section>
  );
}
