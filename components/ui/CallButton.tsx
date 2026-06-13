"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallButtonProps {
  phone: string;
  phoneDisplay: string;
  className?: string;
}

/**
 * On touch/mobile devices, tapping dials the number directly.
 * On desktop (no touch support), it reveals the phone number instead,
 * since `tel:` links can't place a call there.
 */
export default function CallButton({ phone, phoneDisplay, className }: CallButtonProps) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      (navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches);

    if (!isTouchDevice) {
      e.preventDefault();
      setRevealed(true);
    }
  };

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={cn(
        "flex min-h-12 items-center justify-center gap-2 rounded-full border border-maroon bg-maroon px-4 py-3 font-sinhala text-sm font-medium text-cream transition-colors hover:bg-maroon-deep",
        className
      )}
    >
      <Phone size={18} aria-hidden="true" />
      {revealed ? phoneDisplay : "අමතන්න"}
    </a>
  );
}
