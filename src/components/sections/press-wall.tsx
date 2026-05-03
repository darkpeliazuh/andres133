"use client";

/**
 * "Press wall" — a continuous, double-tracked marquee of magazine-style
 * wordmarks. No external SVGs: every logo is hand-typeset with the site's
 * own fonts and a subtle treatment so the wall reads as a single curated
 * object rather than a logo soup.
 */

type Logo = {
  name: string;
  // CSS classes applied to the wordmark — controls the typographic treatment.
  font: string;
  italic?: boolean;
  uppercase?: boolean;
  tracking?: string;
  weight?: string;
};

const logos: Logo[] = [
  { name: "Le Monde", font: "font-display", uppercase: true, tracking: "tracking-[0.18em]" },
  { name: "Vogue Paris", font: "font-display", uppercase: true, tracking: "tracking-[0.42em]" },
  { name: "Financial Times", font: "font-serif", italic: true, weight: "font-medium" },
  { name: "Le Figaro", font: "font-display", italic: true, tracking: "tracking-[0.05em]" },
  { name: "Wallpaper*", font: "font-sans", weight: "font-semibold", tracking: "tracking-[0.3em]", uppercase: true },
  { name: "The New York Times", font: "font-display", tracking: "tracking-[0.05em]" },
  { name: "Condé Nast Traveller", font: "font-display", uppercase: true, tracking: "tracking-[0.3em]" },
  { name: "Le Chef", font: "font-serif", italic: true, weight: "font-semibold" },
  { name: "Gault & Millau", font: "font-display", tracking: "tracking-[0.1em]" },
  { name: "Robb Report", font: "font-display", uppercase: true, tracking: "tracking-[0.4em]" },
];

export function PressWall() {
  return (
    <section
      aria-labelledby="press-wall-title"
      className="relative overflow-hidden bg-noir-900 py-24"
    >
      <div className="container-luxe">
        <p
          id="press-wall-title"
          className="reveal mb-10 flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.45em] text-gold-300/80"
        >
          <span className="block h-px w-10 bg-gold-400/40" />
          As written about in
          <span className="block h-px flex-1 bg-gold-400/20" />
        </p>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-noir-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-noir-900 to-transparent" />

        <div className="flex animate-marquee-x whitespace-nowrap py-2 will-change-transform">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className={[
                "mx-10 inline-flex items-center text-3xl text-ivory/55 transition-colors hover:text-gold-200 md:text-4xl",
                logo.font,
                logo.italic ? "italic" : "",
                logo.uppercase ? "uppercase" : "",
                logo.tracking ?? "",
                logo.weight ?? "font-light",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {logo.name}
              <span className="ml-10 text-gold-400/50">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
