"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[110vh] w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 h-[120%] w-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85"
          alt="Maison Noir dining room at twilight"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/55 via-noir-950/25 to-noir-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.85)_100%)]" />
      </motion.div>

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-gold-300/70 blur-[1px] animate-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${5 + (i % 5)}s`,
              opacity: 0.35 + ((i * 7) % 4) * 0.12,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: titleY }}
        className="relative z-10 flex h-screen flex-col items-center justify-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="eyebrow mb-8"
        >
          Three Michelin Stars · Paris · Since 1924
        </motion.span>

        <h1 className="px-6">
          {["An", "evening", "in", "the", "dark."].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 2.05 + i * 0.12,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-4 inline-block font-display text-6xl leading-[0.9] text-ivory shadow-text-soft md:text-[8rem] lg:text-[10rem]"
            >
              {i === 4 ? (
                <span className="italic font-serif font-light gold-text">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 1 }}
          className="mt-10 max-w-xl px-8 font-serif text-lg italic text-ivory/80 md:text-xl"
        >
          Twelve courses. Eighteen seats. One night that is never the same
          twice — composed in candlelight by Chef Élise Marchand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.15, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
        >
          <a href="#reserve" className="btn-gold">
            <span>Reserve a table</span>
            <span aria-hidden>→</span>
          </a>
          <a
            href="#menu"
            className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.4em] text-ivory/80 transition-colors hover:text-gold-300"
          >
            <span className="h-px w-10 bg-gold-300/50 transition-all duration-500 group-hover:w-16 group-hover:bg-gold-300" />
            Discover the menu
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3 text-ivory/70"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.5em]">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-gold-300/30">
          <span className="absolute inset-x-0 top-0 block h-1/3 bg-gold-300 animate-[float_2.4s_ease-in-out_infinite]" />
        </span>
      </motion.div>

      {/* Side metadata */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden flex-col items-center justify-between py-12 px-6 lg:flex">
        <span className="vertical-hairline h-24" />
        <span className="rotate-180 font-sans text-[10px] uppercase tracking-[0.5em] text-ivory/50 [writing-mode:vertical-rl]">
          48° 51′ 24″ N · 2° 21′ 03″ E
        </span>
        <span className="vertical-hairline h-24" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden flex-col items-center justify-between py-12 px-6 lg:flex">
        <span className="vertical-hairline h-24" />
        <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-ivory/50 [writing-mode:vertical-rl]">
          Maison Noir — Carnet 01
        </span>
        <span className="vertical-hairline h-24" />
      </div>
    </section>
  );
}
