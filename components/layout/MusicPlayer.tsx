"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { getBackgroundAudio } from "@/lib/audio";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = getBackgroundAudio();
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    setPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggle = async () => {
    const audio = getBackgroundAudio();
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      // Autoplay restrictions or missing file — fail silently.
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Pause background music" : "Play background music"}
      aria-pressed={playing}
      className="glass fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full text-gold shadow-lg sm:right-6 sm:top-6"
    >
      {playing ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Music2 size={20} aria-hidden="true" />
        </motion.span>
      ) : (
        <VolumeX size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
}
