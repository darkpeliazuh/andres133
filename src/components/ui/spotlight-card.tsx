"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  glowSize?: number;
  glowColor?: string;
};

/**
 * A card whose surface reveals a soft radial gold spotlight that follows the
 * cursor — drawn with a CSS variable updated on mouse move, no JS animation
 * loop required.
 */
export function SpotlightCard({
  children,
  className,
  glowSize = 320,
  glowColor = "rgba(202, 162, 58, 0.18)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      style={
        {
          "--glow-size": `${glowSize}px`,
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden bg-noir-900/60 backdrop-blur-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
        "before:bg-[radial-gradient(var(--glow-size)_circle_at_var(--mx,_50%)_var(--my,_50%),var(--glow-color),transparent_70%)]",
        "hover:before:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
