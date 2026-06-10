"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  vx: number;
  vy: number;
}

const POINTER_RADIUS = 130;
const POINTER_FORCE = 0.9;

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number>(0);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Fewer petals on small / touch screens to protect battery and frame rate.
    const isCompact = window.innerWidth < 768;
    const petalCount = isCompact ? 18 : 40;
    petalsRef.current = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: Math.random() * 0.3 - 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.2,
      swayAmplitude: Math.random() * 20 + 10,
      swayFrequency: Math.random() * 0.002 + 0.001,
      swayOffset: Math.random() * Math.PI * 2,
      vx: 0,
      vy: 0,
    }));

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;

      ctx.beginPath();
      ctx.moveTo(0, -petal.size);
      ctx.bezierCurveTo(petal.size * 0.5, -petal.size * 0.5, petal.size, 0, 0, petal.size);
      ctx.bezierCurveTo(-petal.size, 0, -petal.size * 0.5, -petal.size * 0.5, 0, -petal.size);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size);
      gradient.addColorStop(0, "rgba(255, 126, 182, 0.8)");
      gradient.addColorStop(0.5, "rgba(244, 182, 210, 0.6)");
      gradient.addColorStop(1, "rgba(212, 138, 192, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const pointer = pointerRef.current;

      petalsRef.current.forEach((petal) => {
        // Pointer repulsion: petals drift away from the cursor like a breeze.
        if (pointer.active) {
          const dx = petal.x - pointer.x;
          const dy = petal.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < POINTER_RADIUS * POINTER_RADIUS && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const strength = (1 - dist / POINTER_RADIUS) * POINTER_FORCE;
            petal.vx += (dx / dist) * strength;
            petal.vy += (dy / dist) * strength;
          }
        }

        // Ease the kicked velocity back toward rest.
        petal.vx *= 0.92;
        petal.vy *= 0.92;

        petal.y += petal.speedY + petal.vy;
        petal.x +=
          petal.speedX + petal.vx + Math.sin(time * petal.swayFrequency + petal.swayOffset) * 0.3;
        petal.rotation += petal.rotationSpeed + petal.vx * 0.01;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
          petal.vx = 0;
          petal.vy = 0;
        }
        if (petal.x > width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = width + 20;

        drawPetal(petal);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };
    // Pause the loop when the tab is hidden; resume on return.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
