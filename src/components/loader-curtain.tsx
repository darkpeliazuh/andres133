"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoaderCurtain() {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setOpen(false), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-noir-950"
        >
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-0 bg-noir-950"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.25 }}
            style={{ transformOrigin: "bottom" }}
            className="absolute inset-0 bg-noir-900"
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <p className="eyebrow mb-4">Maison Noir · est. 1924</p>
              <h1 className="font-display text-5xl text-ivory md:text-7xl">
                <span className="gold-text">M</span>aison{" "}
                <span className="italic font-serif font-light">Noir</span>
              </h1>
            </motion.div>

            <div className="flex w-72 items-center gap-4">
              <span className="font-sans text-xs tracking-[0.4em] text-gold-300">
                {String(progress).padStart(3, "0")}
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-noir-700">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-400 via-ivory to-gold-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-noir-300">
                Paris
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
