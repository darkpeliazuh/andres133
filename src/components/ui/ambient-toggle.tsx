"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A floating ambient sound toggle. Silent by default — clicking renders the
 * "playing" state with concentric pulsing rings and four animated equaliser
 * bars. (No actual audio is shipped to keep the bundle small; wire to a
 * licensed track in production.)
 */
export function AmbientToggle() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      aria-label={playing ? "Mute ambient" : "Play ambient"}
      onClick={() => setPlaying((p) => !p)}
      className={cn(
        "group fixed bottom-8 right-8 z-40 grid h-14 w-14 place-items-center",
        "rounded-full border border-gold-400/40 bg-noir-900/70 backdrop-blur-md",
        "text-gold-200 transition-all duration-500 hover:border-gold-300 hover:bg-noir-800/80",
        "hidden md:grid"
      )}
    >
      {/* Pulsing rings when playing */}
      <AnimatePresence>
        {playing && (
          <>
            {[0, 0.4, 0.8].map((d, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.9 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.4,
                  delay: d,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border border-gold-300/50"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Equaliser bars when playing, icon otherwise */}
      <span className="relative grid h-5 w-5 place-items-center">
        {playing ? (
          <span className="flex items-end gap-[3px]">
            {[0.2, 0.5, 0.8, 0.4].map((delay, i) => (
              <motion.span
                key={i}
                initial={{ height: 4 }}
                animate={{ height: [4, 14, 6, 16, 4] }}
                transition={{
                  duration: 1.2,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="block w-[2px] bg-gold-200"
                style={{ height: 8 }}
              />
            ))}
          </span>
        ) : (
          <Music2 className="h-4 w-4" />
        )}
      </span>

      <span className="pointer-events-none absolute -left-3 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {playing ? "Ambient" : "Silent"}
        <VolumeX className="hidden" />
      </span>
    </button>
  );
}
