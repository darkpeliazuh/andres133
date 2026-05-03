"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineFallback />,
});

type Props = {
  /** A public Spline scene URL (.splinecode). */
  scene: string;
  className?: string;
};

/**
 * Lazy Spline canvas with a gold-foil orbital fallback that renders both while
 * the scene loads and if loading fails (no network, etc).
 */
export function SplineScene({ scene, className }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative h-full w-full", className)}>
      {!errored && (
        <Suspense fallback={<SplineFallback />}>
          <Spline
            scene={scene}
            onError={() => setErrored(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      )}
      {errored && <SplineFallback />}
    </div>
  );
}

/**
 * Pure-CSS / SVG fallback "3D ornament": orbiting rings, a faceted gold disc
 * and floating particles. Looks like a piece of jewellery, no WebGL needed.
 */
export function SplineFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="relative aspect-square w-[min(90%,560px)]">
        {/* Outer slow ring */}
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold-400/40" />
        {/* Inner reverse ring */}
        <div className="absolute inset-[10%] animate-spin-reverse rounded-full border border-gold-400/30" />
        {/* Tick marks */}
        <div className="absolute inset-[18%] rounded-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-[42%] w-px origin-top -translate-x-1/2 bg-gold-300/30"
              style={{
                transform: `translate(-50%, 0) rotate(${(360 / 24) * i}deg)`,
              }}
            />
          ))}
        </div>
        {/* Core disc */}
        <div className="absolute inset-[28%] rounded-full bg-[conic-gradient(from_0deg,_#caa23a,_#f5ebc4,_#8e6c1d,_#ead592,_#caa23a)] shadow-[0_0_120px_-10px_rgba(202,162,58,0.55)]">
          <div className="absolute inset-[8%] rounded-full bg-noir-950 shadow-inner" />
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(245,235,196,0.4),transparent_55%)]" />
        </div>
        {/* Orbiting dots */}
        {[0, 120, 240].map((deg, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: `${20 + i * 6}s` }}
          >
            <span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-200 shadow-[0_0_20px_4px_rgba(245,235,196,0.7)]"
              style={{ transform: `rotate(${deg}deg) translateY(-2px)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
