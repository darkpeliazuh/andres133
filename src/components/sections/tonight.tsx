"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LiveStatusBadge } from "@/components/ui/live-status";
import { BorderBeam } from "@/components/ui/border-beam";
import { OrnateFrame, FleurDeLis } from "@/components/ui/ornaments";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Tilt3D } from "@/components/ui/tilt-3d";
import {
  computeStatus,
  formatMinutes,
  minutesToHHMM,
  seatsRemainingFor,
  partsInParis,
  type LiveStatus,
} from "@/lib/hours";
import { computeCurrentCourse } from "@/lib/courses";
import { ArrowUpRight, Moon, Sun, ChefHat } from "lucide-react";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function Tonight() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-noir-950 py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      </div>

      <div className="container-luxe relative">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow reveal mb-6">Live · Right now in Paris</p>
            <h2 className="reveal font-display text-5xl leading-none text-ivory md:text-7xl">
              Tonight at the{" "}
              <span className="italic font-serif font-light gold-text">
                house
              </span>
            </h2>
          </div>
          <div className="reveal">
            <LiveStatusBadge variant="full" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Big card — service status */}
          <Tilt3D className="md:col-span-7" max={4}>
            <ServiceCard now={now} />
          </Tilt3D>

          {/* Seats remaining */}
          <Tilt3D className="md:col-span-5" max={5}>
            <SeatsCard now={now} />
          </Tilt3D>

          {/* Currently being served */}
          <Tilt3D className="md:col-span-7" max={4}>
            <CurrentlyServingCard now={now} />
          </Tilt3D>

          {/* Tonight's seating times */}
          <Tilt3D className="md:col-span-5" max={5}>
            <NextSeatingsCard now={now} />
          </Tilt3D>

          {/* Weather of the room */}
          <Tilt3D className="md:col-span-4" max={5}>
            <RoomTemperatureCard />
          </Tilt3D>

          {/* Chef's note */}
          <Tilt3D className="md:col-span-8" max={5}>
            <ChefNoteCard now={now} />
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}

function CardShell({
  children,
  className,
  withBeam = false,
}: {
  children: React.ReactNode;
  className?: string;
  withBeam?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative h-full overflow-hidden border border-gold-400/15 bg-noir-900/60 p-8 backdrop-blur-sm ${className ?? ""}`}
    >
      {children}
      <OrnateFrame className="text-gold-300/30" />
      {withBeam && <BorderBeam duration={9} />}
    </motion.div>
  );
}

function ServiceCard({ now }: { now: Date | null }) {
  const status: LiveStatus | null = now ? computeStatus(now) : null;
  const isOpen = status?.state === "open";

  let headline = "Doors closed";
  let detail = "Please call to plan your visit.";
  if (status?.state === "open") {
    headline =
      status.nextSeatingMin !== null
        ? `Next seating · ${minutesToHHMM(status.nextSeatingMin)}`
        : `Service ends in ${formatMinutes(status.minutesUntilClose)}`;
    detail =
      "The dining room is alive — eighteen guests are seated, the candles are lit.";
  } else if (status?.state === "soon") {
    headline = `Doors open in ${formatMinutes(status.minutesUntilOpen)}`;
    detail = "The kitchen is in mise-en-place. Tonight's menu is being plated.";
  } else if (status?.state === "closed") {
    headline = `Re-opens ${status.nextOpenLabel}`;
    detail = "Service has finished for the evening.";
  } else if (status?.state === "closed-day") {
    headline = `Closed today · returns ${status.nextOpenLabel}`;
    detail =
      "Sundays and Mondays the kitchen rests. Wine, paper, walks in the Marais.";
  }

  return (
    <CardShell withBeam>
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
        Service
      </p>
      <h3 className="mt-3 font-display text-4xl leading-tight text-ivory md:text-5xl">
        {now ? headline : "Connecting…"}
      </h3>
      <p className="mt-5 max-w-md font-serif text-lg italic text-ivory/70">
        {detail}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className={`block h-2.5 w-2.5 rounded-full ${
          isOpen ? "bg-emerald-400 shadow-[0_0_14px_3px_rgba(52,211,153,0.6)]" : "bg-wine-400/80"
        }`} />
        <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-ivory/70">
          {isOpen ? "Live · candles burning" : "Quiet · kitchen at rest"}
        </span>
      </div>

      <div className="mt-8">
        <Magnetic strength={0.3}>
          <a href="#reserve" className="btn-gold">
            <span>{isOpen ? "Join us tomorrow" : "Reserve a table"}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Magnetic>
      </div>
    </CardShell>
  );
}

function SeatsCard({ now }: { now: Date | null }) {
  const seats = now ? seatsRemainingFor(now) : 0;
  const status = now ? computeStatus(now) : null;
  const totalSeats = 36;
  const taken = totalSeats - seats;

  return (
    <CardShell>
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
        Tonight's room
      </p>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-7xl text-ivory md:text-8xl">
          <Counter value={seats} />
        </span>
        <span className="font-serif text-xl italic text-ivory/55">
          / {totalSeats} seats
        </span>
      </div>
      <p className="mt-3 font-serif text-base italic text-ivory/60">
        {seats === 0
          ? "Fully booked tonight."
          : seats <= 2
          ? "Almost full — only a handful left."
          : "Some seats remain across the two seatings."}
      </p>

      {/* Visual — 36 dots representing the room */}
      <div className="mt-6 grid grid-cols-12 gap-1.5">
        {Array.from({ length: totalSeats }).map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 w-1.5 rounded-full transition-colors ${
              i < taken
                ? "bg-gold-400/70"
                : "bg-gold-400/15"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/45">
        {status?.state === "open"
          ? "Live · updated every 30 seconds"
          : "Holds for next service"}
      </p>
    </CardShell>
  );
}

function NextSeatingsCard({ now }: { now: Date | null }) {
  const parts = now ? partsInParis(now) : null;
  const seatings = ["19:00", "21:00"];

  return (
    <CardShell>
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
        Service times
      </p>
      <ul className="mt-6 space-y-4">
        {seatings.map((s) => {
          const [h, m] = s.split(":").map(Number);
          const isPast = parts ? parts.minute >= h * 60 + m + 90 : false;
          return (
            <li
              key={s}
              className="flex items-center justify-between border-b border-gold-400/10 pb-3"
            >
              <span className="flex items-center gap-3">
                {h < 20 ? (
                  <Sun className="h-4 w-4 text-gold-300/80" strokeWidth={1.2} />
                ) : (
                  <Moon className="h-4 w-4 text-gold-300/80" strokeWidth={1.2} />
                )}
                <span className="font-display text-3xl text-ivory">{s}</span>
              </span>
              <span
                className={`font-sans text-[10px] uppercase tracking-[0.4em] ${
                  isPast ? "text-ivory/35 line-through" : "text-gold-300"
                }`}
              >
                {isPast ? "Served" : "Available"}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 font-serif text-base italic text-ivory/55">
        Tuesday through Saturday only.
      </p>
    </CardShell>
  );
}

function RoomTemperatureCard() {
  return (
    <CardShell>
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
        The room
      </p>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div>
          <p className="font-display text-5xl text-ivory">21°C</p>
          <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/50">
            Dining
          </p>
        </div>
        <div>
          <p className="font-display text-5xl text-ivory">13°C</p>
          <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/50">
            Cellar
          </p>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-display text-3xl text-ivory">14</p>
        <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/50">
          Candles lit per evening
        </p>
      </div>
    </CardShell>
  );
}

function CurrentlyServingCard({ now }: { now: Date | null }) {
  const result = now ? computeCurrentCourse(now) : null;
  const isLive = result?.state === "serving";
  const isBetween = result?.state === "between";

  let title = "Kitchen at rest";
  let detail = "The pass is dark — the next service hasn't started yet.";
  let course = null as null | ReturnType<typeof activeCourse>;

  if (result?.state === "serving") {
    course = activeCourse(result.course);
    title = `Course ${result.course.no} · ${result.course.name}`;
    detail = `Plated to all eighteen seats — seating ${result.seating} · minute ${result.minutesIntoSeating}`;
  } else if (result?.state === "between") {
    title = result.nextCourse
      ? `Plating · ${result.nextCourse.name} next`
      : "Mignardises being arranged";
    detail = `Between courses — seating ${result.seating}`;
  } else if (result?.state === "before-service") {
    title = "Mise-en-place";
    detail = `Doors open in ${formatMinutes(result.minutesUntil)}`;
  } else if (result?.state === "after-service") {
    title = "Service complete";
    detail = "The dishwashers are on. The candles are blown out.";
  }

  return (
    <CardShell withBeam={isLive}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
          <ChefHat className="h-3.5 w-3.5" strokeWidth={1.4} />
          On the pass
        </p>
        {isLive && (
          <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.45em] text-emerald-300/90">
            <motion.span
              className="block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            Live
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-3xl leading-tight text-ivory md:text-4xl">
        {title}
      </h3>
      <p className="mt-2 font-serif text-base italic text-ivory/65">{detail}</p>

      {course && (
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gold-400/15 pt-5 md:grid-cols-2">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-gold-300/65">
              French
            </p>
            <p className="mt-1 font-serif text-base italic text-ivory/85">
              {course.french}
            </p>
          </div>
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-gold-300/65">
              Pairing
            </p>
            <p className="mt-1 font-serif text-base italic text-ivory/85">
              {course.pairing}
            </p>
          </div>
        </div>
      )}

      {isBetween && (
        <div className="mt-6 border-t border-gold-400/15 pt-5">
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-gold-300/65">
            On their plates now
          </p>
          <p className="mt-1 font-serif text-base italic text-ivory/70">
            Wine, water, conversation. The next course is on its way.
          </p>
        </div>
      )}
    </CardShell>
  );
}

function activeCourse(c: { french: string; pairing: string; image: string }) {
  return c;
}

function ChefNoteCard({ now }: { now: Date | null }) {
  const dateLabel = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Paris",
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(now)
    : "—";
  return (
    <CardShell>
      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
        Chef's note
      </p>
      <FleurDeLis className="mt-4 h-5 w-5 text-gold-300/70" />
      <p className="mt-4 font-serif text-lg italic leading-snug text-ivory/85">
        "The pigeon is from Anjou today. Pick it up with your fingers."
      </p>
      <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/45">
        {dateLabel}
      </p>
    </CardShell>
  );
}
