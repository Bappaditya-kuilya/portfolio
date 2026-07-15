"use client";

import dynamic from "next/dynamic";

// Decorative, non-content overlays: code-split and mounted only after
// hydration so their canvas RAF loop / pointer listeners never block LCP/TBT.
// Both render nothing on touch / reduced-motion devices, so SSR is unaffected.
const SakuraParticles = dynamic(() => import("./SakuraParticles"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function Atmosphere() {
  return (
    <>
      <SakuraParticles />
      <CustomCursor />
    </>
  );
}
