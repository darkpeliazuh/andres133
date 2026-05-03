"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { OrnateFrame } from "@/components/ui/ornaments";
import { BorderBeam } from "@/components/ui/border-beam";

export function Chef() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const signY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section
      ref={ref}
      id="chef"
      className="relative overflow-hidden bg-noir-950 py-32 md:py-48"
    >
      <div className="container-luxe relative grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6 md:order-2">
          <div className="group relative aspect-[4/5] w-full overflow-hidden">
            <motion.div style={{ y: portraitY }} className="absolute inset-0 h-[120%]">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1600&q=85"
                alt="Chef Élise Marchand in her kitchen"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_30%] grayscale-[35%] saturate-[0.9] transition-all duration-[1500ms] group-hover:grayscale-0 group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/20 to-transparent" />
            </motion.div>
            <BorderBeam duration={12} />
            <OrnateFrame className="text-gold-300/70" />
            <motion.div
              style={{ y: signY }}
              className="absolute -bottom-12 -right-6 z-10 max-w-[14rem] rotate-[-6deg] bg-noir-950 p-6 shadow-deep ring-1 ring-gold-400/20 md:-right-10"
            >
              <p className="font-display text-3xl text-gold-300">É. Marchand</p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/60">
                Chef de Cuisine — depuis 2014
              </p>
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-6 md:order-1 md:pt-12">
          <p className="eyebrow reveal mb-6">The Chef — Chapter III</p>
          <h2 className="reveal font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
            Élise <span className="italic font-serif font-light gold-text">Marchand</span>
          </h2>

          <div className="mt-10 space-y-7 font-serif text-lg leading-relaxed text-ivory/75">
            <p className="reveal">
              Born in Lyon, trained in Tokyo, returned to Paris with the
              certainty that a kitchen is, above all else, a stage. At
              twenty-nine she was awarded her first star. At thirty-six, her
              third. She has not looked up since.
            </p>
            <p className="reveal">
              Her cuisine is a long conversation with the seasons of France —
              quiet, exact, occasionally dangerous. She writes every menu by
              hand, in a leather notebook that sits, still, on the pass.
            </p>
          </div>

          <div className="reveal mt-12 grid grid-cols-2 gap-6 border-y border-gold-400/15 py-8">
            {[
              { y: "2014", t: "Joined Maison Noir" },
              { y: "2015", t: "First Michelin star" },
              { y: "2018", t: "Second star" },
              { y: "2021", t: "Third star · Chef of the Year" },
            ].map((m, i) => (
              <div key={i}>
                <p className="font-display text-2xl text-gold-300">{m.y}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/55">
                  {m.t}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 flex items-center gap-6">
            {/* Hand-written signature */}
            <svg
              viewBox="0 0 220 60"
              className="h-12 w-auto text-gold-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            >
              <path d="M5 35 C 20 5, 35 50, 50 25 S 80 50, 95 20 T 130 30 T 165 25 T 210 30" />
              <path d="M55 45 L 70 42" />
            </svg>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/40">
              Élise Marchand · Chef de Cuisine
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
