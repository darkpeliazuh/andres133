"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  Wine,
  Quotes,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { CARNET_COURSES, type Course } from "@/lib/courses";
import { Magnetic } from "@/components/ui/magnetic";
import { OrnateFrame, FleurDeLis } from "@/components/ui/ornaments";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

/**
 * Carte Vivante — an interactive course-by-course experience.
 *
 * Behaviour:
 * - Big editorial slide per course (image + rich text)
 * - Keyboard nav (←/→, Home/End)
 * - Drag/swipe nav via Framer Motion
 * - Course rail at the bottom (Roman numerals)
 * - Smooth crossfade between courses
 * - Live progress bar across the top of the section
 */
export function CarteVivante() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = CARNET_COURSES.length;
  const course = CARNET_COURSES[active];

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDirection(clamped > active ? 1 : -1);
      setActive(clamped);
    },
    [active, total]
  );

  // Keyboard navigation, scoped to when the section is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const sec = document.getElementById("carte-vivante");
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, total]);

  return (
    <section
      id="carte-vivante"
      aria-label="Carte vivante — interactive tasting menu"
      className="relative min-h-screen overflow-hidden bg-noir-950 py-24 md:py-32"
    >
      {/* Header */}
      <div className="container-luxe relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow reveal mb-6 flex items-center gap-3">
              <Sparkle weight="fill" className="h-3 w-3" /> The Living Carte —
              Chapter II ½
            </p>
            <h2 className="reveal font-display text-5xl leading-none text-ivory md:text-7xl">
              Walk through the{" "}
              <span className="italic font-serif font-light gold-text">
                twelve courses
              </span>
              .
            </h2>
          </div>
          <p className="reveal max-w-md font-serif text-base italic text-ivory/65">
            Use{" "}
            <kbd className="border border-gold-400/30 px-1.5 py-0.5 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-300">
              ←
            </kbd>{" "}
            <kbd className="border border-gold-400/30 px-1.5 py-0.5 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-300">
              →
            </kbd>{" "}
            or drag to walk through the menu — exactly as you would on the
            evening itself.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-10 flex items-center gap-6">
          <span className="font-display text-2xl text-gold-300">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-gold-400/15">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-400 via-ivory to-gold-400"
              animate={{ width: `${((active + 1) / total) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/50">
            of {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Slide */}
      <div className="container-luxe relative z-10 mt-12 md:mt-16">
        <div className="relative min-h-[44rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={course.no}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -90) go(active + 1);
                else if (info.offset.x > 90) go(active - 1);
              }}
              className="grid cursor-grab grid-cols-1 gap-10 active:cursor-grabbing md:grid-cols-12 md:gap-12"
            >
              <CourseDetail course={course} />
              <CourseImage course={course} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rail nav */}
        <div className="mt-14 flex items-center gap-4">
          <Magnetic strength={0.4}>
            <button
              type="button"
              aria-label="Previous course"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              className="grid h-12 w-12 place-items-center border border-gold-400/30 text-gold-200 transition-all hover:border-gold-300 hover:bg-gold-400/10 disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" weight="thin" />
            </button>
          </Magnetic>

          <div className="relative flex flex-1 items-center justify-between">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold-400/15" />
            {CARNET_COURSES.map((c, i) => (
              <button
                type="button"
                key={c.no}
                onClick={() => go(i)}
                aria-label={`Course ${c.no} — ${c.name}`}
                aria-current={i === active}
                className="relative z-10 grid h-9 w-9 place-items-center"
              >
                <span
                  className={cn(
                    "block h-2 w-2 rounded-full bg-gold-400/40 transition-all duration-500",
                    i === active &&
                      "h-3 w-3 bg-gold-300 shadow-[0_0_14px_3px_rgba(245,235,196,0.55)]",
                    i < active && "bg-gold-400"
                  )}
                />
                <span
                  className={cn(
                    "absolute -bottom-7 left-1/2 -translate-x-1/2 font-display text-sm transition-all duration-500",
                    i === active
                      ? "text-gold-300 opacity-100"
                      : "text-ivory/40 opacity-0 group-hover:opacity-100"
                  )}
                >
                  {c.no}
                </span>
              </button>
            ))}
          </div>

          <Magnetic strength={0.4}>
            <button
              type="button"
              aria-label="Next course"
              onClick={() => go(active + 1)}
              disabled={active === total - 1}
              className="grid h-12 w-12 place-items-center border border-gold-400/30 text-gold-200 transition-all hover:border-gold-300 hover:bg-gold-400/10 disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" weight="thin" />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 50,
    filter: "blur(12px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -50,
    filter: "blur(12px)",
  }),
};

function CourseDetail({ course }: { course: Course }) {
  return (
    <div className="md:col-span-6 lg:col-span-5">
      <div className="flex items-baseline gap-6">
        <span className="font-display text-7xl text-gold-300/80 md:text-8xl">
          {course.no}
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/40">
          Course {course.index} of {CARNET_COURSES.length}
        </span>
      </div>

      <h3 className="mt-6 font-display text-4xl leading-tight text-ivory md:text-6xl">
        {course.name}
      </h3>
      <p className="mt-3 font-serif text-xl italic text-ivory/65 md:text-2xl">
        {course.french}
      </p>

      <p className="mt-8 font-serif text-base leading-relaxed text-ivory/75 md:text-lg">
        {course.description}
      </p>

      {/* Wine pairing */}
      <div className="mt-10 border-l-2 border-gold-400/40 pl-6">
        <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/85">
          <Wine className="h-3 w-3" weight="thin" />
          Wine pairing
        </p>
        <p className="mt-2 font-display text-xl text-ivory">
          {course.pairing}
        </p>
        <p className="mt-1 font-serif text-sm italic text-ivory/55">
          {course.pairingNote}
        </p>
      </div>

      {/* Ingredients */}
      <div className="mt-8">
        <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/85">
          <MapPin className="h-3 w-3" weight="thin" />
          From
        </p>
        <ul className="mt-3 space-y-2">
          {course.ingredients.map((ing) => (
            <li
              key={ing.name}
              className="flex items-baseline justify-between gap-4 border-b border-gold-400/10 pb-2 font-serif"
            >
              <span className="text-ivory/85">{ing.name}</span>
              <span className="text-right text-sm italic text-ivory/55">
                {ing.origin}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chef's note */}
      <div className="mt-8 flex items-start gap-3 bg-noir-900/40 p-5">
        <Quotes className="mt-1 h-4 w-4 shrink-0 text-gold-300" weight="fill" />
        <div>
          <p className="font-serif text-base italic text-ivory/85">
            {course.chefNote}
          </p>
          <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.4em] text-gold-300/70">
            — Chef Élise Marchand
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseImage({ course }: { course: Course }) {
  return (
    <div className="md:col-span-6 lg:col-span-7">
      <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[5/6]">
        <Image
          src={course.image}
          alt={`${course.name} — Maison Noir`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority={course.index === 1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent" />
        <BorderBeam duration={11} />
        <OrnateFrame className="text-gold-300/70" />

        {/* Course number badge */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 bg-noir-950/85 px-3 py-2 backdrop-blur-md">
          <FleurDeLis className="h-3.5 w-3.5 text-gold-300" />
          <span className="font-display text-xl text-ivory">{course.no}</span>
        </div>

        {/* Caption strip */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
            Plated to order · {course.short}
          </p>
        </div>
      </div>
    </div>
  );
}
