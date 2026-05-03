"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. Default 8°. */
  max?: number;
  /** Base scale on hover. Default 1.02. */
  scale?: number;
  /** Adds a subtle gold sheen that follows the cursor. Default true. */
  sheen?: boolean;
};

/**
 * Mouse-position-driven 3D parallax tilt with optional gold sheen overlay.
 * Pure DOM transforms — no animation loop, no React state.
 */
export function Tilt3D({
  children,
  className,
  max = 8,
  scale = 1.02,
  sheen = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 2 * max;
    const rx = -(py - 0.5) * 2 * max;
    node.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    node.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        {
          transformStyle: "preserve-3d",
          perspective: "1200px",
          "--rx": "0deg",
          "--ry": "0deg",
          "--scale": scale,
        } as React.CSSProperties
      }
      className={cn(
        "group/tilt relative transition-transform duration-300 ease-out",
        "[transform:perspective(1200px)_rotateX(var(--rx))_rotateY(var(--ry))_scale(1)] hover:[transform:perspective(1200px)_rotateX(var(--rx))_rotateY(var(--ry))_scale(var(--scale))]",
        className
      )}
    >
      {children}
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(245,235,196,0.18), transparent 65%)",
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
