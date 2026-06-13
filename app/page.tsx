"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/intro/LoadingScreen";
import InvitationBook from "@/components/intro/InvitationBook";
import BackgroundEffects from "@/components/effects/BackgroundEffects";
import Navigation from "@/components/layout/Navigation";
import MusicPlayer from "@/components/layout/MusicPlayer";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import LoveStory from "@/components/sections/LoveStory";
import Gallery from "@/components/sections/Gallery";
import VenueDetails from "@/components/sections/VenueDetails";
import Quote from "@/components/sections/Quote";
import WishesWall from "@/components/sections/WishesWall";
import RSVP from "@/components/sections/RSVP";

type Stage = "loading" | "book" | "content";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => setStage("book"), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {stage === "loading" && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "book" && (
          <InvitationBook key="book" onOpen={() => setStage("content")} />
        )}
      </AnimatePresence>

      {stage === "content" && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen"
        >
          <BackgroundEffects />
          <MusicPlayer />
          <ThemeToggle />
          <Navigation />

          <Hero />
          <RSVP />
          <Countdown />
          <LoveStory />
          <Gallery />
          <VenueDetails />
          <Quote />
          <WishesWall />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
