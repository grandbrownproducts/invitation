"use client";

import { useEffect } from "react";

/**
 * Gently auto-scrolls the page from top to bottom after a short delay,
 * giving the invitation a "guided" feel. Cancels permanently the moment
 * the visitor scrolls, taps, or presses a key — and is skipped entirely
 * if the user prefers reduced motion.
 */
export function useAutoScroll(enabled: boolean, speed = 35, delay = 1200) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let stopped = false;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
    };

    const step = () => {
      if (stopped) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 1) {
        stop();
        return;
      }
      window.scrollBy(0, speed / 60);
      rafId = requestAnimationFrame(step);
    };

    const startTimeout = window.setTimeout(() => {
      if (stopped) return;
      window.addEventListener("wheel", stop, { passive: true });
      window.addEventListener("touchstart", stop, { passive: true });
      window.addEventListener("pointerdown", stop, { passive: true });
      window.addEventListener("keydown", stop);
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      stop();
    };
  }, [enabled, speed, delay]);
}
