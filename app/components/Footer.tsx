"use client";

import { motion } from "framer-motion";
import { Flower2, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-sakura/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <Flower2 className="w-5 h-5 text-sakura" />
            <div className="flex flex-col">
              <span className="font-cinzel text-xs text-foreground tracking-[0.18em] uppercase">
                Bappaditya Kuilya
              </span>
            </div>
          </motion.div>

          {/* Copyright */}
          <div className="flex items-center gap-2 font-inter text-xs text-foreground-muted">
            <span>© 2025 Bappaditya Kuilya. All rights reserved.</span>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2">
            <span className="font-inter text-xs text-foreground-muted">
              Crafted with code. Inspired by purpose.
            </span>
            <Heart className="w-3 h-3 text-sakura/50" />
          </div>
        </div>
      </div>
    </footer>
  );
}
