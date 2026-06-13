import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  iconClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      {Icon && (
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-rose-gold text-white shadow-lg sm:h-14 sm:w-14",
            iconClassName
          )}
          aria-hidden="true"
        >
          <Icon size={24} className="sm:size-7" />
        </span>
      )}
      {eyebrow && (
        <span className="font-sinhala text-sm uppercase tracking-[0.2em] text-rose-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">{title}</h2>
      <div className="ornament-divider w-32 sm:w-40" aria-hidden="true">
        <span className="text-lg">❀</span>
      </div>
      {subtitle && (
        <p className="max-w-xl font-sinhala text-base text-maroon-deep/80 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
