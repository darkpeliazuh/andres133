"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  EnvelopeSimple,
  Clock,
  MapPin,
  X,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { LiveStatusBadge } from "./live-status";

/**
 * A floating "Concierge" widget — sits opposite the AmbientToggle. Click it
 * to expand a card with live status, phone, email, address, hours and a
 * one-tap reservation link. Dark glass surface with a hairline gold border.
 */
export function Concierge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[22rem] overflow-hidden border border-gold-400/30 bg-noir-900/85 p-6 backdrop-blur-2xl shadow-deep"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/85">
                  <Sparkle weight="fill" className="h-3 w-3" />
                  Le Concierge
                </p>
                <p className="mt-2 font-display text-2xl text-ivory">
                  At your service
                </p>
              </div>
              <button
                type="button"
                aria-label="Close concierge"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center border border-gold-400/30 text-ivory/70 transition-colors hover:border-gold-400 hover:text-ivory"
              >
                <X weight="thin" className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-5">
              <LiveStatusBadge variant="full" />
            </div>

            <ul className="mt-6 space-y-3 border-t border-gold-400/15 pt-5 font-serif text-sm text-ivory/80">
              <Row
                icon={<Phone weight="thin" />}
                href="tel:+33142603324"
                label="+33 1 42 60 33 24"
                hint="Reservations · 24/7"
              />
              <Row
                icon={<EnvelopeSimple weight="thin" />}
                href="mailto:concierge@maisonnoir.fr"
                label="concierge@maisonnoir.fr"
                hint="Private events"
              />
              <Row
                icon={<MapPin weight="thin" />}
                href="#location"
                label="12 rue des Saints-Pères"
                hint="Paris 6ᵉ"
              />
              <Row
                icon={<Clock weight="thin" />}
                label="Two seatings · 19:00 & 21:00"
                hint="Tuesday — Saturday"
              />
            </ul>

            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="btn-gold mt-6 w-full justify-center"
            >
              <span>Request a table</span>
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group flex items-center gap-3 border border-gold-400/35 bg-noir-900/70 px-4 py-3 backdrop-blur-md transition-all hover:border-gold-300 hover:bg-noir-800/80"
            aria-label="Open concierge"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400/10 text-gold-200 transition-colors group-hover:bg-gold-400/20">
              <Sparkle weight="fill" className="h-3.5 w-3.5" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="font-sans text-[9px] uppercase tracking-[0.45em] text-gold-300/80">
                Le Concierge
              </span>
              <LiveStatusBadge variant="compact" className="text-ivory/80" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({
  icon,
  label,
  hint,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  href?: string;
}) {
  const Comp = href ? "a" : "div";
  return (
    <li>
      <Comp
        {...(href ? { href } : {})}
        className="group flex items-center gap-3 transition-colors hover:text-gold-200"
      >
        <span className="grid h-7 w-7 place-items-center border border-gold-400/20 text-gold-300/85 transition-colors group-hover:border-gold-400 group-hover:text-gold-300">
          <span className="block h-3.5 w-3.5">{icon}</span>
        </span>
        <span className="flex flex-1 items-baseline justify-between gap-3">
          <span className="font-serif text-[15px] text-ivory/85 group-hover:text-gold-100">
            {label}
          </span>
          {hint && (
            <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-ivory/40">
              {hint}
            </span>
          )}
        </span>
      </Comp>
    </li>
  );
}
