"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { OrnateFrame } from "@/components/ui/ornaments";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  CalendarBlank,
  Clock,
  Users,
  EnvelopeSimple,
  User,
  Phone,
  Confetti,
  NotePencil,
  CheckCircle,
  WarningCircle,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";

type FormState = {
  name: string;
  email: string;
  phone: string;
  partySize: string;
  date: string;
  time: string;
  menu: string;
  occasion: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  partySize: "2",
  date: "",
  time: "19:30",
  menu: "Le Carnet — 12 courses",
  occasion: "",
  notes: "",
};

const times = ["19:00", "19:30", "20:00", "20:30", "21:00"];
const menusList = ["Le Carnet — 12 courses", "Le Jardin — 8 courses"];

export function Reserve() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          partySize: Number(form.partySize),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not submit.");
      setStatus({ kind: "success", message: data.message });
      setForm(initial);
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return (
    <section
      id="reserve"
      className="relative overflow-hidden bg-noir-900 py-32 md:py-48"
    >
      {/* Decorative image side */}
      <div className="container-luxe relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative md:col-span-5">
          <div className="sticky top-32">
            <p className="eyebrow reveal mb-6">Reservations — Chapter VI</p>
            <h2 className="reveal font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
              Take a{" "}
              <span className="italic font-serif font-light gold-text">
                seat
              </span>
              .
            </h2>

            <div className="reveal relative mt-12 aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1400&q=85"
                alt="Maison Noir candlelit table"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-noir-900/30 to-transparent" />
              <BorderBeam duration={14} />
              <OrnateFrame className="text-gold-300/60" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <p className="font-display text-2xl">Two seatings nightly</p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
                  19:00 · 21:00 — Tuesday through Saturday
                </p>
              </div>
            </div>

            <div className="reveal mt-10 space-y-5 font-serif text-base text-ivory/70">
              <p>
                Reservations open ninety days in advance and close when the
                room is full — which is most evenings. We will write back
                within twenty-four hours to confirm.
              </p>
              <p className="text-ivory/55 text-sm">
                A 50% deposit is required to confirm your seats. The full
                tasting menu is served to the entire table.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal md:col-span-7"
          noValidate
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Full name" required icon={<User weight="thin" />}>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" required icon={<EnvelopeSimple weight="thin" />}>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                placeholder="you@domain.com"
              />
            </Field>
            <Field label="Telephone" icon={<Phone weight="thin" />}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                placeholder="+33 …"
              />
            </Field>
            <Field label="Party size" required icon={<Users weight="thin" />}>
              <select
                required
                value={form.partySize}
                onChange={(e) => update("partySize", e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-noir-900 text-ivory">
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date" required icon={<CalendarBlank weight="thin" />}>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Seating" icon={<Clock weight="thin" />}>
              <div className="flex flex-wrap gap-2 pt-2">
                {times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => update("time", t)}
                    className={cn(
                      "border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.3em] transition-colors",
                      form.time === t
                        ? "border-gold-400 bg-gold-400/10 text-gold-200"
                        : "border-gold-400/20 text-ivory/60 hover:border-gold-400/60 hover:text-ivory"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Menu" className="md:col-span-2">
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {menusList.map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => update("menu", m)}
                    className={cn(
                      "group flex items-center justify-between border px-5 py-4 text-left transition-all",
                      form.menu === m
                        ? "border-gold-400 bg-gold-400/[0.06]"
                        : "border-gold-400/15 hover:border-gold-400/50"
                    )}
                  >
                    <span>
                      <span className="block font-display text-xl text-ivory">
                        {m.split("—")[0].trim()}
                      </span>
                      <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.35em] text-ivory/55">
                        {m.split("—")[1]?.trim()}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "h-3 w-3 rounded-full border transition-colors",
                        form.menu === m
                          ? "border-gold-400 bg-gold-300"
                          : "border-gold-400/40"
                      )}
                    />
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Occasion" icon={<Confetti weight="thin" />}>
              <input
                type="text"
                value={form.occasion}
                onChange={(e) => update("occasion", e.target.value)}
                className={inputClass}
                placeholder="Anniversary, business, …"
              />
            </Field>
            <Field label="Allergies / notes" icon={<NotePencil weight="thin" />}>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={inputClass}
                placeholder="Anything we should know"
              />
            </Field>
          </div>

          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/45">
              By submitting, you agree to our reservation policy.
            </p>
            <Magnetic strength={0.35}>
              <button
                type="submit"
                disabled={status.kind === "loading"}
                className={cn(
                  "btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <span>
                  {status.kind === "loading"
                    ? "Sending…"
                    : "Request reservation"}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </Magnetic>
          </div>

          {status.kind === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-8 flex items-start gap-4 overflow-hidden border border-gold-400/30 bg-gold-400/5 p-5 font-serif text-base italic text-gold-100"
            >
              <CheckCircle weight="thin" className="h-6 w-6 shrink-0 text-gold-300" />
              <span>{status.message}</span>
              <BorderBeam duration={5} />
            </motion.div>
          )}
          {status.kind === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-start gap-4 border border-wine-500/40 bg-wine-700/20 p-5 font-serif text-base italic text-ivory/90"
            >
              <WarningCircle weight="thin" className="h-6 w-6 shrink-0 text-wine-400" />
              <span>{status.message}</span>
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full border-0 border-b border-gold-400/20 bg-transparent px-0 py-3 font-serif text-lg text-ivory placeholder-ivory/30 outline-none transition-colors focus:border-gold-400";

function Field({
  label,
  children,
  required,
  className,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
        {icon && (
          <span className="grid h-4 w-4 place-items-center text-gold-300">
            {icon}
          </span>
        )}
        <span>
          {label}
          {required && <span className="ml-1 text-gold-400">*</span>}
        </span>
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
