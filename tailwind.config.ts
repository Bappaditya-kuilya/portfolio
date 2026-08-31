import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#050505",
          tertiary: "#0a0a0a",
        },
        foreground: {
          DEFAULT: "#f5f5f5",
          muted: "#a1a1aa",
          dim: "#d8d8d8",
        },
        sakura: {
          DEFAULT: "#ff7eb6",
          light: "#f4b6d2",
          dark: "#d48ac0",
        },
        "violet-glow": "#8b5cf6",
        steel: "#9fb3c8",
        champagne: "#e8d7b9",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
        noto: ["Noto Serif JP", "serif"],
      },
      animation: {
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
