"use client";

import { useEffect, useRef, useState } from "react";

// A premium 3D glossy arrow cursor in the "shiny pack" style: a sakura-tinted
// pointer with a glass highlight and soft drop shadow, plus a trailing glow ring
// that expands over interactive elements. Renders nothing on touch devices or
// when reduced motion is requested.
export default function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide whether to show the custom cursor at all (fine pointer, motion ok).
  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine) setEnabled(true);
  }, []);

  // Attach tracking only AFTER the elements are rendered (enabled === true),
  // otherwise the refs are still null and listeners never bind — which left the
  // cursor frozen at the top-left corner.
  useEffect(() => {
    if (!enabled) return;

    const pointer = pointerRef.current;
    const ring = ringRef.current;
    if (!pointer || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    // Start centered (and hidden) so there's no flash in the top-left corner
    // before the first pointer move.
    pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    pointer.style.opacity = "0";
    ring.style.opacity = "0";

    const onMove = (e: PointerEvent) => {
      pointer.style.opacity = "1";
      ring.style.opacity = "1";
      mouseX = e.clientX;
      mouseY = e.clientY;
      pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // Ring eases toward the pointer for a smooth trailing feel.
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, label, select';
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        ring.classList.add("cursor-ring--active");
        pointer.classList.add("cursor-3d--active");
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        ring.classList.remove("cursor-ring--active");
        pointer.classList.remove("cursor-3d--active");
      }
    };
    const onDown = () => pointer.classList.add("cursor-3d--down");
    const onUp = () => pointer.classList.remove("cursor-3d--down");
    const onLeave = () => {
      pointer.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      pointer.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={pointerRef} aria-hidden="true" className="cursor-3d">
        <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cursorBody" x1="4" y1="2" x2="22" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffd9ec" />
              <stop offset="0.4" stopColor="#ff7eb6" />
              <stop offset="1" stopColor="#c85b97" />
            </linearGradient>
            <linearGradient id="cursorGloss" x1="6" y1="3" x2="12" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Arrow body */}
          <path
            d="M5 3.2 L23.5 19.2 L15.4 19.8 L19.9 28.4 L15.8 30.4 L11.2 21.5 L5 26.2 Z"
            fill="url(#cursorBody)"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Glass highlight */}
          <path
            d="M6.6 5.6 L15 12.8 L10.5 13.4 L9 17 L7 14.8 Z"
            fill="url(#cursorGloss)"
          />
        </svg>
      </div>
    </>
  );
}
