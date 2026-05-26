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
}

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize petals
    const petalCount = 40;
    petalsRef.current = Array.from({ length: petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: Math.random() * 0.3 - 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.2,
      swayAmplitude: Math.random() * 20 + 10,
      swayFrequency: Math.random() * 0.002 + 0.001,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;

      // Draw petal shape
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        // Update position
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(time * petal.swayFrequency + petal.swayOffset) * 0.3;
        petal.rotation += petal.rotationSpeed;

        // Reset if out of bounds
        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = canvas.width + 20;

        drawPetal(petal);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
