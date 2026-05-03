"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { MichelinStar } from "@/components/ui/ornaments";
import { LiveStatusBadge } from "@/components/ui/live-status";

const links = [
  { href: "#story", label: "The House" },
  { href: "#menu", label: "Menus" },
  { href: "#chef", label: "The Chef" },
  { href: "#gallery", label: "Gallery" },
  { href: "#press", label: "Press" },
  { href: "#reserve", label: "Reservations" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-noir-950/80 backdrop-blur-xl"
            : "bg-transparent backdrop-blur-0"
        )}
      >
        <div className="container-luxe flex h-20 items-center justify-between md:h-24">
          <Magnetic strength={0.2}>
            <a
              href="#top"
              className="group flex items-center gap-3 text-ivory"
              aria-label="Maison Noir — home"
            >
              <span className="relative grid h-9 w-9 place-items-center">
                <svg
                  viewBox="0 0 36 36"
                  className="absolute inset-0 h-full w-full animate-spin-slow"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    className="text-gold-400/60"
                    strokeDasharray="2 4"
                  />
                </svg>
                <svg
                  viewBox="0 0 32 32"
                  className="relative h-5 w-5 transition-transform duration-700 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                >
                  <path
                    d="M6 26 L16 6 L26 26 L16 18 Z"
                    className="text-gold-300"
                    fill="currentColor"
                    fillOpacity="0.18"
                  />
                </svg>
              </span>
              <div className="leading-none">
                <span className="block font-display text-xl tracking-wide">
                  Maison <em className="font-serif italic font-light">Noir</em>
                </span>
                <span className="flex items-center gap-1 font-sans text-[9px] uppercase tracking-[0.45em] text-gold-300/80">
                  <MichelinStar className="h-2 w-2" />
                  <MichelinStar className="h-2 w-2" />
                  <MichelinStar className="h-2 w-2" />
                  <span>· Paris</span>
                </span>
              </div>
            </a>
          </Magnetic>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-sans text-[11px] uppercase tracking-[0.32em] text-ivory/75 transition-colors hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold-300 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <span className="block h-4 w-px bg-gold-400/30" />
            <LiveStatusBadge />
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.3}>
              <a href="#reserve" className="hidden md:inline-flex btn-gold">
                <span>Reserve</span>
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-12 w-12 place-items-center border border-gold-400/30 text-ivory transition-colors hover:border-gold-400 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-noir-950"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-0 bg-noir-900/95 backdrop-blur-3xl"
            >
              <div className="container-luxe flex h-20 items-center justify-between md:h-24">
                <span className="font-display text-2xl text-ivory">
                  Maison <em className="font-serif italic font-light">Noir</em>
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-12 w-12 place-items-center border border-gold-400/30 text-ivory transition-colors hover:border-gold-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="container-luxe mt-16 flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.7 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group block border-b border-gold-400/10 py-6"
                    >
                      <span className="flex items-baseline justify-between">
                        <span className="font-display text-4xl text-ivory transition-colors group-hover:text-gold-300 md:text-6xl">
                          {link.label}
                        </span>
                        <span className="font-sans text-xs tracking-[0.4em] text-gold-300/60">
                          0{i + 1}
                        </span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
