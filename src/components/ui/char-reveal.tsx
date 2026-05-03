"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Letter-by-letter blur-in reveal. Splits on words then characters so that
 * white-space is preserved and lines wrap normally.
 */
export function CharReveal({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.025,
  as = "span",
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as];
  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={{
                hidden: { opacity: 0, y: 60, filter: "blur(14px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={cn("inline-block", charClassName)}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
