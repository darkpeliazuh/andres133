"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FleurDeLis } from "@/components/ui/ornaments";

const quotes = [
  {
    body: "There are restaurants in Paris, and then there is Maison Noir. To eat here is to remember why one travels at all.",
    src: "Le Monde",
    by: "Vincent Aubrac",
  },
  {
    body: "Marchand cooks the way Ravel composed — every note essential, nothing left to chance, the whole thing devastating.",
    src: "Financial Times — Weekend",
    by: "Sophia Brennan",
  },
  {
    body: "The most extraordinary tasting menu currently being served in Europe. The room is small. The achievement is enormous.",
    src: "The World's 50 Best — Jury Notes",
    by: "Anonymous",
  },
];

const awards = [
  { year: "2024", award: "World's 50 Best · #6 globally" },
  { year: "2024", award: "Le Chef Magazine · Chef of the Year" },
  { year: "2023", award: "Wine Spectator · Grand Award" },
  { year: "2022", award: "Relais & Châteaux · Grand Chef" },
  { year: "2021", award: "Guide Michelin · ★★★ Three Stars" },
  { year: "2020", award: "Gault & Millau · 19,5 / 20" },
];

export function Press() {
  return (
    <section
      id="press"
      className="relative overflow-hidden bg-noir-950 py-32 md:py-48"
    >
      <div className="container-luxe relative">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow reveal mb-6">Press & Awards — Chapter V</p>
            <h2 className="reveal font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
              In the words of{" "}
              <span className="italic font-serif font-light gold-text">
                others
              </span>
            </h2>
            <p className="reveal mt-8 font-serif text-lg italic text-ivory/70">
              We rarely speak about ourselves. Fortunately, others have been
              kind enough to do so.
            </p>

            <div className="reveal mt-14 border-t border-gold-400/15 pt-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
                Distinctions
              </p>
              <ul className="mt-6 space-y-4">
                {awards.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.07, duration: 0.7 }}
                    className="flex items-baseline gap-6 border-b border-gold-400/10 pb-3"
                  >
                    <span className="font-display text-xl text-gold-300/70">
                      {a.year}
                    </span>
                    <span className="font-serif text-base text-ivory/80">
                      {a.award}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 md:pt-12">
            <ul className="space-y-8">
              {quotes.map((q, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SpotlightCard
                    glowSize={420}
                    className="relative border border-gold-400/15 p-8 md:p-10"
                  >
                    <span
                      aria-hidden
                      className="absolute -left-2 -top-12 font-display text-[10rem] leading-none text-gold-400/20"
                    >
                      “
                    </span>
                    <FleurDeLis className="absolute right-6 top-6 h-5 w-5 text-gold-300/40" />
                    <p className="relative font-serif text-2xl italic leading-snug text-ivory/85 md:text-3xl">
                      {q.body}
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="block h-px w-10 bg-gold-300/60" />
                      <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold-300">
                        {q.src}
                      </span>
                      <span className="font-sans text-[10px] tracking-[0.3em] text-ivory/40">
                        · {q.by}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
