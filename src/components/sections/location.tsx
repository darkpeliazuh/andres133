"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { OrnateFrame, FleurDeLis } from "@/components/ui/ornaments";
import { LiveStatusBadge } from "@/components/ui/live-status";
import { ArrowUpRight, Train, Car, Bike } from "lucide-react";

/**
 * Location section — a stylised hand-drawn map of the streets around the
 * restaurant in the 6th arrondissement, with an animated pin at the door,
 * compass rose, coordinates and access info.
 */
export function Location() {
  return (
    <section
      id="location"
      className="relative overflow-hidden bg-noir-900 py-32 md:py-44"
    >
      <div className="container-luxe relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5 md:pt-8">
          <p className="eyebrow reveal mb-6">Maison & adresse — Chapter VII</p>
          <h2 className="reveal font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
            A door on{" "}
            <span className="italic font-serif font-light gold-text">
              rue des Saints-Pères
            </span>
            .
          </h2>
          <p className="reveal mt-8 max-w-md font-serif text-lg italic text-ivory/70">
            Tucked between an antiquarian bookseller and a haberdasher's
            workshop. There is no sign — only a candle in the window, lit at
            half past six.
          </p>

          <div className="reveal mt-10 space-y-3">
            <div>
              <p className="font-display text-2xl text-ivory">
                12 rue des Saints-Pères
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold-300/80">
                75006 Paris · France
              </p>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/45">
              48° 51′ 24″ N · 2° 21′ 03″ E
            </p>
          </div>

          <div className="reveal mt-10">
            <LiveStatusBadge variant="full" />
          </div>

          <ul className="reveal mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AccessRow
              icon={<Train className="h-4 w-4" strokeWidth={1.2} />}
              label="Métro Saint-Germain"
              detail="Line 4 · 4 min walk"
            />
            <AccessRow
              icon={<Car className="h-4 w-4" strokeWidth={1.2} />}
              label="Voiturier"
              detail="On request · from 18:30"
            />
            <AccessRow
              icon={<Bike className="h-4 w-4" strokeWidth={1.2} />}
              label="Vélib' Bonaparte"
              detail="2 min · 8 stands"
            />
          </ul>

          <div className="reveal mt-10">
            <Magnetic strength={0.35}>
              <a
                href="https://www.google.com/maps/?q=48.85677,2.33417"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>Open in Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="reveal md:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold-400/20 bg-noir-950 md:aspect-square">
            <MapSVG />
            <OrnateFrame className="text-gold-300/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessRow({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <li className="border-t border-gold-400/15 pt-4">
      <div className="flex items-center gap-2 text-gold-300/80">
        {icon}
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
          {label}
        </span>
      </div>
      <p className="mt-2 font-serif text-base italic text-ivory/70">{detail}</p>
    </li>
  );
}

function MapSVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="48%" r="38%">
          <stop offset="0%" stopColor="#caa23a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#050402" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="map-grid"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 40 0 L 0 0 0 40" stroke="#caa23a" strokeOpacity="0.05" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Glow */}
      <rect x="0" y="0" width="600" height="600" fill="url(#map-glow)" />
      {/* Grid */}
      <rect x="0" y="0" width="600" height="600" fill="url(#map-grid)" />

      {/* The Seine — soft curve */}
      <motion.path
        d="M -20 470 Q 120 400 240 440 T 480 410 T 640 380"
        stroke="#caa23a"
        strokeOpacity="0.45"
        strokeWidth="14"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M -20 470 Q 120 400 240 440 T 480 410 T 640 380"
        stroke="#f5ebc4"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      <text
        x="100"
        y="500"
        className="fill-gold-300/50"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14 }}
      >
        La Seine
      </text>

      {/* Streets */}
      {[
        "M 80 80 L 520 120",
        "M 60 220 L 540 250",
        "M 120 330 L 560 340",
        "M 50 540 L 540 560",
        "M 160 50 L 200 580",
        "M 300 60 L 320 580",
        "M 460 50 L 480 580",
        "M 90 130 L 540 320",
        "M 220 80 L 540 540",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#ead592"
          strokeOpacity="0.12"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.6,
            delay: 0.05 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {/* Little blocks */}
      {[
        [120, 170, 60, 30],
        [240, 280, 50, 40],
        [380, 180, 70, 35],
        [470, 290, 50, 25],
        [180, 380, 80, 30],
        [330, 410, 60, 30],
        [430, 460, 70, 40],
      ].map(([x, y, w, h], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="none"
          stroke="#ead592"
          strokeOpacity="0.18"
          strokeWidth="0.6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + 0.05 * i, duration: 0.8 }}
          style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
        />
      ))}

      {/* Street labels */}
      <text x="170" y="105" className="fill-ivory/40" style={labelStyle}>
        Bd. Saint-Germain
      </text>
      <text x="80" y="245" className="fill-ivory/35" style={labelStyle}>
        Rue de Sèvres
      </text>
      <text x="360" y="358" className="fill-ivory/35" style={labelStyle}>
        Quai Voltaire
      </text>
      <text x="305" y="80" className="fill-ivory/40" style={{ ...labelStyle, writingMode: "vertical-rl" }}>
        Rue des Saints-Pères
      </text>

      {/* Compass */}
      <g transform="translate(540, 70)" className="text-gold-300">
        <circle cx="0" cy="0" r="22" stroke="currentColor" strokeOpacity="0.4" />
        <path d="M 0 -16 L 4 0 L 0 16 L -4 0 Z" fill="currentColor" fillOpacity="0.7" />
        <text x="0" y="-26" textAnchor="middle" style={{ ...labelStyle, fontSize: 9 }} className="fill-gold-300">
          N
        </text>
      </g>

      {/* The pin — animated */}
      <PinMarker x={300} y={300} />
    </svg>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 9,
  letterSpacing: "0.3em",
  textTransform: "uppercase",
};

function PinMarker({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Concentric pulse rings */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.circle
          key={i}
          cx="0"
          cy="0"
          r="20"
          stroke="#ead592"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.6, 0], scale: [0.5, 3.4] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Outer ring */}
      <circle cx="0" cy="0" r="14" fill="#050402" stroke="#caa23a" strokeWidth="1.2" />
      {/* Inner gold dot */}
      <circle
        cx="0"
        cy="0"
        r="6"
        fill="url(#pin-grad)"
      />
      <defs>
        <radialGradient id="pin-grad" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fbf6e6" />
          <stop offset="100%" stopColor="#caa23a" />
        </radialGradient>
      </defs>
      {/* Cross-hairs */}
      <line x1="-26" y1="0" x2="-18" y2="0" stroke="#caa23a" strokeWidth="0.8" />
      <line x1="18" y1="0" x2="26" y2="0" stroke="#caa23a" strokeWidth="0.8" />
      <line x1="0" y1="-26" x2="0" y2="-18" stroke="#caa23a" strokeWidth="0.8" />
      <line x1="0" y1="18" x2="0" y2="26" stroke="#caa23a" strokeWidth="0.8" />

      {/* Label */}
      <g transform="translate(20, -28)">
        <rect
          x="0"
          y="-12"
          width="148"
          height="22"
          fill="#050402"
          stroke="#caa23a"
          strokeOpacity="0.5"
        />
        <text
          x="8"
          y="2"
          className="fill-gold-200"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          Maison Noir · est. 1924
        </text>
      </g>
    </g>
  );
}
