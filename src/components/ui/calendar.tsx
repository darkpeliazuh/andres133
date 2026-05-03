"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_DAYS, type DayCode } from "@/lib/hours";

type Props = {
  /** ISO date (YYYY-MM-DD) currently selected */
  value: string;
  onChange: (iso: string) => void;
  /** How many months forward bookings open */
  monthsAhead?: number;
};

/**
 * A reservations calendar — month grid that grays out closed days
 * (Sun/Mon), marks the past as unavailable, and shows a deterministic
 * "fullness" dot per service day so the visitor can tell at a glance which
 * nights still have room. Selecting a date emits an ISO YYYY-MM-DD.
 */
export function Calendar({ value, onChange, monthsAhead = 3 }: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialMonth = useMemo(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [value, today]);
  const [month, setMonth] = useState(initialMonth);

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(
    today.getFullYear(),
    today.getMonth() + monthsAhead,
    1
  );

  const cells = useMemo(() => buildMonthCells(month), [month]);

  return (
    <div className="border border-gold-400/20 bg-noir-900/40 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setMonth(addMonths(month, -1))}
          disabled={month <= minMonth}
          className="grid h-8 w-8 place-items-center border border-gold-400/20 text-gold-200 transition-colors hover:border-gold-300 hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={month.toISOString()}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="font-display text-2xl text-ivory">
              {month.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.4em] text-gold-300/65">
              Tap a date to begin
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(addMonths(month, 1))}
          disabled={month >= maxMonth}
          className="grid h-8 w-8 place-items-center border border-gold-400/20 text-gold-200 transition-colors hover:border-gold-300 hover:bg-gold-400/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
        </button>
      </div>

      {/* Weekday header */}
      <div className="mt-5 grid grid-cols-7 gap-1 font-sans text-[9px] uppercase tracking-[0.3em] text-ivory/40">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="grid h-6 place-items-center">
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) {
            return <span key={i} className="aspect-square" />;
          }
          const iso = toISO(cell);
          const isPast = cell < today;
          const isClosed = !SERVICE_DAYS.includes(cell.getDay() as DayCode);
          const isDisabled = isPast || isClosed;
          const isSelected = iso === value;
          const fullness = serviceFullness(iso);

          return (
            <button
              type="button"
              key={i}
              disabled={isDisabled}
              onClick={() => onChange(iso)}
              aria-label={cell.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              aria-current={isSelected}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center border transition-all",
                isSelected
                  ? "border-gold-400 bg-gold-400/15 text-ivory"
                  : isDisabled
                  ? "border-transparent text-ivory/25"
                  : "border-gold-400/10 text-ivory/85 hover:border-gold-400/60 hover:bg-gold-400/[0.06]"
              )}
            >
              <span className="font-display text-lg">{cell.getDate()}</span>
              <span className="absolute inset-x-0 bottom-1 flex justify-center gap-0.5">
                {!isDisabled && (
                  <>
                    <span
                      className={cn(
                        "block h-1 w-1 rounded-full",
                        fullness >= 1
                          ? "bg-gold-300"
                          : "bg-gold-400/20"
                      )}
                    />
                    <span
                      className={cn(
                        "block h-1 w-1 rounded-full",
                        fullness >= 2
                          ? "bg-gold-300"
                          : "bg-gold-400/20"
                      )}
                    />
                  </>
                )}
              </span>
              {isClosed && !isPast && (
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="block h-px w-3/5 rotate-45 bg-ivory/15" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold-400/10 pt-4 font-sans text-[9px] uppercase tracking-[0.3em] text-ivory/55">
        <Legend dotClass="bg-gold-300" label="Available" />
        <Legend dotClass="bg-gold-400/30" label="Limited" />
        <Legend label="Closed" mark />
      </div>
    </div>
  );
}

function Legend({
  dotClass,
  label,
  mark = false,
}: {
  dotClass?: string;
  label: string;
  mark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {mark ? (
        <span className="relative grid h-3 w-3 place-items-center border border-ivory/15">
          <span className="block h-px w-full rotate-45 bg-ivory/30" />
        </span>
      ) : (
        <span className="flex gap-0.5">
          <span className={cn("block h-1.5 w-1.5 rounded-full", dotClass)} />
          <span className={cn("block h-1.5 w-1.5 rounded-full", dotClass)} />
        </span>
      )}
      {label}
    </span>
  );
}

// ---- helpers ----

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildMonthCells(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startOffset = (first.getDay() + 6) % 7; // Monday-first
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** Returns 0 (full), 1 (limited), or 2 (open) — deterministic per ISO date. */
function serviceFullness(iso: string): 0 | 1 | 2 {
  let h = 0;
  for (let i = 0; i < iso.length; i++) h = (h * 31 + iso.charCodeAt(i)) >>> 0;
  const v = h % 10;
  if (v === 0) return 0;
  if (v <= 3) return 1;
  return 2;
}
