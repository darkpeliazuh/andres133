"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { OrnateFrame } from "@/components/ui/ornaments";

const images = [
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",
    span: "row-span-2",
    alt: "Langoustine course on porcelain",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=85",
    span: "",
    alt: "Wagyu beef tartare",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
    span: "",
    alt: "Dining room at twilight",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85",
    span: "row-span-2",
    alt: "Plated dessert",
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=85",
    span: "",
    alt: "Chocolate dessert",
  },
  {
    src: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=85",
    span: "",
    alt: "Hands plating",
  },
];

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative overflow-hidden bg-noir-900 py-32 md:py-48"
    >
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow reveal mb-6">Gallery — Chapter IV</p>
            <h2 className="reveal font-display text-5xl leading-none text-ivory md:text-7xl">
              Fragments of a{" "}
              <span className="italic font-serif font-light gold-text">night</span>
            </h2>
          </div>
          <p className="reveal max-w-md font-serif text-lg italic text-ivory/65">
            Photographs from the dining room, the pass, the cellar — captured
            quietly, between courses.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-3 md:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
              className={`group relative overflow-hidden ${img.span} reveal`}
              data-cursor-text={`View · №${String(i + 1).padStart(2, "0")}`}
            >
              <div className="relative h-full min-h-[16rem] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />
                <div className="absolute inset-3 border border-gold-400/0 transition-colors duration-700 group-hover:border-gold-400/50" />
                <OrnateFrame className="opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 z-10 translate-y-2 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-300">
                    Plate №{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
