"use client";

import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { GithubLogo, LinkedinLogo, Envelope, ArrowRight, Flower, Camera } from "@phosphor-icons/react";
import Magnetic from "../components/Magnetic";

export default function Hero() {
  const githubUrl = "https://github.com/Bappaditya-kuilya";
  const [profileImageMissing, setProfileImageMissing] = useState(false);

  // Pointer parallax: normalized -0.5..0.5 across the viewport.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 20 });

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  const handleParallax = (event: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    }
    pointerX.set(event.clientX / window.innerWidth - 0.5);
    pointerY.set(event.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleParallax}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <m.div
          style={{ x: bgX, y: bgY }}
          className="absolute -inset-8 bg-cover bg-center bg-no-repeat opacity-40"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/cinematic-sakura-noble.webp')",
            }}
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Moonlight Bloom */}
      <div className="moonlight-bloom top-1/4 right-1/4" />
      <div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-20"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "60%",
          left: "10%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Japanese Text */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className="font-noto text-sm text-sakura/70 tracking-widest">
                心は静かに、技は美しく
              </span>
              <div className="h-px flex-1 bg-sakura/20" />
            </m.div>

            {/* Main Heading */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-2"
            >
              <h1 className="sr-only">
                Bappaditya Kuilya — AI Systems Engineer
              </h1>
              <span className="block font-cinzel text-[clamp(2.2rem,7vw,5rem)] md:text-[clamp(4rem,9vw,8rem)] lg:text-[clamp(5rem,10vw,9rem)] text-foreground leading-[0.88] tracking-[-0.03em]" aria-hidden="true">
                Elegance
              </span>
              <span className="block font-cinzel text-[clamp(2.2rem,7vw,5rem)] md:text-[clamp(4rem,9vw,8rem)] lg:text-[clamp(5rem,10vw,9rem)] text-foreground leading-[0.88] tracking-[-0.03em]" aria-hidden="true">
                In Every
              </span>
              <span className="block font-cinzel text-[clamp(2.2rem,7vw,5rem)] md:text-[clamp(4rem,9vw,8rem)] lg:text-[clamp(5rem,10vw,9rem)] text-gradient-sakura leading-[0.88] tracking-[-0.03em]" aria-hidden="true">
                Line.
              </span>
            </m.div>

            {/* Subheading */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-cormorant text-xl md:text-2xl text-foreground-dim italic max-w-lg leading-relaxed"
            >
              AI Systems Engineer crafting intelligent solutions with precision, purpose, and a touch of soul.
            </m.p>

            {/* Divider */}
            <m.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-4 max-w-md"
            >
              <div className="h-px flex-1 bg-sakura/30" />
                             <Flower className="w-4 h-4 text-sakura/50" />
              <div className="h-px flex-1 bg-sakura/30" />
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
               className="flex flex-wrap gap-5"
            >
              <Magnetic>
                <m.a
                  href="#resume"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative z-10 flex items-center gap-3 px-8 py-4 glass-btn text-foreground font-inter text-sm tracking-wider"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,126,182,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  VIEW RESUME
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </m.a>
              </Magnetic>

              <Magnetic>
                <m.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative z-10 flex items-center gap-3 px-8 py-4 glass-ghost text-foreground-muted font-inter text-sm tracking-wider"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  EXPLORE PROJECTS
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </m.a>
              </Magnetic>
            </m.div>

            {/* Social Icons */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-6 pt-4"
            >
              {[
                { icon: GithubLogo, href: githubUrl, label: "GitHub" },
                { icon: LinkedinLogo, href: "https://linkedin.com/in/bappaditya-kuilya", label: "LinkedIn" },
                { icon: Envelope, href: "mailto:bappadityakuilya@gmail.com", label: "Email" },
              ].map((social) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-ghost rounded-xl text-foreground-muted hover:text-sakura hover:border-sakura/30 transition-all duration-300"
                  whileHover={{ y: -3, boxShadow: "0 0 20px rgba(255,126,182,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </m.a>
              ))}
            </m.div>
          </div>

          {/* Right Content - Portrait Area */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative flex items-center justify-center lg:min-h-[32rem]"
          >
            {/* Vertical Japanese Text */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 writing-mode-vertical lg:block">
              <p className="font-noto text-xs text-foreground-muted/50 tracking-[0.5em] leading-loose" style={{ writingMode: "vertical-rl" }}>
                美しきもののために、私はここにいる。
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 right-20 hidden w-32 h-32 border border-sakura/10 rounded-full animate-float-gentle sm:block" />
            <div className="absolute bottom-20 left-10 hidden w-24 h-24 border border-sakura/10 rounded-full animate-float-gentle sm:block" style={{ animationDelay: "2s" }} />

            {/* Central Profile Frame */}
            <m.div
              style={{ x: portraitX, y: portraitY }}
              className="relative h-[26rem] w-72 sm:h-[28rem] sm:w-80"
            >
              <div className="absolute inset-0 rounded-xl border border-white/[0.1] glass-inline" />
              <div className="absolute inset-4 rounded-xl border border-white/[0.06]" />
              <div className="absolute -inset-px rounded-xl bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-20" />

              <div className="absolute inset-8 flex flex-col">
                  <div className="relative h-72 overflow-hidden rounded-xl border border-white/[0.08] bg-background-secondary sm:h-80">
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(255,126,182,0.14),transparent_58%)]">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-sakura/20 bg-background/70 backdrop-blur-md">
                      <Camera className="h-9 w-9 text-sakura/60" />
                    </div>
                  </div>
                  {!profileImageMissing && (
                    <Image
                      src="/images/bappaditya-kuilya.jpeg"
                      alt="Bappaditya Kuilya portrait"
                      fill
                      sizes="320px"
                      className="absolute inset-0 z-10 object-cover"
                      onError={() => setProfileImageMissing(true)}
                      priority
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center">
                  <p className="font-cinzel text-lg text-foreground tracking-[0.18em]">
                    Bappaditya Kuilya
                  </p>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-sakura/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-sakura/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-sakura/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-sakura/30" />
            </m.div>
          </m.div>
        </div>
      </div>

    </section>
  );
}
