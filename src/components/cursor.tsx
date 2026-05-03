"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "idle" | "hover" | "label";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      setVisible(true);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelEl = target.closest<HTMLElement>("[data-cursor-text]");
      if (labelEl) {
        const text = labelEl.dataset.cursorText ?? "";
        setLabel(text);
        setState("label");
        return;
      }
      if (
        target.closest(
          "a, button, [data-cursor='hover'], input, textarea, select"
        )
      ) {
        setState("hover");
      } else {
        setState("idle");
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold-300 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        } ${state === "label" ? "opacity-0" : ""}`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full border border-gold-300/60 transition-[width,height,opacity,background-color,padding] duration-300 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${
          state === "label"
            ? "h-auto w-auto min-h-[3.25rem] min-w-[3.25rem] border-gold-300 bg-noir-900/90 px-4 py-2 backdrop-blur-md"
            : state === "hover"
            ? "h-14 w-14 bg-gold-400/10 backdrop-blur-sm"
            : "h-9 w-9"
        }`}
      >
        <span
          ref={labelRef}
          className={`whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.4em] text-gold-200 transition-opacity duration-200 ${
            state === "label" ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </>
  );
}
