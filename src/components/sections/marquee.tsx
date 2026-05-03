"use client";

const phrases = [
  "★★★ Guide Michelin",
  "World's 50 Best · 2024",
  "Relais & Châteaux",
  "Chef of the Year — Le Chef Magazine",
  "Grand Award — Wine Spectator",
  "Maison Noir · Paris",
];

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative z-20 overflow-hidden border-y border-gold-400/15 bg-noir-900/60 py-6 backdrop-blur-sm"
    >
      <div className="flex animate-marquee-x whitespace-nowrap will-change-transform">
        {[...phrases, ...phrases, ...phrases].map((p, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-10 font-display text-3xl text-ivory/80 md:text-4xl"
          >
            {p}
            <span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
