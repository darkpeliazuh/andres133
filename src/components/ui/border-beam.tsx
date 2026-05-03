"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
};

/**
 * A pure-CSS conic-gradient border that travels around the parent container.
 * Inspired by 21st.dev / Magic UI border-beam, redone with antique gold colours.
 *
 * Wrap any element with `position: relative; overflow: hidden;` and drop this
 * inside.
 */
export function BorderBeam({
  className,
  size = 220,
  duration = 9,
  delay = 0,
  colorFrom = "#ead592",
  colorTo = "#caa23a",
  borderWidth = 1.2,
}: Props) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[var(--size)] after:animate-[borderBeam_var(--duration)_linear_infinite] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--size))]",
        className
      )}
    />
  );
}
