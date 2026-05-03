/**
 * Service hours for Maison Noir.
 *
 * Tuesday → Saturday only. Two seatings: 19:00 and 21:00. The dining room
 * stops accepting first courses at 21:30 and closes after the last guest
 * around 23:30 — for the "Open Now" indicator we treat 18:30–23:30 as live
 * service on those days. (Lunch service is reserved for private hire.)
 */

const PARIS_TZ = "Europe/Paris";

export type DayCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const SERVICE_DAYS: DayCode[] = [2, 3, 4, 5, 6]; // Tue → Sat
export const SERVICE_OPEN_MIN = 18 * 60 + 30; // 18:30
export const SERVICE_CLOSE_MIN = 23 * 60 + 30; // 23:30
export const FIRST_SEATING_MIN = 19 * 60; // 19:00
export const SECOND_SEATING_MIN = 21 * 60; // 21:00

export type LiveStatus =
  | { state: "open"; minutesUntilClose: number; nextSeatingMin: number | null }
  | { state: "soon"; minutesUntilOpen: number }
  | { state: "closed"; nextOpenLabel: string }
  | { state: "closed-day"; nextOpenLabel: string };

/**
 * Returns the wall-clock minute-of-day and day-of-week for a given Date,
 * computed in Europe/Paris regardless of the viewer's timezone. Uses
 * Intl.DateTimeFormat to avoid pulling a TZ library.
 */
export function partsInParis(now: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: PARIS_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const dayMap: Record<string, DayCode> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return {
    day: dayMap[weekday] ?? 1,
    minute: hour * 60 + minute,
    hour,
  };
}

export function computeStatus(now: Date = new Date()): LiveStatus {
  const { day, minute } = partsInParis(now);
  const isServiceDay = SERVICE_DAYS.includes(day as DayCode);

  if (isServiceDay && minute >= SERVICE_OPEN_MIN && minute < SERVICE_CLOSE_MIN) {
    const minutesUntilClose = SERVICE_CLOSE_MIN - minute;
    const nextSeatingMin =
      minute < FIRST_SEATING_MIN
        ? FIRST_SEATING_MIN
        : minute < SECOND_SEATING_MIN
        ? SECOND_SEATING_MIN
        : null;
    return { state: "open", minutesUntilClose, nextSeatingMin };
  }

  if (isServiceDay && minute < SERVICE_OPEN_MIN) {
    return { state: "soon", minutesUntilOpen: SERVICE_OPEN_MIN - minute };
  }

  // Closed today (either non-service day, or after close)
  const nextOpenLabel = nextOpeningLabel(day as DayCode, minute);
  if (!isServiceDay) return { state: "closed-day", nextOpenLabel };
  return { state: "closed", nextOpenLabel };
}

function nextOpeningLabel(day: DayCode, minute: number): string {
  const dayNames: Record<DayCode, string> = {
    0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday",
  };
  // Same-day reopening is impossible — service ends at 23:30
  let cursor = (day + 1) % 7;
  let safety = 0;
  while (safety++ < 8) {
    if (SERVICE_DAYS.includes(cursor as DayCode)) {
      return `${dayNames[cursor as DayCode]} · 18:30`;
    }
    cursor = ((cursor + 1) % 7) as DayCode;
  }
  return "Tuesday · 18:30";
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m.toString().padStart(2, "0")}`;
}

export function minutesToHHMM(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
}

/**
 * Deterministic "seats remaining tonight" calculation, derived from the date
 * so it stays stable across SSR / CSR and across re-renders within the same
 * day. Returns 0–8 free seats out of 36 (18 per seating).
 */
export function seatsRemainingFor(now: Date = new Date()): number {
  const { day } = partsInParis(now);
  if (!SERVICE_DAYS.includes(day as DayCode)) return 0;
  const dStr = new Intl.DateTimeFormat("en-CA", { timeZone: PARIS_TZ }).format(now);
  let h = 0;
  for (let i = 0; i < dStr.length; i++) h = (h * 31 + dStr.charCodeAt(i)) >>> 0;
  return h % 9;
}
