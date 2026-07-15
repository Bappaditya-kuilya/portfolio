"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

// Centralizes framer-motion's animation features in a single lazily-loaded
// chunk (domMax = animations + whileInView + layout + drag). Components use
// the tiny `m` proxy instead of the full `motion` component, so the feature
// implementation is not duplicated into every component's bundle.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={() => import("framer-motion").then((mod) => mod.domMax)}>
      {children}
    </LazyMotion>
  );
}
