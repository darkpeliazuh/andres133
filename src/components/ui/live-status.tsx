"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  computeStatus,
  formatMinutes,
  minutesToHHMM,
  type LiveStatus,
} from "@/lib/hours";
import { cn } from "@/lib/utils";

type Props = {
  /** "compact" for the nav, "full" for the standalone chip */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * Live "Open / Closed" badge for Maison Noir. Computes the current state in
 * Europe/Paris time, ticking every 30 s. SSR-safe: starts as null and
 * hydrates on the client to avoid time mismatches.
 */
export function LiveStatusBadge({ variant = "compact", className }: Props) {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    const id = setInterval(() => setStatus(computeStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/40",
          className
        )}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-ivory/30" />
        <span>Loading</span>
      </span>
    );
  }

  const isOpen = status.state === "open";
  const isSoon = status.state === "soon";
  const dotColor = isOpen
    ? "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]"
    : isSoon
    ? "bg-gold-300 shadow-[0_0_12px_2px_rgba(245,235,196,0.45)]"
    : "bg-wine-400/80";
  const label = isOpen
    ? "Open Now"
    : isSoon
    ? "Opens Soon"
    : "Closed";

  if (variant === "compact") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/85",
          className
        )}
        aria-live="polite"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          {isOpen && (
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40"
              animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className={cn("relative block h-1.5 w-1.5 rounded-full", dotColor)} />
        </span>
        <span>{label}</span>
      </span>
    );
  }

  // full
  const detail =
    status.state === "open"
      ? status.nextSeatingMin !== null
        ? `Next seating · ${minutesToHHMM(status.nextSeatingMin)}`
        : `Service ends in ${formatMinutes(status.minutesUntilClose)}`
      : status.state === "soon"
      ? `Doors open in ${formatMinutes(status.minutesUntilOpen)}`
      : status.state === "closed"
      ? `Re-opens ${status.nextOpenLabel}`
      : `Closed today · returns ${status.nextOpenLabel}`;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-4 border border-gold-400/25 bg-noir-900/60 px-4 py-3 backdrop-blur-md",
        className
      )}
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        {isOpen && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40"
            animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className={cn("relative block h-2 w-2 rounded-full", dotColor)} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-ivory">
          {label}
        </span>
        <span className="mt-1 font-serif text-[13px] italic text-ivory/65">
          {detail}
        </span>
      </span>
    </div>
  );
}
