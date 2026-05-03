"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Envelope, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Magnetic } from "./magnetic";
import { BorderBeam } from "./border-beam";
import { OrnateFrame, FleurDeLis } from "./ornaments";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

/**
 * "Le Carnet" — quarterly letter from the house. Single-input subscription
 * form with elegant success state. POSTs to /api/newsletter (Turso-backed
 * with a graceful preview fallback).
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not subscribe.");
      setState({ kind: "success", message: data.message });
      setEmail("");
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Could not subscribe.",
      });
    }
  }

  return (
    <div className="relative overflow-hidden border border-gold-400/25 bg-noir-950/70 p-8 md:p-10">
      <OrnateFrame className="text-gold-300/40" />
      {state.kind === "success" && <BorderBeam duration={6} />}

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <p className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
            <FleurDeLis className="h-4 w-4" />
            Le Carnet
          </p>
          <h3 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
            A letter, four times a year.
          </h3>
          <p className="mt-4 max-w-md font-serif text-base italic text-ivory/65">
            We write at each equinox and each solstice — the new menu, the
            cellar's recent acquisitions, occasionally a recipe. No
            advertisements, ever.
          </p>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7" noValidate>
          <AnimatePresence mode="wait">
            {state.kind === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 border border-gold-400/30 bg-gold-400/5 p-5"
              >
                <CheckCircle weight="thin" className="h-6 w-6 shrink-0 text-gold-300" />
                <p className="font-serif text-base italic text-gold-100">
                  {state.message}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <label className="block">
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
                    Your email
                  </span>
                  <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <span className="relative flex-1">
                      <Envelope
                        weight="thin"
                        className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-300/70"
                      />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full border-0 border-b border-gold-400/25 bg-transparent py-3 pl-7 pr-3 font-serif text-lg text-ivory placeholder-ivory/30 outline-none transition-colors focus:border-gold-400"
                      />
                    </span>
                    <Magnetic strength={0.3}>
                      <button
                        type="submit"
                        disabled={state.kind === "loading"}
                        className="btn-gold whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span>
                          {state.kind === "loading"
                            ? "Subscribing…"
                            : "S'abonner"}
                        </span>
                        <span aria-hidden>→</span>
                      </button>
                    </Magnetic>
                  </div>
                </label>

                <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.35em] text-ivory/40">
                  Four letters a year · unsubscribe with one click
                </p>

                {state.kind === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-start gap-3 border border-wine-500/40 bg-wine-700/15 p-4 font-serif text-sm italic text-ivory/85"
                  >
                    <WarningCircle weight="thin" className="h-5 w-5 shrink-0 text-wine-400" />
                    <span>{state.message}</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
