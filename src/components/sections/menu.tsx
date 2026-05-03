"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Course = {
  no: string;
  name: string;
  french: string;
  desc: string;
  pairing: string;
  image: string;
};

const menus: Record<string, Course[]> = {
  "Le Carnet — 12 courses": [
    {
      no: "I",
      name: "The Overture",
      french: "Caviar Osciètre · Buckwheat · Crème fraîche de Normandie",
      desc: "A single spoon. The whole evening, condensed.",
      pairing: "Champagne Salon, Le Mesnil 2013",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "II",
      name: "From the Cold Atlantic",
      french: "Langoustine de Loctudy · Sauce Albuféra · Verbena oil",
      desc: "Caught at dawn, plated before the candles are lit.",
      pairing: "Chablis 1er Cru ‘Montée de Tonnerre’ 2019",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "III",
      name: "Theatre of the Garden",
      french: "Heirloom tomato · Burnt honey · Goat curd · Basil ash",
      desc: "Forty varieties, one farm, one Tuesday in August.",
      pairing: "Sancerre ‘Les Monts Damnés’ 2020",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "IV",
      name: "Pigeon, Royale",
      french: "Pigeonneau d'Anjou · Beetroot · Blackcurrant · Foie gras",
      desc: "Roasted whole, carved tableside, served by candle.",
      pairing: "Volnay 1er Cru ‘Les Caillerets’ 2017",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "V",
      name: "Apricot, in Three Acts",
      french: "Compote · Sorbet · Soufflé chaud, miel des Cévennes",
      desc: "The end of summer, written in three movements.",
      pairing: "Coteaux du Layon, Domaine Pithon 2018",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "VI",
      name: "The Final Curtain",
      french: "Chocolat Grand Cru · Olive · Salt of Guérande",
      desc: "Bitter, brilliant, brief.",
      pairing: "Banyuls Rimage, Domaine la Tour Vieille 2019",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1400&q=85",
    },
  ],
  "Le Jardin — 8 courses": [
    {
      no: "I",
      name: "Petit Pois",
      french: "Pea · Mint · Sheep's milk",
      desc: "Picked at first light from our garden in Versailles.",
      pairing: "Riesling Grand Cru ‘Schoenenbourg’ 2020",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "II",
      name: "Beetroot, Aged",
      french: "Roasted three days · Smoked yogurt · Sorrel",
      desc: "What the earth tastes like in November.",
      pairing: "Pinot Gris ‘Clos Windsbuhl’ 2018",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "III",
      name: "Truffe Noire",
      french: "Black truffle · Celeriac · Brown butter",
      desc: "The room falls silent.",
      pairing: "Meursault ‘Les Charmes’ 2019",
      image:
        "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=1400&q=85",
    },
    {
      no: "IV",
      name: "Tarte au Citron, Reimagined",
      french: "Lemon · Olive oil · White chocolate · Verbena",
      desc: "Bright, sharp, unforgettable.",
      pairing: "Tokaji 5 Puttonyos, Disznókő 2017",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1400&q=85",
    },
  ],
};

export function Menu() {
  const ref = useRef<HTMLElement>(null);
  const tabs = Object.keys(menus);
  const [active, setActive] = useState(tabs[0]);
  const courses = menus[active];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  return (
    <section
      ref={ref}
      id="menu"
      className="relative overflow-hidden bg-noir-900 py-32 md:py-48"
    >
      {/* Oversized background headline */}
      <motion.div
        style={{ x: titleX }}
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 w-[200%] whitespace-nowrap font-display text-[18rem] leading-none text-stroke opacity-20"
      >
        Carte · Menu · Carte · Menu ·
      </motion.div>

      <div className="container-luxe relative">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow reveal mb-6">The Menus — Chapter II</p>
            <h2 className="reveal font-display text-5xl leading-none text-ivory md:text-7xl">
              Tonight's <span className="italic font-serif font-light gold-text">composition</span>
            </h2>
          </div>
          <p className="reveal max-w-md font-serif text-lg italic text-ivory/70">
            Two tasting menus, served simultaneously to the entire room. The
            kitchen will not deviate. We believe a great meal is a single
            argument, eaten in the order in which it is written.
          </p>
        </div>

        <div className="reveal mt-14 flex flex-wrap gap-2 border-y border-gold-400/15 py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "group relative px-6 py-3 font-sans text-[11px] uppercase tracking-[0.35em] transition-colors",
                active === tab
                  ? "text-gold-300"
                  : "text-ivory/60 hover:text-ivory"
              )}
            >
              {active === tab && (
                <motion.span
                  layoutId="menu-tab-active"
                  className="absolute inset-0 -z-10 border border-gold-400/40 bg-gold-400/[0.06]"
                  transition={{ type: "spring", stiffness: 220, damping: 28 }}
                />
              )}
              {tab}
            </button>
          ))}
          <span className="ml-auto self-center font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/40">
            wine pairing · +€185
          </span>
        </div>

        <ul className="mt-12 divide-y divide-gold-400/10">
          {courses.map((c, i) => (
            <CourseRow key={`${active}-${c.no}`} course={c} index={i} />
          ))}
        </ul>

        <div className="reveal mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-3xl text-ivory">
              €485 <span className="text-ivory/40">·</span>{" "}
              <span className="font-serif italic font-light text-ivory/70">
                per guest
              </span>
            </p>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-ivory/40">
              Service & one amuse-bouche included
            </p>
          </div>
          <a href="#reserve" className="btn-gold">
            <span>Book this evening</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CourseRow({ course, index }: { course: Course; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="group relative reveal"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="grid grid-cols-12 items-baseline gap-4 py-8 transition-all duration-700 group-hover:pl-6">
        <span className="col-span-2 font-display text-3xl text-gold-300/60 transition-colors group-hover:text-gold-300 md:col-span-1 md:text-4xl">
          {course.no}
        </span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="font-display text-3xl text-ivory transition-colors group-hover:text-gold-100 md:text-4xl">
            {course.name}
          </h3>
          <p className="mt-2 font-serif text-base italic text-ivory/65 md:text-lg">
            {course.french}
          </p>
          <p className="mt-3 max-w-xl font-sans text-xs leading-relaxed text-ivory/45">
            {course.desc}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300/70">
            Pairing
          </p>
          <p className="mt-2 font-serif text-base italic text-ivory/70">
            {course.pairing}
          </p>
        </div>
      </div>

      {/* Hover preview image */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={hover ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-6 top-1/2 hidden h-44 w-32 -translate-y-1/2 overflow-hidden border border-gold-400/20 shadow-deep lg:block"
      >
        <Image
          src={course.image}
          alt=""
          fill
          sizes="200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 to-transparent" />
      </motion.div>
    </li>
  );
}
