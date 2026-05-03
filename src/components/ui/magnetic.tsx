"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "div" | "a";
  href?: string;
  onClick?: () => void;
};

/**
 * Wraps content in a container that gently follows the cursor when hovered,
 * with a soft spring back to centre on leave.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  as = "div",
  href,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className={cn("inline-block will-change-transform", className)}
      {...(href ? { href } : {})}
      {...(onClick ? { onClick } : {})}
    >
      {children}
    </Comp>
  );
}
