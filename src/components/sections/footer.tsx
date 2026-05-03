"use client";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-noir-950 pt-32">
      {/* Massive aspirational mark */}
      <div className="container-luxe relative">
        <h3
          aria-hidden
          className="font-display text-[28vw] leading-[0.8] text-stroke opacity-30"
        >
          Maison
        </h3>
        <h3
          aria-hidden
          className="-mt-6 text-right font-display text-[28vw] leading-[0.8] text-stroke opacity-30"
        >
          <span className="italic font-serif font-light">Noir.</span>
        </h3>
      </div>

      <div className="container-luxe relative grid grid-cols-1 gap-12 border-t border-gold-400/15 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-3xl text-ivory">
            Maison <span className="italic font-serif font-light">Noir</span>
          </p>
          <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
            ★★★ · Three Michelin Stars
          </p>
          <p className="mt-8 font-serif text-base italic text-ivory/65">
            "We do not serve dinner. We stage it."
          </p>
        </div>

        <FooterCol
          title="The House"
          items={[
            { label: "12 rue des Saints-Pères", href: "#" },
            { label: "75006 Paris, France", href: "#" },
            { label: "+33 1 42 60 33 24", href: "tel:+33142603324" },
            { label: "concierge@maisonnoir.fr", href: "mailto:concierge@maisonnoir.fr" },
          ]}
        />

        <FooterCol
          title="Hours"
          items={[
            { label: "Tuesday — Saturday", href: "#" },
            { label: "First seating · 19:00", href: "#" },
            { label: "Second seating · 21:00", href: "#" },
            { label: "Closed Sunday & Monday", href: "#" },
          ]}
        />

        <FooterCol
          title="Follow"
          items={[
            { label: "Instagram", href: "#" },
            { label: "Le Carnet — newsletter", href: "#" },
            { label: "Press kit", href: "#" },
            { label: "Private events", href: "#" },
          ]}
        />
      </div>

      <div className="container-luxe flex flex-col items-start justify-between gap-4 border-t border-gold-400/10 py-8 text-[10px] uppercase tracking-[0.4em] text-ivory/40 md:flex-row">
        <span>© {new Date().getFullYear()} Maison Noir · All rights reserved</span>
        <span>Crafted in Paris · Hosted on Vercel · Powered by Turso</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-3">
      <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
        {title}
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.href}
              className="group inline-flex items-center gap-2 font-serif text-base text-ivory/75 transition-colors hover:text-gold-200"
            >
              <span>{item.label}</span>
              <span
                aria-hidden
                className="block h-px w-0 bg-gold-300 transition-all duration-500 group-hover:w-6"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
