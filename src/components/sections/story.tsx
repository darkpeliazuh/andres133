"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const accentY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden bg-noir-950 py-32 md:py-48"
    >
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.07] blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]) }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-wine-500/[0.08] blur-3xl"
      />

      <div className="container-luxe relative grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10 lg:gap-20">
        <div className="md:col-span-5 md:col-start-1">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <motion.div style={{ y: imgY }} className="absolute inset-0 h-[120%]">
              <Image
                src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1600&q=85"
                alt="Hands plating a Michelin-starred course"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent" />
            </motion.div>
            <div className="pointer-events-none absolute inset-3 border border-gold-400/20" />
            <div className="absolute -bottom-6 left-6 z-10 bg-noir-950 px-4 py-2 font-display text-2xl text-gold-300">
              MCMXXIV
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gold-400/15 pt-10">
            {[
              { n: "100", l: "Years of craft" },
              { n: "12", l: "Course tasting" },
              { n: "18", l: "Seats per evening" },
              { n: "★★★", l: "Since 1971" },
            ].map((item, i) => (
              <div key={i} className="reveal">
                <div className="font-display text-4xl text-ivory">{item.n}</div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  {item.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <p className="eyebrow reveal mb-6">The House — Chapter I</p>
          <h2 className="reveal font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
            A century of <span className="italic font-serif font-light gold-text">cuisine</span>{" "}
            written in candlelight.
          </h2>

          <div className="mt-10 space-y-7 font-serif text-lg leading-relaxed text-ivory/75 md:text-xl">
            <p className="reveal">
              Maison Noir opened on a quiet street in the 6th arrondissement in
              the spring of 1924 — a single dining room with eighteen chairs,
              one chandelier salvaged from the Opéra, and the conviction that a
              meal could be a piece of theatre.
            </p>
            <p className="reveal">
              A hundred years later, that conviction remains the only one we
              ask of our guests. The room is still small. The candles are still
              real. The first course still arrives before you've had time to
              read the menu — and the menu, in any case, is a suggestion.
            </p>
            <p className="reveal text-gold-300/90 italic">
              "We do not serve dinner. We stage it."
              <span className="ml-3 not-italic font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/60">
                — Élise Marchand, Chef de Cuisine
              </span>
            </p>
          </div>

          <div className="reveal mt-12">
            <a href="#chef" className="btn-gold">
              <span>Meet the chef</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
