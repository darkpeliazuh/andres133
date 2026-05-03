"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wine,
  Grape,
  MapPin,
  Award,
  Snowflake,
  Hourglass,
} from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { OrnateFrame, FleurDeLis } from "@/components/ui/ornaments";
import { cn } from "@/lib/utils";

export function Cellar() {
  return (
    <section
      id="cellar"
      className="relative overflow-hidden bg-noir-950 py-32 md:py-48"
    >
      {/* Aurora glow */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-wine-500/10 blur-[120px] animate-aurora" />
        <div
          className="absolute -bottom-40 right-1/4 h-[36rem] w-[36rem] rounded-full bg-gold-500/10 blur-[120px] animate-aurora"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="container-luxe relative">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow reveal mb-6">The Cellar — Chapter IV ½</p>
            <h2 className="reveal font-display text-5xl leading-none text-ivory md:text-7xl">
              Twelve thousand{" "}
              <span className="italic font-serif font-light gold-text">
                bottles
              </span>
            </h2>
          </div>
          <p className="reveal max-w-md font-serif text-lg italic text-ivory/65">
            A subterranean library of vintages curated by Head Sommelier
            Augustin Vidal — eighteen years in the making.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* HERO BENTO — Cellar image */}
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            withBeam
            innerClassName="p-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=85"
              alt="Maison Noir wine cellar at night"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-noir-950 via-noir-950/30 to-transparent" />
            <OrnateFrame />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
                The Cellar
              </p>
              <p className="mt-3 font-display text-4xl text-ivory md:text-5xl">
                A library, beneath the dining room.
              </p>
              <p className="mt-3 max-w-md font-serif text-base italic text-ivory/70">
                Built into the cellars of an 18th-century hôtel particulier,
                kept at a constant 13°C since 1971.
              </p>
            </div>
          </BentoCard>

          {/* Big number — bottles */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <Wine className="h-7 w-7 text-gold-300" strokeWidth={1.2} />
              <div>
                <Counter
                  value={12480}
                  className="font-display text-6xl text-ivory md:text-7xl"
                />
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  Bottles in cellar
                </p>
              </div>
            </div>
          </BentoCard>

          {/* References */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <Grape className="h-7 w-7 text-gold-300" strokeWidth={1.2} />
              <div>
                <p className="font-display text-6xl text-ivory md:text-7xl">
                  <Counter value={1840} />
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  Distinct references
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Sommelier portrait */}
          <BentoCard className="md:col-span-2 md:row-span-2" withBeam>
            <div className="relative h-full">
              <Image
                src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=85"
                alt="Sommelier pouring wine"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/20 to-transparent" />
              <OrnateFrame />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
                  Head Sommelier
                </p>
                <p className="mt-2 font-display text-3xl text-ivory">
                  Augustin Vidal
                </p>
                <div className="mt-3 flex items-center gap-2 text-gold-300">
                  <Award className="h-3.5 w-3.5" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-ivory/70">
                    Meilleur Sommelier de France · 2019
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Pull quote */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <FleurDeLis className="h-6 w-6 text-gold-300/80" />
              <div>
                <p className="font-serif text-xl italic leading-snug text-ivory/85">
                  "A list is not a catalogue. It is a confession of the things
                  one loves."
                </p>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.35em] text-gold-300/70">
                  — A. Vidal
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Region map / icon */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <MapPin className="h-7 w-7 text-gold-300" strokeWidth={1.2} />
              <div>
                <p className="font-display text-5xl text-ivory">
                  <Counter value={148} />
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  Domaines · 11 régions
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-serif text-sm italic text-ivory/55">
                {["Bourgogne", "Champagne", "Loire", "Rhône", "Jura", "Alsace"].map(
                  (r) => (
                    <span key={r}>{r}</span>
                  )
                )}
              </div>
            </div>
          </BentoCard>

          {/* Oldest vintage */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <Hourglass className="h-7 w-7 text-gold-300" strokeWidth={1.2} />
              <div>
                <p className="font-display text-6xl text-ivory">1924</p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  Oldest vintage on list
                </p>
                <p className="mt-3 font-serif text-base italic text-ivory/55">
                  Château d'Yquem · the year the house was born.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Service note */}
          <BentoCard className="md:col-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <Snowflake
                className="h-7 w-7 text-gold-300"
                strokeWidth={1.2}
              />
              <div>
                <p className="font-display text-3xl text-ivory">13.0 °C</p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  Constant cellar temperature
                </p>
                <p className="mt-3 font-serif text-base italic text-ivory/55">
                  Monitored to within ±0.4°C, day & night, for fifty-three years.
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className,
  innerClassName,
  withBeam = false,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  withBeam?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative", className)}
    >
      <SpotlightCard className={cn("relative h-full w-full overflow-hidden border border-gold-400/15", innerClassName)}>
        {children}
        {withBeam && <BorderBeam />}
      </SpotlightCard>
    </motion.div>
  );
}
