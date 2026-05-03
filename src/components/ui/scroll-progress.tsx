"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-gradient-to-r from-gold-400 via-ivory to-gold-400"
      />
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[79] h-[2px] bg-gold-300/40 blur-[6px]"
      />
    </>
  );
}
