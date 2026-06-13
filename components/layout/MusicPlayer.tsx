"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // Autoplay restrictions or missing file — fail silently.
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/wedding-theme.mp3" loop preload="none" />
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
    </>
  );
}
