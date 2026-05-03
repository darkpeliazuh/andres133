"use client";

import { cn } from "@/lib/utils";

/**
 * A trio of fine SVG ornaments — fleur-de-lis, art-nouveau flourish, corner
 * brackets — used as section dividers and frame decorations. All inherit
 * `currentColor`, so colour them via `text-*` utilities.
 */

export function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-8 w-8", className)}
    >
      <path d="M32 4c-2 6-2 12 0 16 2-4 2-10 0-16Z" />
      <path d="M32 18c-6 4-9 9-9 15 0 6 4 12 9 16 5-4 9-10 9-16 0-6-3-11-9-15Z" />
      <path d="M14 24c-2 6-1 13 4 18 4-4 6-10 4-15-2-3-5-4-8-3Z" />
      <path d="M50 24c2 6 1 13-4 18-4-4-6-10-4-15 2-3 5-4 8-3Z" />
      <path d="M22 40c0 4 4 8 10 8s10-4 10-8" />
      <path d="M26 50h12" />
      <path d="M28 56h8" />
    </svg>
  );
}

export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      className={cn("h-6 w-auto", className)}
    >
      <path d="M2 12 Q40 2 80 12 T 158 12 T 238 12" />
      <path d="M14 12 c -4 -8 8 -10 8 -2 0 4 -4 6 -8 6" opacity="0.7" />
      <path d="M226 12 c 4 -8 -8 -10 -8 -2 0 4 4 6 8 6" opacity="0.7" />
      <circle cx="120" cy="12" r="2.5" fill="currentColor" />
      <circle cx="100" cy="12" r="0.9" fill="currentColor" opacity="0.7" />
      <circle cx="140" cy="12" r="0.9" fill="currentColor" opacity="0.7" />
      <path d="M120 4 v -3 M120 20 v 3" opacity="0.5" />
    </svg>
  );
}

export function CornerBracket({
  className,
  position = "tl",
  size = 40,
}: {
  className?: string;
  position?: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const rotate = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
  }[position];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn("absolute", className)}
    >
      <path d="M2 14 V 2 H 14" />
      <path d="M5 11 V 5 H 11" opacity="0.55" />
      <circle cx="2" cy="2" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function OrnateDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-6 text-gold-300/60", className)}>
      <span className="block h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/40" />
      <FleurDeLis className="h-7 w-7" />
      <span className="block h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/40" />
    </div>
  );
}

/** A four-corner ornate frame — drop into a relative container. */
export function OrnateFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 text-gold-300/50",
        className
      )}
    >
      <CornerBracket position="tl" className="left-3 top-3" />
      <CornerBracket position="tr" className="right-3 top-3" />
      <CornerBracket position="bl" className="bottom-3 left-3" />
      <CornerBracket position="br" className="bottom-3 right-3" />
    </div>
  );
}

export function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="currentColor"
    >
      <path d="M12 2 L13.6 9.4 L21 11 L13.6 12.6 L12 20 L10.4 12.6 L3 11 L10.4 9.4 Z" />
    </svg>
  );
}

export function MichelinStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path d="M12 .8 L14.85 8.65 L23 11 L14.85 13.35 L12 21.2 L9.15 13.35 L1 11 L9.15 8.65 Z" />
    </svg>
  );
}
