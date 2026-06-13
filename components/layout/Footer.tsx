"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: "විහඟ ❤️ සඳලි | Wedding Invitation",
    text: "You're invited to celebrate Vihanga & Sandali's wedding on 29 August 2026!",
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — ignore
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <footer className="relative px-6 pb-32 pt-10 text-center sm:pb-16">
      <div className="ornament-divider mx-auto w-40">
        <span className="text-lg">❀</span>
      </div>

      <p className="mt-4 font-script text-3xl text-rose-gold sm:text-4xl">
        {siteConfig.groomName} &amp; {siteConfig.brideName}
      </p>
      <p className="mt-1 font-sinhala text-sm text-maroon-deep/70">
        {siteConfig.weddingDateDisplay} • {siteConfig.venueNameEn}
      </p>

      <div className="mx-auto mt-6 flex max-w-xs justify-center gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-gold bg-gold/10 px-4 py-3 font-sinhala text-sm font-medium text-maroon transition-colors hover:bg-gold/20"
        >
          <Share2 size={16} aria-hidden="true" />
          Share
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-gold bg-gold/10 px-4 py-3 font-sinhala text-sm font-medium text-maroon transition-colors hover:bg-gold/20"
        >
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <p className="mt-8 font-body text-xs text-maroon-deep/50">
        Made with ❤️ for our special day
      </p>
    </footer>
  );
}
